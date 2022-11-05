import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import { orderRouter } from "../src/controllers/order.controller";
import cors from 'cors';
import getDeliveryOrders from "../src/controllers/delivery-order";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT;
app.use(cors());

app.use('/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
