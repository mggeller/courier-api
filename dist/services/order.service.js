"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putOrder = exports.createOrder = exports.getOrder = exports.getAll = void 0;
const database_service_1 = require("./database.service");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const orders = yield ((_a = database_service_1.collections.orders) === null || _a === void 0 ? void 0 : _a.find({}).toArray());
    return orders;
});
exports.getAll = getAll;
const getOrder = (token) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const query = { token: token };
    const order = yield ((_b = database_service_1.collections.orders) === null || _b === void 0 ? void 0 : _b.findOne(query));
    return order;
});
exports.getOrder = getOrder;
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const result = yield ((_c = database_service_1.collections.orders) === null || _c === void 0 ? void 0 : _c.insertOne(order));
    return result === null || result === void 0 ? void 0 : result.insertedId;
});
exports.createOrder = createOrder;
const putOrder = (order, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const query = { token: token };
    const result = yield ((_d = database_service_1.collections.orders) === null || _d === void 0 ? void 0 : _d.updateOne(query, { $set: order }));
    return result === null || result === void 0 ? void 0 : result.upsertedId;
});
exports.putOrder = putOrder;
