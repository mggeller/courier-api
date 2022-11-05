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
    var _a;
    const token = req.params.orderToken;
    try {
        const buyerInfo = req.body;
        let result;
        let updateOrder = yield (0, order_service_1.getOrder)(token);
        if (!updateOrder) {
            console.error("Could not find order with such token");
            return;
        }
        const woltFeeBody = {
            pickup: {
                location: {
                    formatted_address: (_a = updateOrder.seller) === null || _a === void 0 ? void 0 : _a.address,
                },
            },
            dropoff: {
                location: {
                    formatted_address: buyerInfo.address,
                },
            },
        };
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
    var _b, _c, _d, _e, _f, _g;
    const token = req.params.orderToken;
    try {
        const order = yield (0, order_service_1.getOrder)(token);
        if (!order) {
            console.error("Could not find order with such token");
            res.status(400).send("ERR_BAD_REQUEST");
            return;
        }
        const woltDeliveryBody = {
            pickup: {
                location: {
                    formatted_address: (_b = order.seller) === null || _b === void 0 ? void 0 : _b.address,
                },
                comment: "The box is in front of the door",
                contact_details: {
                    name: (_c = order.seller) === null || _c === void 0 ? void 0 : _c.name,
                    phone_number: (_d = order.seller) === null || _d === void 0 ? void 0 : _d.mobile,
                    send_tracking_link_sms: false,
                },
            },
            dropoff: {
                location: {
                    formatted_address: (_e = order.buyer) === null || _e === void 0 ? void 0 : _e.address,
                },
                contact_details: {
                    name: (_f = order.buyer) === null || _f === void 0 ? void 0 : _f.name,
                    phone_number: (_g = order.buyer) === null || _g === void 0 ? void 0 : _g.mobile,
                    send_tracking_link_sms: false,
                },
                comment: "Leave at the door, please",
            },
            customer_support: {
                email: "string",
                phone_number: "string",
                url: "string",
            },
            merchant_order_reference_id: undefined,
            is_no_contact: true,
            contents: [
                {
                    count: 1,
                    description: "plastic bag",
                    identifier: "12345",
                    tags: [],
                },
            ],
            tips: [],
            min_preparation_time_minutes: 10,
            scheduled_dropoff_time: undefined,
        };
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
