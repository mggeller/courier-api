export interface WoltFee {
  pickup: {
    location: {
      formatted_address: string;
      coordinates?: {
        lat: 0;
        lon: 0;
      };
    };
  };
  dropoff: {
    location: {
      formatted_address: string;
      coordinates?: {
        lat: 0;
        lon: 0;
      };
    };
  };
  scheduled_dropoff_time?: string;
}

export interface WoltDeliveryOrder {
  pickup: {
    location: {
      formatted_address: "string";
      coordinates: {
        lat: 0;
        lon: 0;
      };
    };
    comment: "string";
    contact_details: {
      name: "string";
      phone_number: "string";
      send_tracking_link_sms: true;
    };
  };
  dropoff: {
    location: {
      formatted_address: "string";
      coordinates: {
        lat: 0;
        lon: 0;
      };
    };
    contact_details: {
      name: "string";
      phone_number: "string";
      send_tracking_link_sms: true;
    };
    comment: "string";
  };
  customer_support: {
    email: "string";
    phone_number: "string";
    url: "string";
  };
  merchant_order_reference_id?: string;
  is_no_contact: true;
  contents: [
    {
      count: 0;
      description: "string";
      identifier: "string";
      tags: ["alcohol"];
    }
  ];
  tips: [
    {
      type: "pre_delivery_courier_tip";
      price: {
        amount: 0;
        currency: "string";
      };
    }
  ];
  min_preparation_time_minutes: 0;
  scheduled_dropoff_time: "2019-08-24T14:15:22Z";
}
