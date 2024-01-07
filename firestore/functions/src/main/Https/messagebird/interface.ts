export interface newConversationMessageBird {
  type: "conversation.created";
  contact: ContactMBInterface;
  conversation: ConversationMBInterface;
  query: string;
}

export interface ContactMBInterface {
  id: string;
  href: string; //"https://rest.messagebird.com/1/contacts/9354647c5b144a2b4c99f2n42497249"
  msisdn: number;
  firstName: string;
  lastName: string;
  displayName?: string;
  customDetails: { [key: string]: string | null };
  attributes?: { [key: string]: string | null };
  createdDatetime: string | null;
  updatedDatetime: string | null;
}

export interface ConversationMBInterface {
  id: string;
  contactId: string;
  status: "active" | "archived";
  createdDatetime: string | null;
  updatedDatetime: string | null;
  lastReceivedDatetime: string | null;
  lastUsedChannelId?: string;
  lastUsedPlatformId?: "whatsapp";
}

export interface MessageMBInterface {
  status: "received";
  to: string;
  platform: "whatsapp";
  channelId: string;
  from: string;
  type: "text";
  content: {
    text?: string;
    image?: messageBirdImage;
    file?: messageBirdImage;
  };
  createdDatetime: string;
  direction: "received";
  id: string;
  updatedDatetime: string;
  origin: "inbound" | "api";
  conversationId: string;
}

export interface messageBirdImage {
  url: string;
  caption?: string;
}

export interface newMessageMessageBird {
  type: "message.created";
  contact: ContactMBInterface;
  conversation: ConversationMBInterface;
  message: MessageMBInterface;
}
