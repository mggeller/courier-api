import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import { orderRouter } from "./controllers/order.controller";
import cors from 'cors';
import getDeliveryOrders from "./controllers/delivery-order";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT;
app.use(cors());

app.use('/orders', orderRouter);

app.get('/delivery-orders', async (req: Request, res: Response) => {
  const result = await getDeliveryOrders();

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
