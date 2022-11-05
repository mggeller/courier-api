import axios from "axios";
import express, { Express } from "express";
import { WoltFee } from "../model/wolt";

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

const getDeliveryFee = async (woltFeePayload: WoltFee) => {
  try {
    const response = await axios.post(
      `https://daas-public-api.development.dev.woltapi.com/merchants/${process.env.MERCHANT_ID}/delivery-fee`,
      woltFeePayload,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
  
    const data = response.data;
  
    console.log('DATA: ', data);
  
    return data;
  } catch (error) {
    return 'ERR_BAD_REQUEST';
  }
};

export default getDeliveryFee;
