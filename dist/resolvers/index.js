"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hello_1 = __importDefault(require("./queries/hello"));
const create_task_1 = __importDefault(require("./mutations/create-task"));
const update_task_1 = __importDefault(require("./mutations/update-task"));
const change_status_1 = __importDefault(require("./mutations/change-status"));
const delete_task_1 = __importDefault(require("./mutations/delete-task"));
const tasks_1 = __importDefault(require("./queries/tasks"));
const task_1 = __importDefault(require("./queries/task"));
exports.default = {
    Query: {
        hello: hello_1.default,
        tasks: tasks_1.default,
        task: task_1.default
    },
    Mutation: {
        createTask: create_task_1.default,
        updateTask: update_task_1.default,
        changeStatus: change_status_1.default,
        deleteTask: delete_task_1.default
    }
};
