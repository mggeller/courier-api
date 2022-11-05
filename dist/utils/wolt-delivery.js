"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWoltDeliveryPayload = void 0;
const createWoltDeliveryPayload = (order) => {
    if (!order.seller ||
        !order.seller.address ||
        !order.seller.name ||
        !order.seller.mobile) {
        return;
    }
    if (!order.buyer ||
        !order.buyer.address ||
        !order.buyer.name ||
        !order.buyer.mobile) {
        return;
    }
    const woltDeliveryBody = {
        pickup: {
            location: {
                formatted_address: order.seller.address,
            },
            comment: "The box is in front of the door",
            contact_details: {
                name: order.seller.name,
                phone_number: order.seller.mobile,
                send_tracking_link_sms: false,
            },
        },
        dropoff: {
            location: {
                formatted_address: order.buyer.address,
            },
            contact_details: {
                name: order.buyer.name,
                phone_number: order.buyer.mobile,
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
    return woltDeliveryBody;
};
exports.createWoltDeliveryPayload = createWoltDeliveryPayload;
