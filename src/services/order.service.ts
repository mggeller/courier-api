import { collections } from "./database.service";
import Order from "../model/order";

export const getAll = async () => {
    const orders = await collections.orders?.find({}).toArray();
    return orders;
};

export const getOrder = async (token: string) => {
    const query = { token: token };
    const order = await collections.orders?.findOne(query);

    return order;
};

export const createOrder = async (order: Order) => {
    const result = await collections.orders?.insertOne(order);

    return result?.insertedId;
};

export const putOrder = async (order: Order, token: string) => {
    const query = { token: token };

    const result = await collections.orders?.updateOne(query, { $set: order });

    return result?.upsertedId;
};
