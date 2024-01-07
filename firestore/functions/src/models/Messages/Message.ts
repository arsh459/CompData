import { messageBirdImage } from "../../main/Https/messagebird/interface";

export interface Group {
  groupId: string;
  groupName?: string;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  members: { [uid: string]: UserSnippet };
  lastMessage?: lastMessage;
  groupImage?: string;
  membersUid: string[];
  ghostCustomer?: boolean;
  ghostLastUpdate?: number;
}

export interface lastMessage {
  text: string;
  sendBy: string;
  sendAt: number;
}

export interface UserSnippet {
  uid: string;
  imageURL?: string;
  name?: string;
  role: "admin" | "member";
  unread: number;
  isOnline: boolean;
  phone?: string;
  email?: string;
  influencer?: boolean;
  // isTyping: boolean;
}

export interface message {
  messageId: string;
  text: string;
  image?: messageBirdImage;
  file?: messageBirdImage;
  createdAt: number;
  uid: string;
  system: boolean;
  sentToGhost?: boolean;
  whatsappSync?: boolean;
  messageBirdId?: string;
}

export interface messageCreateResponse {
  id: string;
  status: "accepted" | "pending";
  fallback: null;
}
