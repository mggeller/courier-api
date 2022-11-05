import axios from "axios";
import express, { Express, Request, Response } from "express";

const testData = {
  pickup: {
    location: {
      formatted_address: "Arkadiankatu 3-6",
    },
  },
  dropoff: {
    location: {
      formatted_address: "Otakaari 24, 02150 Espoo",
    },
  },
};

const app: Express = express();

const getDeliveryFee = async (req: Request, res: Response) => {
  const response = await axios.post(
    `https://daas-public-api.development.dev.woltapi.com/merchants/${process.env.MERCHANT_ID}/delivery-fee`,
    testData,
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  );

  const data = response.data;
  res.json(data);
  
  return data;
};

export default getDeliveryFee;
