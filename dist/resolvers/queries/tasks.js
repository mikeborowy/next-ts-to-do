"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const task_1 = require("../../entities/task");
exports.default = (_root, { status }) => {
    const taskRepo = typeorm_1.getRepository(task_1.Task);
    const where = {};
    if (status) {
        where.status = status;
    }
    const tasks = taskRepo.find({ where });
    return tasks;
};
