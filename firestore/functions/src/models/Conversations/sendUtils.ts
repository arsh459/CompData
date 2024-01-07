// import initMB from "messagebird";

import {
  ContactMBInterface,
  messageBirdImage,
} from "../../main/Https/messagebird/interface";
import { messageCreateResponse } from "../Messages/Message";
import * as admin from "firebase-admin";

// const messagebird = initMB("Frn0eTpEutxXMh8tjl8imKhcR");

const messagebird = require("messagebird")("Frn0eTpEutxXMh8tjl8imKhcR");

export const sendMessageToConversation = async (
  to: string,
  channelId: string,
  message: string,
  groupId?: string,
  messageId?: string,
  image?: messageBirdImage,
  file?: messageBirdImage,
) => {
  try {
    messagebird.conversations.send(
      {
        to: to,
        from: channelId,
        type: image ? "image" : file ? "file" : "text",
        content: {
          text: message,
          ...(image ? { image: image } : {}),
          ...(file ? { file: file } : {}),
        },
        reportUrl:
          "https://asia-east2-holidaying-prod.cloudfunctions.net/reportURL",
      },
      async (err: any, response: messageCreateResponse) => {
        if (err) {
          console.log("err", err);
        }

        // if messageId is present
        if (response.id && messageId && groupId) {
          await admin
            .firestore()
            .collection("groups")
            .doc(groupId)
            .collection("messages")
            .doc(messageId)
            .update({
              messageBirdId: response.id,
            });
        }
      },
    );

    // console.log("res", res);
  } catch (error) {
    console.log("error in sending message", error);
  }
};

export const getContact = async (id: string): Promise<ContactMBInterface> => {
  return messagebird.contacts.read(id, function (err: any, response: any) {
    if (err) {
      console.log("err", err);
    }

    console.log(response);

    return response as ContactMBInterface;
  });
};
