"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_service_1 = require("./services/database.service");
const order_controller_1 = require("./controllers/order.controller");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
(0, database_service_1.connectToDatabase)().then(() => {
    app.get('/', (req, res) => {
        res.send('Express + TypeScript Server');
    });
    app.use('/orders', order_controller_1.orderRouter);
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Database connection failed', error);
    process.exit();
});
