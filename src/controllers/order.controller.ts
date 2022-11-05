import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { createOrder, getAll, getOrder, putOrder } from "../services/order.service";
import cors from 'cors';

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

orderRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newOrder = req.body;
    const result = await createOrder(newOrder);

    result
      ? res
          .status(201)
          .send(`Successfully created a new order with id ${result}`)
      : res.status(500).send("Failed to creat new order");
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

orderRouter.put("/:token", async (req: Request, res: Response) => {
  const token = req.params.token;

  try {
    const buyerInfo = req.body;
    let updateOrder = await getOrder(token);
    let result;
    if(!updateOrder) {
        console.error('Could not find order with such token');
        return;
    }

    if (updateOrder != undefined || updateOrder != null) {
        updateOrder.buyer = buyerInfo;
        result = await putOrder(updateOrder, token);
    }

    result
      ? res.status(200).send(`Successfully updated order with token: ${token}`)
      : res.status(304).send(`Order with token: ${token} not updated`);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});