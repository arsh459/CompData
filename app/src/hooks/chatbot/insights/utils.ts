import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  AutoChatMessage,
  AutoMessageResponse,
  AutoRoom,
  AutoRoomIDs,
} from "@models/ChatBot/insights";
import { TOKEN_LIMIT } from "@modules/ChatBot/StartNewChatMain/utils";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { makeInsightsCall } from "./api";
// import { initialBaseInsightsMessage } from "./constants";
import { GPTMessage, gptModels, roleTypes } from "@models/ChatBot/interface";
import { EmojiItem } from "./useSakhiInsightsV2";

export const MAX_TOKEN_LENGTH = 3790;

export const getPreviousRoomData = async (uid: string, roomId: AutoRoomIDs) => {
  const autoRoomDoc = await firestore()
    .collection("users")
    .doc(uid)
    .collection("autoRooms")
    .doc(roomId)
    .get();

  if (autoRoomDoc.data()) {
    const room = autoRoomDoc.data() as AutoRoom;
    const allDocs = await firestore()
      .collection("users")
      .doc(uid)
      .collection("autoRooms")
      .doc(roomId)
      .collection("autoMessages")
      .where("inContext", "==", true)
      .orderBy("createdOn", "desc")
      .get();

    const { lastResponse, chatMessages } = fetchAllMessages(allDocs);

    return { room, lastResponse, chatMessages };
  }
};

export const clearContext = async (uid: string, roomId: string) => {
  const allDocs = await firestore()
    .collection("users")
    .doc(uid)
    .collection("autoRooms")
    .doc(roomId)
    .collection("autoMessages")
    .where("inContext", "==", true)
    .orderBy("createdOn", "desc")
    .get();

  for (const doc of allDocs.docs) {
    doc.ref.update({ inContext: false });
  }

  // clear context
  await firestore()
    .collection("users")
    .doc(uid)
    .collection("autoRooms")
    .doc(roomId)
    .update({ [`usage.total_tokens`]: 0 });
};

export const handleGPTInsight = async (
  uid: string,
  roomId: AutoRoomIDs,
  newPrompt: string,
  intialPrompt: string,
  apiKey: string
) => {
  let gptRes: GPTMessage | undefined = undefined;
  const batch = firestore().batch();

  const autoRoomDoc = await firestore()
    .collection("users")
    .doc(uid)
    .collection("autoRooms")
    .doc(roomId)
    .get();

  const room = autoRoomDoc.data() as AutoRoom;

  if (
    room &&
    typeof room.usage?.total_tokens === "number" &&
    room.usage.total_tokens >= MAX_TOKEN_LENGTH
  ) {
    // clear room
    await clearContext(uid, roomId);
  }

  if (room) {
    const allDocs = await firestore()
      .collection("users")
      .doc(uid)
      .collection("autoRooms")
      .doc(roomId)
      .collection("autoMessages")
      .where("inContext", "==", true)
      .orderBy("createdOn", "desc")
      .get();

    const { lastResponse, chatMessages } = fetchAllMessages(allDocs);

    // chats
    const userUpdatedMessageResponse = getUpdatedMessageResponse(
      newPrompt,
      "user",
      lastResponse
    );

    const gpt = messegesToGPTMessages(chatMessages);

    const response = await makeInsightsCall(
      [
        { role: "user", content: intialPrompt },
        ...gpt,
        { role: "user", content: newPrompt },
      ],
      "gpt-3.5-turbo",
      apiKey
    );

    if (response) {
      gptRes = response.choices[0].message;
      const gptUpdatedMessageResponse = getUpdatedMessageResponse(
        gptRes.content,
        gptRes.role,
        userUpdatedMessageResponse
      );

      // update usage of room
      batch.update(
        firestore()
          .collection("users")
          .doc(uid)
          .collection("autoRooms")
          .doc(room.id),
        {
          usage: response.usage,
        }
      );

      batch.set(
        firestore()
          .collection("users")
          .doc(uid)
          .collection("autoRooms")
          .doc(room.id)
          .collection("autoMessages")
          .doc(gptUpdatedMessageResponse.id),
        gptUpdatedMessageResponse,
        {
          merge: true,
        }
      );

      await batch.commit();

      return gptRes;
    }
  } else {
    const room = createNewRoom(roomId, "gpt-3.5-turbo", intialPrompt);
    const messageResponse = createNewMessageResponse(newPrompt, "user");

    batch.set(
      firestore()
        .collection("users")
        .doc(uid)
        .collection("autoRooms")
        .doc(room.id),
      room
    );

    const gpt = messegesToGPTMessages(messageResponse.messages);
    const response = await makeInsightsCall(
      [{ role: "user", content: intialPrompt }, ...gpt],
      "gpt-3.5-turbo",
      apiKey
    );

    if (response) {
      gptRes = response.choices[0].message;
      const gptUpdatedMessageResponse = getUpdatedMessageResponse(
        gptRes.content,
        gptRes.role,
        messageResponse
      );

      batch.set(
        firestore()
          .collection("users")
          .doc(uid)
          .collection("autoRooms")
          .doc(room.id)
          .collection("autoMessages")
          .doc(gptUpdatedMessageResponse.id),
        gptUpdatedMessageResponse
      );
    }

    await batch.commit();

    return gptRes;
  }
};

export const fetchAllMessages = (
  responses: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
) => {
  const chatMessages: AutoChatMessage[] = [];
  let lastResponse: AutoMessageResponse | undefined;

  if (responses?.docs) {
    for (const doc of responses.docs) {
      const remoteMessage = doc.data() as AutoMessageResponse;

      for (let j: number = remoteMessage.messages.length - 1; j >= 0; j--) {
        chatMessages.push(remoteMessage.messages[j]);
      }

      if (!lastResponse) {
        lastResponse = remoteMessage;
      }
    }
  }

  return {
    lastResponse,
    chatMessages,
  };
};

export const messegesToGPTMessages = (
  messages: AutoChatMessage[]
): GPTMessage[] => {
  const gptMessages: GPTMessage[] = [];

  for (let j: number = messages.length - 1; j >= 0; j--) {
    gptMessages.push({
      role: messages[j].role,
      content: messages[j].content,
    });
  }

  return gptMessages;
};

export const getUpdatedMessageResponse = (
  newMessage: string,
  role: roleTypes,
  lastMessageResponse?: AutoMessageResponse
): AutoMessageResponse => {
  if (lastMessageResponse && lastMessageResponse.messages.length < 10) {
    return {
      ...lastMessageResponse,
      updatedOn: Date.now(),
      numMessages: lastMessageResponse?.numMessages
        ? lastMessageResponse?.numMessages + 1
        : 1,
      messages: [
        ...lastMessageResponse.messages,
        {
          role: role,
          content: newMessage,
          createdOn: Date.now(),
          id: uuidv4(),
        },
      ],
    };
  } else {
    return createNewMessageResponse(newMessage, role);
  }
};

export const createNewMessageResponse = (
  newMessage: string,
  role: roleTypes
): AutoMessageResponse => {
  const now = Date.now();
  return {
    inContext: true,
    id: uuidv4(),
    createdOn: now,
    updatedOn: now,
    numMessages: 1,
    messages: [
      {
        id: uuidv4(),
        createdOn: Date.now(),
        content: newMessage,
        role,
      },
    ],
  };
};

export const createNewRoom = (
  roomId: AutoRoomIDs,
  model: gptModels,
  initialPrompt: string
): AutoRoom => {
  return {
    id: roomId,
    createdOn: Date.now(),
    model: model,
    initialPrompt,
    tokenLimit: TOKEN_LIMIT,
    usage: {
      total_tokens: 0,
      prompt_tokens: 0,
      completion_tokens: 0,
    },
  };
};

export const parseResultsForFrontend = (
  input: string
): EmojiItem | undefined => {
  let name: string = "";
  let reason: string = "";

  let nameMatch = input.match(/Name: \[(.*?)\]|Name: (.*?)(?=\n|$)/);
  let reasonMatch = input.match(/Reason: \[(.*?)\]|Reason: (.*?)(?=\n|$)/);

  if (nameMatch) {
    name = nameMatch[1] ?? nameMatch[2];
  }
  if (reasonMatch) {
    reason = reasonMatch[1] ?? reasonMatch[2];
  }

  // let lines = input.split("\n");
  // lines = lines.filter(
  //   (line) =>
  //     !line.startsWith("Name:") &&
  //     !line.startsWith("Reason:") &&
  //     !line.startsWith("Instruction:")
  // );
  // let body = lines.join("\n\n");
  return name && reason ? { name, reason } : undefined;
};
