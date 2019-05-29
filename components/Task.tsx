import React from 'react';
import Link from 'next/link';
import { colors } from '../styles/constants';
import { TaskStatus as ITaskStatus } from '../resources/gql-types';

export interface ITask {
  id: number;
  title: string;
  status: ITaskStatus;
  key?: number | string;
};

export interface Props extends ITask {
  onDeleteTask?: (id: number) => void;
  onChangeTaskStatus?: (id: number, status: ITaskStatus) => void;
}

export const Task = React.memo<Props>((props) => {
  const { id, title, status, onDeleteTask, onChangeTaskStatus } = props;
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={status === ITaskStatus.completed}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const status = e.target.checked
              ? ITaskStatus.completed
              : ITaskStatus.active;
            onChangeTaskStatus && onChangeTaskStatus(id, status);
          }}
        />
        <span className="checkMark" />
      </label>
      <div className="title">
        <Link href={{ pathname: '/edit', query: { id } }}>
          <a>{title}</a>
        </Link>
      </div>
      <button onClick={() => { onDeleteTask && onDeleteTask(id) }}>&times;</button>
      <style jsx>{`
          li {
            align-items: center;
            border: 1px solid ${colors.border};
            display: flex;
            padding: 14px;
          }
          li + li {
            margin-top: -1px;
          }
          li:nth-child(odd) {
            background: ${colors.liteBg};
          }
          label {
            cursor: pointer;
          }
          input {
            cursor: pointer;
            opacity: 0;
            pointer-events: none;
            position: absolute;
          }
          .checkMark {
            align-items: center;
            border: 1px solid ${colors.primary};
            border-radius: 50%;
            display: flex;
            justify-content: center;
            height: 30px;
            width: 30px;
          }
          .checkMark:before {
            border: solid ${colors.primary};
            border-width: 0 3px 3px 0;
            content: '';
            display: block;
            height: 12px;
            opacity: 0;
            transform: rotate(45deg);
            width: 7px;
          }
          input:checked + .checkMark:before {
            opacity: 1;
          }
          .checkMark:hover {
            box-shadow: inset 0 0 0 2px ${colors.shadow};
          }
          .title {
            margin: 0 20px;
          }
          .title a {
            color: ${colors.text};
            display: block;
          }
          .title a:hover {
            color: ${colors.primary};
          }
          button {
            background: ${colors.shadow};
            border: none;
            border-radius: 50%;
            cursor: pointer;
            color: ${colors.primary};
            flex-shrink: 0;
            font-size: 11px;
            font-weight: bold;
            height: 20px;
            line-height: 20px;
            margin: 0 0 0 auto;
            outline: 0;
            padding: 0;
            text-align: center;
            width: 20px;
          }
          button:hover {
            background: ${colors.primary};
            color: white;
          }
        `}</style>
    </li>
  );
}
);
