import axios from "axios";
import { WoltFee } from "../model/wolt";

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
    
    return data;
  } catch (error) {
    return 'ERR_BAD_REQUEST';
  }
};

export default getDeliveryFee;
