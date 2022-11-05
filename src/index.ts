import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import { connectToDatabase } from "./services/database.service";
import { orderRouter } from "./controllers/order.controller";

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT;

connectToDatabase().then(() => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });
  
  app.use('/orders', orderRouter);

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
}).catch((error: Error) => {
  console.error('Database connection failed', error);
  process.exit();
});
