import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import {
  createOrder,
  getAll,
  getOrder,
  putOrder,
} from "../services/order.service";
import cors from "cors";
import { ObjectId } from "mongodb";
import { WoltFee } from "../model/wolt";
import getDeliveryFee from "./delivery-fee";

type GetOrderResponse = {
  id?: ObjectId;
  orderToken: string;
  accountNumber?: string;
  price?: number;
  height?: number;
  width?: number;
  length?: number;
  weight?: number;
};

export const orderRouter = express.Router();

orderRouter.use(bodyParser.json());
orderRouter.use(cors());

orderRouter.get("/", async (req: Request, res: Response) => {
  try {
    const orders = await getAll();

    if (!orders) {
      console.log("Did not find any extra steps");
      res.status(500).send("Could not find any orders");
    }

    console.log("Orders: ", orders);
    res.status(200).send(orders);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

orderRouter.get("/:orderToken", async (req: Request, res: Response) => {
  const token = req.params.orderToken;

  try {
    const order = await getOrder(token);

    if (!order) {
      console.error("Could not find order with such token");
      return;
    }

    const { id, orderToken, accountNumber, price, height, width, length, weight } = order;
    const getOrderResponse: GetOrderResponse = {
      id: id,
      orderToken: orderToken,
      accountNumber: accountNumber,
      price: price,
      height: height,
      width: width,
      length: length,
      weight: weight
    };

    res.status(200).send(getOrderResponse);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

orderRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newOrder = req.body;
    const result = await createOrder(newOrder);

    result
      ? res.status(201).send(result)
      : res.status(500).send("Failed to creat new order");
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

orderRouter.put("/:orderToken", async (req: Request, res: Response) => {
  const token = req.params.orderToken;

  try {
    const buyerInfo = req.body;

    let result;
    let updateOrder = await getOrder(token);

    if (!updateOrder) {
      console.error("Could not find order with such token");
      return;
    }


    const woltFeeBody: WoltFee = {
      pickup: {
        location: {
          formatted_address: updateOrder.seller?.address!,
        },
      },
      dropoff: {
        location: {
          formatted_address: buyerInfo.address,
        },
      },
    };

    const woltFeeResponse = await getDeliveryFee(woltFeeBody);

    if (woltFeeResponse != 'ERR_BAD_REQUEST') {
      updateOrder.buyer = buyerInfo;
      result = await putOrder(updateOrder, token);
      res.status(201).send(woltFeeResponse);
      return;
    }

    console.log("WOLT RESP: ", woltFeeResponse);
    res.status(500).send(woltFeeResponse);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});
