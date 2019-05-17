"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const task_1 = require("../../entities/task");
const apollo_server_core_1 = require("apollo-server-core");
exports.default = async (_root, { input }) => {
    if (!input.title) {
        throw new apollo_server_core_1.UserInputError('title_empty', { errorKey: 'title' });
    }
    const task = new task_1.Task();
    task.title = input.title;
    task.status = task_1.TaskStatus.active;
    const taskRepo = typeorm_1.getRepository(task_1.Task);
    await taskRepo.save(task);
    return task;
};
