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
    "pickup": {
        "location": {
            "formatted_address": "Arkadiankatu 3-6"
        },
        "comment": "The box is in front of the door",
        "contact_details": {
            "name": "John Doe",
            "phone_number": "+358123456789",
            "send_tracking_link_sms": false
        }
    },
    "dropoff": {
        "location": {
            "formatted_address": "Otakaari 24, 02150 Espoo"
        },
        "contact_details": {
            "name": "John Doe's wife",
            "phone_number": "+358123456789",
            "send_tracking_link_sms": false
        },
        "comment": "Leave at the door, please"
    },
    "customer_support": {
        "email": "string",
        "phone_number": "string",
        "url": "string"
    },
    "merchant_order_reference_id": null,
    "is_no_contact": true,
    "contents": [
        {
            "count": 1,
            "description": "plastic bag",
            "identifier": "12345",
            "tags": []
        }
    ],
    "tips": [],
    "min_preparation_time_minutes": 10,
    "scheduled_dropoff_time": null
};
const getDeliveryOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`https://daas-public-api.development.dev.woltapi.com/merchants/${process.env.MERCHANT_ID}/delivery-order`, testData, {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": `Bearer ${process.env.API_KEY}`
        }
    });
    const data = response.data;
    return data;
});
exports.default = getDeliveryOrders;
