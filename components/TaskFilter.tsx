import React from 'react';
import Link from 'next/link';
import { colors } from '../styles/constants';
import { TaskStatus as ITaskStatus } from '../resources/gql-types';

export interface ITaskFilter {
  status?: ITaskStatus;
}

export interface Props {
  filter: ITaskFilter;
}

export const TaskFilter: React.FunctionComponent<Props> = ({ filter }) => {
  return (
    <ul>
      <li className={!filter.status ? 'active' : undefined}>
        <Link href={{ pathname: '/' }}>
          <a>All</a>
        </Link>
      </li>
      <li
        className={filter.status === ITaskStatus.active ? 'active' : undefined}
      >
        <Link href={{ pathname: '/', query: { status: ITaskStatus.active } }}>
          <a>Active</a>
        </Link>
      </li>
      <li
        className={
          filter.status === ITaskStatus.completed ? 'active' : undefined
        }
      >
        <Link href={{ pathname: '/', query: { status: ITaskStatus.completed } }}>
          <a>Completed</a>
        </Link>
      </li>
      <style jsx>{`
        ul {
          list-style: none;
          display: flex;
          justify-content: center;
          margin: 0;
          padding: 0;
        }
        li {
          margin: 0 10px;
        }
        li a {
          color: ${colors.text};
        }
        li a:hover {
          color: ${colors.primary};
        }
        .active {
          border-bottom: 2px solid ${colors.primary};
        }
      `}</style>
    </ul>
  );
};
