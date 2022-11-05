import axios from 'axios';
import { Request, Response } from "express";

const testData = {
    "pickup": {
      "location": {
          "formatted_address": "Arkadiankatu 3-6"
      },
      "comment": "The box is in front of the door",
      "contact_details": {
        "name": "John Doe",
        "phone_number": "+358123456789",
        "send_tracking_link_sms": false
      }
    },
    "dropoff": {
      "location": {
        "formatted_address": "Otakaari 24, 02150 Espoo"
      },
      "contact_details": {
        "name": "John Doe's wife",
        "phone_number": "+358123456789",
        "send_tracking_link_sms": false
      },
      "comment": "Leave at the door, please"
    },
    "customer_support": {
      "email": "string",
      "phone_number": "string",
      "url": "string"
    },
    "merchant_order_reference_id": null,
    "is_no_contact": true,
    "contents": [
      {
        "count": 1,
        "description": "plastic bag",
        "identifier": "12345",
        "tags": []
      }
    ],
    "tips": [],
    "min_preparation_time_minutes": 10,
    "scheduled_dropoff_time": null
};

const getDeliveryOrders = async (req: Request, res: Response) => {
    const response = await axios.post(`https://daas-public-api.development.dev.woltapi.com/merchants/${process.env.MERCHANT_ID}/delivery-order`, testData, {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": `Bearer ${process.env.API_KEY}`
        }
    });

    const data = response.data;
    res.json(data);

    return data;
};

export default getDeliveryOrders;