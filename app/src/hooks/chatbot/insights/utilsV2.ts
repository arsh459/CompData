import { AdditionalGPTBodyObj, GPTMessage } from "@models/ChatBot/interface";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
import {
  AutoMessageResponse,
  AutoRoom,
  AutoRoomIDs,
} from "@models/ChatBot/insights";
import {
  MAX_TOKEN_LENGTH,
  clearContext,
  createNewMessageResponse,
  createNewRoom,
  fetchAllMessages,
  getUpdatedMessageResponse,
  messegesToGPTMessages,
} from "./utils";
import { getEstimatedTokensFromResponse, makeSSECall } from "../utils";
import { Usage } from "@models/ChatBot/openAI";

export const initTokenValues = { YOGA: 147, DIET: 201 };

export const handleGPTInsight = async (
  uid: string,
  roomId: AutoRoomIDs,
  newPrompt: string,
  intialPrompt: string,
  setData: (val: string) => void,
  onFinish: (val: string) => void,
  onError: () => void,
  apiKey: string
) => {
  let messeages: GPTMessage[] = [];
  let autoRoom: AutoRoom | undefined = undefined;
  let messeagesResponse: AutoMessageResponse | undefined = undefined;
  const batch = firestore().batch();

  if (uid) {
    const doc = await firestore()
      .collection("users")
      .doc(uid)
      .collection("autoRooms")
      .doc(roomId)
      .get();

    if (doc.data()) {
      autoRoom = doc.data() as AutoRoom;

      // clear context if needed
      if (
        autoRoom &&
        typeof autoRoom.usage?.total_tokens === "number" &&
        autoRoom.usage.total_tokens >= MAX_TOKEN_LENGTH
      ) {
        // clear room
        await clearContext(uid, roomId);
      }

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

      messeagesResponse = getUpdatedMessageResponse(
        newPrompt,
        "user",
        lastResponse
      );

      const gpt = messegesToGPTMessages(chatMessages);
      messeages.push({ role: "user", content: intialPrompt }, ...gpt, {
        role: "user",
        content: newPrompt,
      });
    } else {
      autoRoom = createNewRoom(roomId, "gpt-3.5-turbo", intialPrompt);
      messeagesResponse = createNewMessageResponse(newPrompt, "user");

      const gpt = messegesToGPTMessages(messeagesResponse.messages);
      messeages.push({ role: "user", content: intialPrompt }, ...gpt);
    }

    makeSSECall(
      messeages,
      setData,
      async (val: string, usage?: Usage) => {
        const gptUpdatedMessageResponse = getUpdatedMessageResponse(
          val,
          "assistant",
          messeagesResponse
        );

        const valueResponse = getEstimatedTokensFromResponse(val);
        const userPrompt = getEstimatedTokensFromResponse(newPrompt);

        let finalTokens: number = valueResponse + userPrompt;
        // only for new rooms
        if (autoRoom?.usage?.total_tokens === 0) {
          finalTokens +=
            roomId === "DIET" ? initTokenValues.DIET : initTokenValues.YOGA;
        }

        if (autoRoom) {
          const data = finalTokens
            ? {
                ...autoRoom,
                usage: {
                  total_tokens: firestore.FieldValue.increment(finalTokens),
                },
              }
            : autoRoom;
          batch.set(
            firestore()
              .collection("users")
              .doc(uid)
              .collection("autoRooms")
              .doc(autoRoom.id),
            data,
            { merge: true }
          );
        }

        batch.set(
          firestore()
            .collection("users")
            .doc(uid)
            .collection("autoRooms")
            .doc(roomId)
            .collection("autoMessages")
            .doc(gptUpdatedMessageResponse.id),
          gptUpdatedMessageResponse,
          {
            merge: true,
          }
        );

        try {
          await batch.commit();
        } catch (error: any) {
          console.log("batch commit erorr", error);
          crashlytics().recordError(error);
        }

        onFinish(val);
      },
      (message: string) => {
        onError();
        clearContext(uid, roomId);
        console.log("message", message);
      },
      1,
      "gpt-3.5-turbo",
      apiKey,
      additionalGPTData
    );
  }
};

function parseBetweenIdentifiers(input: string): string[] {
  const matches = input.match(/\[(.*?)\]/g);
  return matches ? matches.map((match) => match.slice(1, -1)) : [];
}

export const parseString = (str: string): { name: string; reason: string } => {
  const response = parseBetweenIdentifiers(str);

  return {
    name: response.length ? response[0] : "",
    reason: response.length === 2 ? response[1] : "",
  };
};

export const formatStream = (str: string) => {
  const nameRemoved = str.replace("Name", "");

  const reasonRemoved = nameRemoved.replace("Reason", "");

  const lSquareRemoved = reasonRemoved.replaceAll("[", "");

  const rSquareRemoved = lSquareRemoved.replaceAll("]", "");

  return rSquareRemoved.replaceAll(":", "").trim();
};

export const additionalGPTData: AdditionalGPTBodyObj = {
  temperature: 1,
  top_p: 1,
  max_tokens: 150,
  presence_penalty: 1,
  frequency_penalty: 1,
};

export const insightGPTData: AdditionalGPTBodyObj = {
  temperature: 1,
  top_p: 1,
  max_tokens: 2500,
  presence_penalty: 1,
  frequency_penalty: 1,
};
