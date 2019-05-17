"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const initialize_app_1 = __importDefault(require("./initialize-app"));
const PORT = 3001;
initialize_app_1.default()
    .then(app => {
    app.listen(PORT, (err) => {
        if (err)
            throw err;
        console.log(`Ready on port ${PORT}`);
    });
})
    .catch(e => {
    console.error('Failed to start', e);
});
