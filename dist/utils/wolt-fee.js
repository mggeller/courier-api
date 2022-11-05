"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWoltFeePayload = void 0;
const createWoltFeePayload = (buyerInfo, order) => {
    if (!order.seller || !order.seller.address) {
        return;
    }
    if (!buyerInfo.address) {
        return;
    }
    const woltFeeBody = {
        pickup: {
            location: {
                formatted_address: order.seller.address,
            },
        },
        dropoff: {
            location: {
                formatted_address: buyerInfo.address,
            },
        },
    };
    return woltFeeBody;
};
exports.createWoltFeePayload = createWoltFeePayload;
