export interface interaketResponse {
  version?: string;
  timestamp?: string;
  type?:
    | "message_api_sent"
    | "message_api_delivered"
    | "message_api_read"
    | "message_api_failed";
  data?: ResponseData;
}

interface MetaData {
  source?: "PublicInterakt";
  source_data?: {
    callback_data?: string;
  };
}

interface ResponseData {
  customer?: Customer;
  message?: MessageInteraket;
}

interface MessageInteraket {
  id?: string;
  chat_message_type?: "PublicApiMessage";
  message_status?: "Sent";
  received_at_utc?: string;
  is_template_message?: boolean;

  meta_data?: MetaData;
}

interface Customer {
  id?: string;
  channel_phone_number: string;
  traits?: CustomerTrait;
}

interface CustomerTrait {
  name?: string;
  amount?: number;
  total_orders_count?: number;
  last_order_id?: string;
  created_at?: string;
  whatsapp_opted_id?: boolean;
}
