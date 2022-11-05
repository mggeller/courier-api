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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const testData = {
    pickup: {
        location: {
            formatted_address: "Arkadiankatu 3-6",
        },
    },
    dropoff: {
        location: {
            formatted_address: "Otakaari 24, 02150 Espoo",
        },
    },
};
const getDeliveryFee = (woltFeePayload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`https://daas-public-api.development.dev.woltapi.com/merchants/${process.env.MERCHANT_ID}/delivery-fee`, woltFeePayload, {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${process.env.API_KEY}`,
            },
        });
        const data = response.data;
        console.log('DATA: ', data);
        return data;
    }
    catch (error) {
        return 'ERR_BAD_REQUEST';
    }
});
exports.default = getDeliveryFee;
