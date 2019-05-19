import { Query } from 'react-apollo';
import TASKS_QUERY from '../graphql/tasks.graphql';
import {
  TasksQuery as ITasksQuery,
  TaskQueryVariables as ITaskQueryVariables
} from '../resources/gql-types';

import { Layout } from "../components/Layout";
import { Loader } from '../components/Loader';
import { Task, ITask } from '../components/Task';
import { CreateTaskFormWithGQL } from '../components/CreateTaskForm';

interface IData <T>{

}

interface IQuery {
  error?: Object;
  loading?: boolean;
  data?: IData;
  refetch?: () => {};
}

export class TasksQuery extends Query<ITasksQuery, ITaskQueryVariables> {}

export default () => {

  const renderTasksList = (tasks: ITask[]) => {
    if (tasks) {
      const tasksList = tasks.map((task: ITask, i: number) => <Task key={i} {...task} />);
      return <ul>{tasksList}</ul>
    }
  }

  const renderTaskQuery = () => (props:IQuery) => {
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
        <CreateTaskFormWithGQL onCreateTas={refetch}/>
        {loading ? <Loader /> : renderTasksList(tasks)}
      </div>
      )
  }

  return (
    <Layout>
      <div>Hello World!</div>
      <TasksQuery query={TASKS_QUERY}>
        {renderTaskQuery()}
      </TasksQuery>
    </Layout>
  )
}
