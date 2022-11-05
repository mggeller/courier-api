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
      formatted_address: string;
    };
    comment: string;
    contact_details: {
      name: string;
      phone_number: string;
      send_tracking_link_sms: false;
    };
  };
  dropoff: {
    location: {
      formatted_address: string;
    };
    contact_details: {
      name: string;
      phone_number: string;
      send_tracking_link_sms: false;
    };
    comment: string;
  };
  customer_support: {
    email: string;
    phone_number: string;
    url: string;
  };
  merchant_order_reference_id?: string;
  is_no_contact: true;
  contents: [
    {
      count: number;
      description: string;
      identifier: string;
      tags: string[];
    }
  ];
  tips: [];
  min_preparation_time_minutes: number;
  scheduled_dropoff_time?: string;
}
