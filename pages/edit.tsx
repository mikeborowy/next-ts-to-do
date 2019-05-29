import { NextStatelessComponent } from 'next';
import Error from 'next/error';
import { Layout } from '../components/Layout';
import { WrappedUpdateTaskForm } from '../components/UpdateTaskForm';
import { Query } from 'react-apollo';
import {
  TaskQuery as ITaskQuery,
  TaskQueryVariables as ITaskQueryVariables
} from '../resources/gql-types';
import TASK_QUERY from '../graphql/task.graphql';
import { Loader } from '../components/Loader';

class ApolloTaskQuery extends Query<ITaskQuery, ITaskQueryVariables> { }

interface IDefaultProps {
  id: number;
}

interface Props extends IDefaultProps { }

const Edit: NextStatelessComponent<Props, IDefaultProps> = (props) => {
  const { id } = props;

  if (!id) {
    return <Error statusCode={404} />;
  }
  return (
    <Layout>
      <ApolloTaskQuery query={TASK_QUERY} variables={{ id }}>
        {({ error, loading, data }) => {
          if (error) {
            return <p>Something wrong happened</p>;
          }
          const task = data ? data.task : null;
          return loading ? (
            <Loader />
          ) : (
              <WrappedUpdateTaskForm
                initialInput={task ? { id: task.id, title: task.title } : {}}
              />
            );
        }}
      </ApolloTaskQuery>
    </Layout>
  );
};

Edit.getInitialProps = async ctx => {
  const { id } = ctx.query;
  return {
    id: Number(Array.isArray(id) ? (id.length ? id[0] : undefined) : id)
  };
};

export default Edit;
