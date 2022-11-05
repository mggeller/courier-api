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
const delivery_fee_1 = __importDefault(require("./delivery-fee"));
const delivery_order_1 = __importDefault(require("./delivery-order"));
const wolt_fee_1 = require("../utils/wolt-fee");
const wolt_delivery_1 = require("../utils/wolt-delivery");
exports.orderRouter = express_1.default.Router();
exports.orderRouter.use(bodyParser.json());
exports.orderRouter.use((0, cors_1.default)());
exports.orderRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, order_service_1.getAll)();
        if (!orders) {
            res.status(500).send("Could not find any orders");
        }
        res.status(200).send(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
}));
exports.orderRouter.get("/:orderToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.params.orderToken;
    try {
        const order = yield (0, order_service_1.getOrder)(token);
        if (!order) {
            console.error("Could not find order with such token");
            return;
        }
        const { id, orderToken, accountNumber, price, height, width, length, weight, } = order;
        const getOrderResponse = {
            id: id,
            orderToken: orderToken,
            accountNumber: accountNumber,
            price: price,
            height: height,
            width: width,
            length: length,
            weight: weight,
        };
        res.status(200).send(getOrderResponse);
    }
    catch (error) {
        console.error(error);
        res.status(400);
    }
}));
exports.orderRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = req.body;
        const result = yield (0, order_service_1.createOrder)(newOrder);
        result
            ? res.status(201).send(result)
            : res.status(500).send("Failed to creat new order");
    }
    catch (error) {
        console.error(error);
        res.status(400);
    }
}));
exports.orderRouter.put("/:orderToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.params.orderToken;
    try {
        const buyerInfo = req.body;
        let result;
        let updateOrder = yield (0, order_service_1.getOrder)(token);
        if (!updateOrder) {
            console.error("Could not find order with such token");
            return;
        }
        const woltFeeBody = (0, wolt_fee_1.createWoltFeePayload)(buyerInfo, updateOrder);
        if (!woltFeeBody) {
            console.error("Wolt free body is undefined");
            return;
        }
        const woltFeeResponse = yield (0, delivery_fee_1.default)(woltFeeBody);
        if (woltFeeResponse != "ERR_BAD_REQUEST") {
            updateOrder.buyer = buyerInfo;
            result = yield (0, order_service_1.putOrder)(updateOrder, token);
            res.status(201).send(woltFeeResponse);
            return;
        }
        res.status(500).send(woltFeeResponse);
    }
    catch (error) {
        console.error(error);
        res.status(400);
    }
}));
exports.orderRouter.post("/:orderToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.params.orderToken;
    try {
        const order = yield (0, order_service_1.getOrder)(token);
        if (!order) {
            console.error("Could not find order with such token");
            res.status(400).send("ERR_BAD_REQUEST");
            return;
        }
        const woltDeliveryBody = (0, wolt_delivery_1.createWoltDeliveryPayload)(order);
        if (!woltDeliveryBody) {
            console.error("Wolt free body is undefined");
            return;
        }
        const woltOrdersResponse = yield (0, delivery_order_1.default)(woltDeliveryBody);
        if (woltOrdersResponse != "ERR_BAD_REQUEST") {
            res.status(201).send(woltOrdersResponse);
            return;
        }
        res.status(500).send(woltOrdersResponse);
    }
    catch (error) {
        console.error(error);
        res.status(400);
    }
}));
