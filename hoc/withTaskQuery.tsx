import { Query } from "react-apollo";
import {
  TasksQuery as ITasksQuery,
  TasksQueryVariables as ITasksQueryVariables
} from '../resources/gql-types';

export class WithTasksQuery extends Query<ITasksQuery, ITasksQueryVariables> { }
