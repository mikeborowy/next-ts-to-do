"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const task_1 = require("../../entities/task");
const apollo_server_core_1 = require("apollo-server-core");
exports.default = async (_root, { id }) => {
    const taskRepo = typeorm_1.getRepository(task_1.Task);
    const task = await taskRepo.findOne({ id });
    if (!task) {
        throw new apollo_server_core_1.UserInputError('task_not_found', { errorKey: 'general' });
    }
    await taskRepo.delete(id);
    return task;
};
