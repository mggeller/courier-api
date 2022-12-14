import { collections, connectToDatabase } from "./database.service";
import Order from "../model/order";
import {} from "module";
import { v4 as uuidv4 } from "uuid";

type PostResponse = {
  token: string;
};

export const getAll = async () => {
  let orders;
  try {
    await connectToDatabase();
    orders = await collections.orders?.find({}).toArray();
    return orders;
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit();
  }
};

export const getOrder = async (orderToken: string) => {
  let order;
  try {
    await connectToDatabase();
    const query = { orderToken: orderToken };
    order = await collections.orders?.findOne(query);

    return order;
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit();
  }
};

export const createOrder = async (order: Order) => {
  let result;
  try {
    await connectToDatabase();
    const token = uuidv4();
    order.orderToken = token;
    result = await collections.orders?.insertOne(order);

    const response: PostResponse = {
      token: token,
    };

    return response;
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit();
  }
};

export const putOrder = async (order: Order, orderToken: string) => {
  let result;
  try {
    await connectToDatabase();
    const query = { orderToken: orderToken };

    result = await collections.orders?.updateOne(query, { $set: order });

    return result?.upsertedId;
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit();
  }
};
