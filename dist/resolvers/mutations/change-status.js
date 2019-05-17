"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("../../entities/task");
const typeorm_1 = require("typeorm");
const apollo_server_core_1 = require("apollo-server-core");
exports.default = async (_root, { id, status }) => {
    const taskRepo = typeorm_1.getRepository(task_1.Task);
    const task = await taskRepo.findOne({ where: { id } });
    if (!task) {
        throw new apollo_server_core_1.UserInputError('task_not_found', { errorKey: 'general' });
    }
    task.status = status;
    return taskRepo.save(task);
};
