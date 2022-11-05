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

export const getOrder = async (token: string) => {
  let order;
  try {
    await connectToDatabase();
    const query = { token: token };
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
    console.log("TOKEN ON CREATE: ", token);
    order.orderToken = token;
    console.log("ORDER TO CREATE: ", order);
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

export const putOrder = async (order: Order, token: string) => {
  let result;
  try {
    await connectToDatabase();
    const query = { token: token };

    result = await collections.orders?.updateOne(query, { $set: order });

    return result?.upsertedId;
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit();
  }
};
