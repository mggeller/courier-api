import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import { connectToDatabase } from "./services/database.service";
import { orderRouter } from "./controllers/order.controller";
import cors from 'cors';
import getDeliveryOrders from "./controllers/delivery-order";


dotenv.config();
const app: Express = express();
const PORT = process.env.PORT;
app.use(cors());

connectToDatabase().then(() => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });

  app.get('/delivery-orders', async (req: Request, res: Response) => {
    const result = await getDeliveryOrders();

    res.json(result);
  });
  
  app.use('/orders', orderRouter);

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
}).catch((error: Error) => {
  console.error('Database connection failed', error);
  process.exit();
});
