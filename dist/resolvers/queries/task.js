"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const task_1 = require("../../entities/task");
exports.default = async (_root, { id }) => {
    const taskRepo = typeorm_1.getRepository(task_1.Task);
    const task = await taskRepo.findOne({ where: { id } });
    return task;
};
