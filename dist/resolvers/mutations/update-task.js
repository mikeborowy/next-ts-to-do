"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const task_1 = require("../../entities/task");
const apollo_server_core_1 = require("apollo-server-core");
exports.default = async (_root, { input }) => {
    if (!input.title) {
        throw new apollo_server_core_1.UserInputError('title_empty', { errorKey: 'title' });
    }
    const taskRepo = typeorm_1.getRepository(task_1.Task);
    const task = await taskRepo.findOne({ where: { id: input.id } });
    if (!task) {
        throw new apollo_server_core_1.UserInputError('task_not_found', { errorKey: 'general' });
    }
    task.title = input.title;
    if (input.status) {
        task.status = input.status;
    }
    await taskRepo.save(task);
    return task;
};
