"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const order_service_1 = require("../services/order.service");
const cors_1 = __importDefault(require("cors"));
exports.orderRouter = express_1.default.Router();
exports.orderRouter.use(bodyParser.json());
exports.orderRouter.use((0, cors_1.default)());
exports.orderRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, order_service_1.getAll)();
        if (!orders) {
            console.log("Did not find any extra steps");
            res.status(500).send("Could not find any orders");
        }
        console.log("Orders: ", orders);
        res.status(200).send(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
}));
exports.orderRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = req.body;
        const result = yield (0, order_service_1.createOrder)(newOrder);
        result
            ? res
                .status(201)
                .send(`Successfully created a new order with id ${result}`)
            : res.status(500).send("Failed to creat new order");
    }
    catch (error) {
        console.error(error);
        res.status(400);
    }
}));
exports.orderRouter.put("/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.params.token;
    try {
        const buyerInfo = req.body;
        let updateOrder = yield (0, order_service_1.getOrder)(token);
        let result;
        if (!updateOrder) {
            console.error('Could not find order with such token');
            return;
        }
        if (updateOrder != undefined || updateOrder != null) {
            updateOrder.buyer = buyerInfo;
            result = yield (0, order_service_1.putOrder)(updateOrder, token);
        }
        result
            ? res.status(200).send(`Successfully updated order with token: ${token}`)
            : res.status(304).send(`Order with token: ${token} not updated`);
    }
    catch (error) {
        console.error(error);
        res.status(400);
    }
}));
