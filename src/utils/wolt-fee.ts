import { Customer } from "../model/customer";
import Order from "../model/order";
import { WoltFee } from "../model/wolt";

export const createWoltFeePayload = (
  buyerInfo: Customer,
  order: Order
) => {
  if (!order.seller || !order.seller.address) {
    return;
  }

  if (!buyerInfo.address) {
    return;
  }
  const woltFeeBody: WoltFee = {
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
