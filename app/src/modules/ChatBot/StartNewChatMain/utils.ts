import { saveFinalResponse } from "@hooks/chatbot/utils";
import { createNewMessageResponse } from "@hooks/chatbot/utils";
import {
  ChatMessage,
  MessageResponse,
  Room,
  gptModels,
} from "@models/ChatBot/interface";
import firestore from "@react-native-firebase/firestore";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const TOKEN_LIMIT = 128000;

export const handleResumeChatWithPrompt = async (
  uid: string,
  roomId: string,
  prompt: string
) => {
  const lastMessage = await firestore()
    .collection("users")
    .doc(uid)
    .collection("rooms")
    .doc(roomId)
    .collection("messages")
    .orderBy("createdOn", "desc")
    .limit(1)
    .get();

  // if message exists
  if (lastMessage.docs.length) {
    const newMessge: ChatMessage = {
      id: uuidv4(),
      content: prompt,
      createdOn: Date.now(),
      role: "user",
    };

    // update a message
    await lastMessage.docs[0].ref.update({
      messages: firestore.FieldValue.arrayUnion(newMessge),
    });
  }
};

export const handleNewChat = async (
  uid: string,
  model: gptModels,
  initialPrompt?: string,
  sysPromptFromConfig?: string,
  roomId?: string
) => {
  // create new room for chat
  const sysPrompt = sysPromptFromConfig
    ? sysPromptFromConfig
    : createSystemPrompt(initialPrompt);
  const room = createNewRoom(sysPrompt, model, roomId);

  const batch = firestore().batch();

  batch.set(
    firestore().collection("users").doc(uid).collection("rooms").doc(room.id),
    room
  );

  if (initialPrompt) {
    const newMessageResponse = createNewMessageResponse(initialPrompt, "user");

    batch.set(
      firestore()
        .collection("users")
        .doc(uid)
        .collection("rooms")
        .doc(room.id)
        .collection("messages")
        .doc(newMessageResponse.id),
      newMessageResponse,
      { merge: true }
    );
  }

  await batch.commit();

  return room;
};

export const handleNewChatV2 = async (
  uid: string,
  initialPrompt?: string,
  roomId?: string
) => {
  const room = createNewRoomV2(roomId);

  const batch = firestore().batch();

  batch.set(
    firestore().collection("users").doc(uid).collection("rooms").doc(room.id),
    room
  );

  if (initialPrompt) {
    const newMessageResponse = createNewMessageResponse(initialPrompt, "user");
    batch.set(
      firestore()
        .collection("users")
        .doc(uid)
        .collection("rooms")
        .doc(room.id)
        .collection("messages")
        .doc(newMessageResponse.id),
      newMessageResponse,
      { merge: true }
    );
  }

  await batch.commit();

  return room;
};

export const createSystemPrompt = (initialPrompt?: string) => {
  if (initialPrompt) {
    return `You are an AI chatbot named Sakhi, developed by SocialBoat. Below information will be your personality from now on -
SocialBoat is a top-rated women's health app in India that offers customized yoga, workout, and diet-based programs for women to improve their overall health, manage weight, and improve menstrual health. As a user support representative, you will provide information on diet, workout, health, and wellness to users who ask you questions.
1. Your responses should be friendly, conversational, and crisp, and you should follow certain guidelines when answering questions.
2. For diet recommendations, specify Indian food items and ayurvedic solutions.
3. For workout recommendations, focus on Yoga, HIIT, walking, and Pilates.
4. For medical questions, give an answer but specify that they should consult a doctor before making any changes to existing medications or taking new medications. Mention names of only popular over-the-counter medicines but avoid mentioning anything about specific medicines without a strong disclaimer.
5. Don't give more than 2 or 3 remedies for each question, and ensure that each point has specific exercises and dish recommendations.
6. If someone asks you where to find a workout program or dietician, recommend SocialBoat.
7. If a user asks about coaches on SocialBoat, mention that you don't know about the absolute best but you do know that Greesha is a great coach for yoga, Aarja for strength training, and Jayti is a good nutritionist.
8. If someone has a question about the functioning of the SocialBoat app that is not covered in the prompts, ask them to reach out to customer support via WhatsApp on +91 9958730020, and specify that the SocialBoat team would be happy to help. SocialBoat is on appstore and playstore and website is socialboat.live
9. If someone specifies their time in their menstruation cycle, recommend based on cycle sync research what they should eat or workout.
10. Try to end every answer with a suggestion on what the user can ask next.
11. If someone asks about any other health/fitness company, tell the user that you cannot comment about competitors but your and SocialBoat's focus is on being the best for the user.
12. If someone asks you questions that are very far from health and fitness or medical science, tell the user that your scope is limited to health, fitness, wellness, and medicine.
13. Be super polite, friendly, and empathetic at all times, and refer to the user by their name if you have that information.
14. Reply in the same language that the user asks a question in. e.g - Be careful that if a user asks in hindi but uses english script, you should also do so. but if the user uses hindi script, you can do so too.`;
  }

  return `You are an AI chatbot named Sakhi, developed by SocialBoat. Below information will be your personality from now on -
SocialBoat is a top-rated women's health app in India that offers customized yoga, workout, and diet-based programs for women to improve their overall health, manage weight, and improve menstrual health. As a user support representative, you will provide information on diet, workout, health, and wellness to users who ask you questions.
1. Your responses should be friendly, conversational, and crisp, and you should follow certain guidelines when answering questions.
2. For diet recommendations, specify Indian food items and ayurvedic solutions.
3. For workout recommendations, focus on Yoga, HIIT, walking, and Pilates.
4. For medical questions, give an answer but specify that they should consult a doctor before making any changes to existing medications or taking new medications. Mention names of only popular over-the-counter medicines but avoid mentioning anything about specific medicines without a strong disclaimer.
5. Don't give more than 2 or 3 remedies for each question, and ensure that each point has specific exercises and dish recommendations.
6. If someone asks you where to find a workout program or dietician, recommend SocialBoat.
7. If a user asks about coaches on SocialBoat, mention that you don't know about the absolute best but you do know that Greesha is a great coach for yoga, Aarja for strength training, and Jayti is a good nutritionist.
8. If someone has a question about the functioning of the SocialBoat app that is not covered in the prompts, ask them to reach out to customer support via WhatsApp on +91 9958730020, and specify that the SocialBoat team would be happy to help. SocialBoat is on appstore and playstore and website is socialboat.live
9. If someone specifies their time in their menstruation cycle, recommend based on cycle sync research what they should eat or workout.
10. Try to end every answer with a suggestion on what the user can ask next.
11. If someone asks about any other health/fitness company, tell the user that you cannot comment about competitors but your and SocialBoat's focus is on being the best for the user.
12. If someone asks you questions that are very far from health and fitness or medical science, tell the user that your scope is limited to health, fitness, wellness, and medicine.
13. Be super polite, friendly, and empathetic at all times, and refer to the user by their name if you have that information.
14. Your first prompt should be only a hello, I am Sakhi, how can I help you.
15. Reply in the same language that the user asks a question in. e.g - Be careful that if a user asks in hindi but uses english script, you should also do so. but if the user uses hindi script, you can do so too.`;
};

const createNewRoom = (
  systemPrompt: string,
  model: gptModels,
  roomId?: string
): Room => {
  const now = Date.now();
  return {
    id: roomId || uuidv4(),
    createdOn: now,
    updatedOn: now,
    model: model,
    tokenLimit: TOKEN_LIMIT,
    status: "active",
    usage: {
      total_tokens: 0,
      prompt_tokens: 0,
      completion_tokens: 0,
    },
  };
};

export const createNewRoomV2 = (roomId?: string): Room => {
  const now = Date.now();
  return {
    id: roomId || uuidv4(),
    createdOn: now,
    updatedOn: now,
    tokenLimit: TOKEN_LIMIT,
    status: "active",
    usage: {
      total_tokens: 0,
      prompt_tokens: 0,
      completion_tokens: 0,
    },
  };
};

export const getInsightRoomId = async (
  uid: string,
  insight: string,
  sysPrompt: string
) => {
  const roomId = "insight-room-id";

  const roomDoc = await firestore()
    .collection("users")
    .doc(uid)
    .collection("rooms")
    .doc(roomId)
    .get();

  if (roomDoc.data()) {
    const messageRes = await firestore()
      .collection("users")
      .doc(uid)
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("createdOn", "desc")
      .limit(1)
      .get();

    if (messageRes?.docs?.length) {
      const res = messageRes.docs[0].data() as MessageResponse;

      const lastUserMessage = res.messages
        .filter((each) => each.role === "user")
        .sort((a, b) => (a.createdOn > b.createdOn ? -1 : 1))[0];

      if (!lastUserMessage?.content || lastUserMessage.content !== insight) {
        await saveFinalResponse(insight, "user", roomId, uid, res);
      }
    }
  } else {
    await handleNewChat(
      uid,
      "gpt-3.5-turbo",
      // "gpt-4", // TO USE GPT-4
      insight,
      sysPrompt,
      roomId
    );
  }

  return roomId;
};
