import React, { useState, useEffect } from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import CHANGE_STATUS_MUTATION from '../graphql/change-status.graphql';
import TASKS_QUERY from '../graphql/tasks.graphql';
import DELETE_TASK_MUTATION from '../graphql/delete-task.graphql';
import {
  ChangeStatusMutation as IChangeStatusMutation,
  ChangeStatusMutationVariables as IChangeStatusMutationVariables,
  DeleteTaskMutation as IDeleteTaskMutation,
  DeleteTaskMutationVariables as IDeleteTaskMutationVariables,
  TasksQuery as ITasksQuery,
  TasksQueryVariables as ITasksQueryVariables,
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
import { WithTasksQuery } from '../hoc/withTaskQuery';
import { Notification } from '../components/Notification';
import { NotificationButtons } from '../components/NotificationButtons';

export interface IData {
  tasks: ITask[]
}

export interface IQuery {
  error?: Object;
  loading?: boolean;
  data?: IData;
  refetch: () => {};
}

export interface IDefaultProps {
  taskFilter: ITaskFilter;
}

export interface IDefaultState extends IState{

}

interface IState{
  showNotification:boolean;
}

interface IProps extends IDefaultProps { }

const initialState:IState = {
  showNotification:false
}

const MainPage: NextFunctionComponent<WithApolloClient<IProps>, IDefaultProps> = (props) => {
  const { client, taskFilter } = props;
  const [state, setState ] = useState<IState>(initialState);

  useEffect(() => {
    if(localStorage.getItem('showNotification')){
      const showNotification = localStorage.getItem('showNotification') === 'true' ? true : false;
      setState({ showNotification })
    }
  },[]);

  const dismissHandler = (evt:React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const showNotification = false;
    setState({showNotification});
    localStorage.setItem('showNotification', `${showNotification}`);
  }

  const changeTaskStatus = async (id: number, status: ITaskStatus, taskFilter: ITaskFilter, apollo: ApolloClient<any>) => {
    apollo.mutate<IChangeStatusMutation, IChangeStatusMutationVariables>({
      mutation: CHANGE_STATUS_MUTATION,
      variables: { id, status },
      update: (cache) => {
        const tasksCache = cache.readQuery<ITasksQuery, ITasksQueryVariables>({
          query: TASKS_QUERY,
          variables: {
            status: taskFilter.status
          }
        });

        if (tasksCache) {
          cache.writeQuery<ITasksQuery, ITasksQueryVariables>({
            query: TASKS_QUERY,
            variables: {
              status: taskFilter.status
            },
            data: {
              tasks: taskFilter.status
                ? tasksCache.tasks.filter(task => task.status === taskFilter.status)
                : tasksCache.tasks
            }
          })
        }
      }
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
      const tasksCache = apollo.readQuery<ITasksQuery, ITasksQueryVariables>({
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
    (id: number, status: ITaskStatus) =>
      changeTaskStatus(id, status, taskFilter, client),
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
      data,
      refetch
    } = props;

    const tasks = data && data.tasks;

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

  const renderNotifications = () => {
    return(
      <React.Fragment>
        <Notification>
          <p>
            Limited time offer! Get our <em>Pro</em> subscriptions.
          </p>
        </Notification>
        <NotificationButtons>
          <a href="#">Learn More</a>
          <a href="#" onClick={dismissHandler}>Dismiss</a>
        </NotificationButtons>
      </React.Fragment>
    )
  }

  return (
    <Layout>
      {state.showNotification && renderNotifications()}
      <div>Hello World!</div>
      <WithTasksQuery
        query={TASKS_QUERY}
        variables={taskFilter}
        fetchPolicy="cache-and-network"
      >
        {renderTaskQuery(taskFilter)}
      </WithTasksQuery>
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
