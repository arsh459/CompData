import { ContactMBInterface, MessageMBInterface } from "../../interface";

export const newConversationAutoMessage = (contact: ContactMBInterface) => {
  return `@~Auto message sent to user:\n\n"Hi ${getName_MB(
    contact,
  )},\n\n${bodyMessage}"`;
};

export const getName_MB = (contact: ContactMBInterface) => {
  if (contact.displayName) {
    return contact.displayName;
  }

  if (contact.firstName) {
    return contact.firstName;
  }

  if (contact.lastName) {
    return `Mr/Ms ${contact.lastName}`;
  }

  return "there";
};

const bodyMessage = "";
// "Thank you for reaching out. We are a group of passionate travellers who will help you plan your next Holiday. Our experts assist you in everything travel, right from booking your hotels to planning the entire itinerary, at the best prices! All you need to do is, chat with us here.\n\nIn the next messages,  please share some more details about your trip, it will help us match you with the best travel planner for your need!\n\nCheers,\nTeam Holidaying";
// "Thank you for reaching out. We are a group passionate travellers who will help you plan your next exciting adventure. Please allow us to connect with you a local expert to help you better";

export const newHolidayingMessage = (
  message: MessageMBInterface,
  contact: ContactMBInterface,
) => {
  return `Hi there\nNew message to Holidaying!.\n\nMessage:${
    message.content.text
  }\n~ ${message.from}\n\nContact details:\nDisplayName: ${getName_MB(
    contact,
  )}\nMobile: ${
    contact.msisdn
  }\n\nNextSteps:\nQualify lead in app and assign to influencer\n\nThank you!`;
};

export const createNewTicket = (messageFromUser: MessageMBInterface) => {
  return `"${
    messageFromUser.content.text
      ? messageFromUser.content.text
      : messageFromUser.content.image
      ? "image"
      : ""
  }"\n\n@~ This is a message from a Whatsapp user. Please qualify this lead by getting location, dates, offbeat/classic, budget and perople travelling.`;
};

export const expireMessage = () => {
  return `Hi there\nHey there, if you wish to keep this chat active, please respond with a 'YES'. We wont be sending any more messages in case you are not interested. Thank you!`;
};

export const expireMessageToGroup = () => {
  return `@~This message has been sent to the user:\n\n"Hi there\nHey there, if you wish to keep this chat active, please respond with a 'YES'. We wont be sending any more messages in case you are not interested. Thank you!"`;
};

export const getExpiredConvMessage = () => {
  return `Hi there!\nThis conversation has exceeded the 24 hr limit. Your messages would not be delivered to the user`;
};
