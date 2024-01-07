import { MessageResponse, Room } from "../../../models/Room/Room";
import * as admin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { gptConfig } from "../../../models/Room/constants";
import OpenAI from "openai";

export const saveResponse = async (
  uid: string,
  room: Room,
  response: OpenAI.Chat.Completions.ChatCompletion, // TurboResponse,

  systemPrompt: string,
  lastResponse?: MessageResponse,
  //   isOffline: boolean,
  //   titlePrompt: string,
  //   imagePrompt: string,
  //   title: string,
) => {
  const batch = admin.firestore().batch();

  if (response.choices.length) {
    const responseFromGPT = response.choices[0];

    // console.log("responseFromGPT", responseFromGPT);

    const updatedRoom = getUpdatedRoom(
      room,
      response,
      systemPrompt,
      responseFromGPT,
    );

    batch.update(
      admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("rooms")
        .doc(updatedRoom.id),
      { ...updatedRoom },
    );

    const updatedMessageResponse = getUpdatedResponse(
      responseFromGPT,
      lastResponse,
    );

    batch.set(
      admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("rooms")
        .doc(updatedRoom.id)
        .collection("messages")
        .doc(updatedMessageResponse.id),
      updatedMessageResponse,
      { merge: true },
    );
  }

  await batch.commit();
};

const getUpdatedRoom = (
  room: Room,
  response: OpenAI.Chat.Completions.ChatCompletion, //TurboResponse,
  systemPrompt: string,
  responseFromGPT: OpenAI.Chat.Completions.ChatCompletion.Choice,
): Room => {
  const lastMessageText = !responseFromGPT.message?.content
    ? ""
    : responseFromGPT.message?.content.length > 80
    ? `${responseFromGPT.message.content.slice(0, 80)}...`
    : responseFromGPT.message.content;

  return {
    ...room,
    usage: response.usage,
    systemPrompt: systemPrompt,
    // title,
    // titlePrompt,
    // imagePrompt,
    model: gptConfig.model,
    tokenLimit: gptConfig.modelLimit, // for this model
    updatedOn: Date.now(),
    lastMessage: lastMessageText,
    // ...(isOffline
    //   ? { unreadMessages: room.unreadMessages ? room.unreadMessages + 1 : 1 }
    //   : {}),
  };
};

const getUpdatedResponse = (
  responseFromGPT: OpenAI.Chat.Completions.ChatCompletion.Choice, // GPTChoice,
  lastResponse?: MessageResponse,
): MessageResponse => {
  if (lastResponse?.messages && lastResponse?.messages.length >= 10) {
    return {
      id: uuidv4(),
      createdOn: Date.now(),
      updatedOn: Date.now(),
      numMessages: 1,
      messages: [
        {
          content: responseFromGPT.message.content
            ? responseFromGPT.message.content
            : "",
          role: responseFromGPT.message.role,
          id: uuidv4(),
          createdOn: Date.now(),
        },
      ],
    };
  } else {
    return {
      id: lastResponse?.id ? lastResponse.id : uuidv4(),
      createdOn: lastResponse?.createdOn ? lastResponse.createdOn : Date.now(),
      updatedOn: Date.now(),
      numMessages: lastResponse?.numMessages
        ? lastResponse?.numMessages + 1
        : 1,
      messages: [
        ...(lastResponse?.messages ? lastResponse?.messages : []),
        {
          content: responseFromGPT.message.content
            ? responseFromGPT.message.content
            : "",
          role: responseFromGPT.message.role,
          id: uuidv4(),
          createdOn: Date.now(),
        },
      ],
    };
  }
};

export const inactivateRoom = async (uid: string, room: Room) => {
  const batch = admin.firestore().batch();

  const updatedRoom: Room = {
    ...room,
    status: "inactive",
    updatedOn: Date.now(),
  };

  batch.update(
    admin
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("rooms")
      .doc(updatedRoom.id),
    { ...updatedRoom },
  );

  await batch.commit();
};

const parseTitle = (choice: OpenAI.Chat.Completions.ChatCompletion.Choice) => {
  const content = choice.message.content;

  const titleParts = content ? content.split("Title:") : "";

  if (titleParts.length === 2) {
    return titleParts[1].trim();
  }

  return "";
};

export const saveTitle = async (
  uid: string,
  roomId: string,
  response: OpenAI.Chat.Completions.ChatCompletion, //TurboResponse,
) => {
  if (response.choices.length) {
    const responseFromGPT = response.choices[0];

    const title = parseTitle(responseFromGPT);

    // console.log("response", responseFromGPT);

    if (responseFromGPT.message.content) {
      await admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("rooms")
        .doc(roomId)
        .update({
          title: title,
        });

      return title;
    }
  }

  return "";
};

export const savePrompts = async (
  uid: string,
  roomId: string,
  prompts: string[],
) => {
  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("rooms")
    .doc(roomId)
    .update({
      roomPromptsForUser: prompts,
    });
};

export const saveUserPrompts = async (uid: string, prompts: string[]) => {
  await admin.firestore().collection("users").doc(uid).update({
    gptPrompts: prompts,
  });
};
