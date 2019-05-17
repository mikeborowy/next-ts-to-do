"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const task_1 = require("../entities/task");
exports.default = apollo_server_express_1.gql `
  type FormError {
    key: String
    message: String
  }

  enum TaskStatus {
    ${Object.keys(task_1.TaskStatus).join('\n')}
  }

  type Task {
    id: Int!
    title: String!
    status: TaskStatus!
  }

  input CreateTaskInput {
    title: String!
  }

  input UpdateTaskInput {
    id: Int!
    title: String
    status: TaskStatus
  }

  type Query {
    hello: String
    tasks(status: TaskStatus): [Task!]!
    task(id: Int!): Task
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task
    updateTask(input: UpdateTaskInput!): Task
    changeStatus(id: Int!, status: TaskStatus!): Task
    deleteTask(id: Int!): Task
  }
`;
