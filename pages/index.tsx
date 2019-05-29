import { Query, withApollo, WithApolloClient } from 'react-apollo';
import CHANGE_STATUS_MUTATION from '../graphql/change-status.graphql';
import TASKS_QUERY from '../graphql/tasks.graphql';
import DELETE_TASK_MUTATION from '../graphql/delete-task.graphql';
import {
  ChangeStatusMutation as IChangeStatusMutation,
  ChangeStatusMutationVariables as IChangeStatusMutationVariables,
  DeleteTaskMutation as IDeleteTaskMutation,
  DeleteTaskMutationVariables as IDeleteTaskMutationVariables,
  TasksQuery as ITasksQuery,
  TaskQueryVariables as ITaskQueryVariables,
  TaskStatus as ITaskStatus,
} from '../resources/gql-types';
import { Layout } from "../components/Layout";
import { Loader } from '../components/Loader';
import { Task, ITask } from '../components/Task';
import { CreateTaskFormWithGQL } from '../components/CreateTaskForm';
import { ApolloClient } from 'apollo-boost';
import { useCallback } from 'react';
import { TaskFilter, ITaskFilter } from '../components/TaskFilter';
import { NextFunctionComponent } from 'next';

export interface IData {
  tasks: ITask[]
}

export interface IQuery {
  error?: Object;
  loading?: boolean;
  data?: IData;
  refetch: () => {};
}

export class ApolloTasksQuery extends Query<ITasksQuery, ITaskQueryVariables> { }

export interface IDefaultProps {
  taskFilter: ITaskFilter;
  status?: ITaskStatus;
}

export interface IProps extends IDefaultProps {

}

const MainPage: NextFunctionComponent<WithApolloClient<IProps>, IDefaultProps> = (props) => {
  const { client, taskFilter } = props;
  const changeTaskStatus = async (id: number, status: ITaskStatus, taskFilter: ITaskFilter, apollo: ApolloClient<any>) => {
    apollo.mutate<IChangeStatusMutation, IChangeStatusMutationVariables>({
      mutation: CHANGE_STATUS_MUTATION,
      variables: { id, status },

    })
  }

  const deleteTask = async (id: number, apollo: ApolloClient<any>) => {
    const result = await apollo.mutate<
      IDeleteTaskMutation,
      IDeleteTaskMutationVariables
    >({
      mutation: DELETE_TASK_MUTATION,
      variables: { id }
    });

    if (result && result.data && result.data.deleteTask) {
      const tasksCache = apollo.readQuery<ITasksQuery, ITaskQueryVariables>({
        query: TASKS_QUERY
      });

      if (tasksCache) {
        apollo.writeQuery({
          query: TASKS_QUERY,
          data: { tasks: tasksCache.tasks.filter(task => task.id !== id) }
        });
      }
    }
  }

  const onChangeTaskStatus = useCallback(
    (id: number, status: ITaskStatus, taskFilter: ITaskFilter) => changeTaskStatus(id, status, taskFilter, client),
    [taskFilter]
  );

  const onDeleteTask = useCallback(
    (id: number) => deleteTask(id, client),
    []
  )

  const renderTasksList = (tasks: ITask[]) => {
    if (tasks) {
      const tasksList = tasks.map((task: ITask, i: number) => {
        const taskProps = { ...task, onChangeTaskStatus, onDeleteTask }
        return <Task key={i} {...taskProps} />
      });

      return (
        <ul>
          {tasksList}
        </ul>
      )
    }
  }

  const renderTaskQuery = (taskFilter: {}) => (props: IQuery) => {
    const {
      error,
      loading,
      data: {
        tasks
      },
      refetch
    } = props;

    if (error) {
      return <p>Something went wrong</p>
    }
    return (
      <div>
        <CreateTaskFormWithGQL onCreateTask={refetch} />
        {loading ? <Loader /> : renderTasksList(tasks || [])}
        <TaskFilter filter={taskFilter} />
      </div>
    )
  }

  return (
    <Layout>
      <div>Hello World!</div>
      <ApolloTasksQuery
        query={TASKS_QUERY}
        variables={taskFilter}
      >
        {renderTaskQuery(taskFilter)}
      </ApolloTasksQuery>
    </Layout>
  )
};

MainPage.getInitialProps = (ctx) => {
  const { status } = ctx.query;
  return {
    taskFilter: {
      status: (Array.isArray(status) ? status[0] : status) as ITaskStatus
    }
  };
}

export default withApollo(MainPage);
