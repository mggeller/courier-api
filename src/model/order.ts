import { Customer } from "./customer";
import { ObjectId } from "mongodb";

interface Order {
    id?: ObjectId;
    orderToken: string;
    seller?: Customer;
    buyer?: Customer;
    accountNumber?: string;
    price?: number;
    height?: number;
    width?: number;
    length?: number;
    weight?: number;
    trackingLink?: string;
};


export default Order;