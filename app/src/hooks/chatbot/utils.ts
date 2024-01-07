import {
  AdditionalGPTBodyObj,
  ChatMessage,
  GPTMessage,
  MessageResponse,
  gptModels,
  roleTypes,
  transcribeStatusType,
  GPTVisionMessage,
} from "@models/ChatBot/interface";
import { archiveResponse } from "@hooks/chatbot/insights/api";
import { ChatCompletion, Usage } from "@models/ChatBot/openAI";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { BACKEND_URL } from "react-native-dotenv";
import sse from "react-native-sse";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { contextLengthMessage, defaultErrorMessage } from "./useSakhi";
import crashlytics from "@react-native-firebase/crashlytics";
import { tool_choice } from "@models/config/config";
import { Tool, ToolCall } from "@models/config/Tools";
// import { useUserSteps } from "@hooks/steps/useUserSteps";
import { useUserStore } from "@providers/user/store/useUserStore";

export const createChatGPTMessages = (
  systemPrompt: string,
  chatMessages: ChatMessage[]
) => {
  const messages: GPTMessage[] = [];

  messages.push({
    role: "system",
    content: "You are Sakhi AI, A chatboat designed by SocialBoat",
  });
  messages.push({ role: "user", content: systemPrompt });

  for (let j: number = chatMessages.length - 1; j >= 0; j--) {
    messages.push({
      role: chatMessages[j].role,
      content: chatMessages[j].content,
    });
  }
  return messages;
};

export const createChatGPTMessagesV2 = (
  chatMessages: ChatMessage[],
  gptPromptMessages: (GPTMessage | GPTVisionMessage)[]
) => {
  const messages: (GPTMessage | GPTVisionMessage)[] =
    gptPromptMessages && gptPromptMessages.length > 0
      ? [...gptPromptMessages]
      : [];

  for (let j: number = chatMessages.length - 1; j >= 0; j--) {
    let {
      createdOn,
      id,
      audioFile,
      transcribeStatus,
      audioTag,
      buttonParams,
      ...rest
    } = chatMessages[j];
    messages.push(rest);
  }
  return messages;
};

export const removeFromContext = async (uid: string, roomId: string) => {
  const allDocs = await firestore()
    .collection("users")
    .doc(uid)
    .collection("rooms")
    .doc(roomId)
    .collection("messages")
    .get();

  const batch = firestore().batch();

  for (const doc of allDocs.docs) {
    batch.update(doc.ref, { inContext: false });
  }

  batch.update(
    firestore().collection("users").doc(uid).collection("rooms").doc(roomId),
    {
      lastMessage: "",
      updatedOn: Date.now(),
      [`usage.total_tokens`]: 0,
    }
  );

  await batch.commit();
};

export const fetchAllMessages = (
  responses: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
) => {
  const chatMessages: ChatMessage[] = [];
  let lastResponse: MessageResponse | undefined;

  if (responses?.docs) {
    for (const doc of responses.docs) {
      const remoteMessage = doc.data() as MessageResponse;
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

export const getEstimatedTokensFromResponse = (message: string) => {
  const chars = message.trim().length;
  return Math.round(chars / 4);
};

export const makeTitleResponse = async (uid: string, roomId: string) => {
  axios({
    url: `${BACKEND_URL}/generateTitleForRoom`,
    method: "POST",
    params: {
      uid,
      roomId,
    },
    data: {
      uid,
      roomId,
    },
  });
};

const getUpdatedMessageResponse = (
  newMessage: string,
  role: roleTypes,
  lastMessageResponse?: MessageResponse,
  audioTag?: boolean,
  transcribeStatus?: transcribeStatusType,
  audioFile?: string
): MessageResponse => {
  // if message exists
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
          ...(audioTag
            ? {
                audioTag: audioTag,
                audioFile: audioFile,
                transcribeStatus: transcribeStatus,
              }
            : {}),
        },
      ],
    };
  } else {
    return createNewMessageResponse(newMessage, role);
  }
};

const getUpdatedToolMessageResponse = (
  newMessage: ChatMessage[],
  responseMessage: ChatMessage,
  lastMessageResponse?: MessageResponse
): MessageResponse => {
  // if message exists
  if (lastMessageResponse && lastMessageResponse.messages.length > 0) {
    let chatMessages: ChatMessage[] = [];
    chatMessages.push(responseMessage);
    chatMessages = [...chatMessages, ...newMessage];
    return {
      ...lastMessageResponse,
      updatedOn: Date.now(),
      numMessages: lastMessageResponse?.numMessages
        ? lastMessageResponse?.numMessages + 1 + newMessage.length
        : 1,
      messages: [...lastMessageResponse.messages, ...chatMessages],
    };
  } else {
    return createNewMessageResponseV2(newMessage, responseMessage);
  }
};

export const createNewMessageResponse = (
  newMessage: string,
  role: roleTypes
): MessageResponse => {
  return {
    id: uuidv4(),
    createdOn: Date.now(),
    updatedOn: Date.now(),
    numMessages: 1,
    inContext: true,
    messages: [
      {
        role: role,
        content: newMessage,
        createdOn: Date.now(),
        id: uuidv4(),
      },
    ],
  };
};

export const createNewMessageResponseV2 = (
  messages: ChatMessage[],
  responseMessage: ChatMessage
) => {
  let chatMessages: ChatMessage[] = [];
  chatMessages.push(responseMessage);
  chatMessages = [...chatMessages, ...messages];
  return {
    id: uuidv4(),
    createdOn: Date.now(),
    updatedOn: Date.now(),
    numMessages: chatMessages.length,
    inContext: true,
    messages: [...chatMessages],
  };
};

export const saveFinalResponse = async (
  newMessage: string,
  role: roleTypes,
  roomId: string,
  uid: string,
  currentActiveMessage?: MessageResponse,
  audioTag?: boolean,
  transcribeStatus?: transcribeStatusType,
  audioFile?: string
) => {
  try {
    const batch = firestore().batch();

    const valueResponse = getEstimatedTokensFromResponse(newMessage);

    batch.update(
      firestore().collection("users").doc(uid).collection("rooms").doc(roomId),
      {
        restartConvPopup: true,
        lastMessage: newMessage,
        updatedOn: Date.now(),
        [`usage.total_tokens`]: firestore.FieldValue.increment(valueResponse),
      }
    );
    const updatedMessage = getUpdatedMessageResponse(
      newMessage,
      role,
      currentActiveMessage,
      audioTag,
      transcribeStatus,
      audioFile
    );
    batch.set(
      firestore()
        .collection("users")
        .doc(uid)
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .doc(updatedMessage.id),
      updatedMessage
    );

    await batch.commit();
    return true;
  } catch (error) {
    console.log("error", error);
    crashlytics().recordError(error as any);
    return false;
  }
};

export const saveToolResponse = async (
  newMessages: ChatMessage[],
  contextLength: number,
  roomId: string,
  uid: string,
  responseMessage: ChatMessage,
  currentActiveMessage?: MessageResponse
) => {
  const batch = firestore().batch();
  batch.update(
    firestore().collection("users").doc(uid).collection("rooms").doc(roomId),
    {
      restartConvPopup: true,
      // lastMessage: newMessage,
      updatedOn: Date.now(),
      [`usage.total_tokens`]: firestore.FieldValue.increment(contextLength),
    }
  );
  const updatedMessage = getUpdatedToolMessageResponse(
    newMessages,
    responseMessage,
    currentActiveMessage
  );

  batch.set(
    firestore()
      .collection("users")
      .doc(uid)
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .doc(updatedMessage.id),
    updatedMessage
  );

  await batch.commit();
};

export const updateLastUserMessage = async (
  chatMessages: ChatMessage[],
  uid: string,
  roomId: string,
  messageId: string,
  updatedMessage: ChatMessage
) => {
  const batch = firestore().batch();

  const valueResponse = getEstimatedTokensFromResponse(updatedMessage.content);
  const filteredChatMessages = chatMessages.map((item) =>
    item.id !== updatedMessage.id ? item : updatedMessage
  );
  // const updatedChatMessages = chatMessages.map((item) =>
  //   updatedMessage.id === item.id ? updatedMessage : item
  // );

  // console.log("updated message", updatedChatMessages);

  batch.update(
    firestore().collection("users").doc(uid).collection("rooms").doc(roomId),
    {
      restartConvPopup: true,
      lastMessage: updatedMessage.content,
      updatedOn: Date.now(),
      [`usage.total_tokens`]: firestore.FieldValue.increment(valueResponse),
    }
  );

  batch.update(
    firestore()
      .collection("users")
      .doc(uid)
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .doc(messageId),
    {
      messages: filteredChatMessages,
    }
  );

  await batch.commit();
};

export const makeSSECall = (
  messages: GPTMessage[],
  setAnswer: (newVal: string) => void,
  onFinish: (finalString: string, usage?: Usage) => Promise<void>,
  onError: (newMess: string) => void,
  temperature: number = 0.75,
  model: gptModels,
  OPENAI_API_KEY: string,
  additionalData?: AdditionalGPTBodyObj
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  };
  const data = {
    model: model,
    messages: messages,
    temperature: temperature,
    stream: true,
    ...additionalData,
  };

  let finalAnswer = "";
  const eventSource = new sse("https://api.openai.com/v1/chat/completions", {
    headers,
    method: "POST",
    body: JSON.stringify(data),
  });

  eventSource.addEventListener("message", (event) => {
    try {
      const data = JSON.parse((event as MessageEvent).data) as ChatCompletion;

      if (!data.choices[0].finish_reason) {
        const text = data.choices[0].delta.content;

        if (text) {
          finalAnswer += text;
          setAnswer(finalAnswer);
        }
      } else {
        onFinish(finalAnswer, data.usage);
        eventSource.removeAllEventListeners();
        eventSource.close();
      }
    } catch (error: any) {
      console.log("error in parse", error);
      crashlytics().recordError(error);
    }
  });

  eventSource.addEventListener("error", (error) => {
    console.error("Error:", error);

    const res = error as {
      message?: string;
      xhrStatus?: number;
      code?: "context_length_exceeded";
    };

    if (res.message) {
      if (res.code === "context_length_exceeded") {
        onError(contextLengthMessage);
      } else if (res.xhrStatus === 500) {
        onError(defaultErrorMessage);
      } else if (res.xhrStatus === 429) {
        onError(defaultErrorMessage);
      } else {
        onError(res.message);
      }
    } else {
      onError(defaultErrorMessage);
    }

    eventSource.removeAllEventListeners();
    eventSource.close();
  });

  return () => {
    eventSource.removeAllEventListeners();
    eventSource.close();
  };
};

export const makeSSECallV2 = (
  messages: (GPTMessage | GPTVisionMessage)[],
  onStreamMessage: (newVal: string) => void,
  onFinish: (finalString: string, usage?: Usage) => Promise<void>,
  onError: (newMess: string) => void,
  temperature: number = 0.75,
  model: gptModels,
  OPENAI_API_KEY: string,
  onToolResponse: (toolCallsReceived: ToolCall[], finalAnswer: string) => void,
  additionalData?: AdditionalGPTBodyObj,
  tools?: Tool[],
  tool_choice?: tool_choice
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  };
  const data = {
    model: model,
    messages: messages,
    temperature: temperature,
    stream: true,
    ...additionalData,
    ...(tools ? { tools: tools } : {}),
    ...(tool_choice ? { tool_choice: tool_choice } : {}),
  };

  let finalAnswer = "";
  let toolCallsReceived: ToolCall[] = [];

  const eventSource = new sse("https://api.openai.com/v1/chat/completions", {
    headers,
    method: "POST",
    body: JSON.stringify(data),
  });

  eventSource.addEventListener("message", (event) => {
    try {
      const data = JSON.parse((event as MessageEvent).data) as ChatCompletion;
      // console.log("data", data);
      if (!data.choices[0].finish_reason) {
        // console.log("delta", data.choices[0].delta);
        if (data.choices[0].delta.tool_calls) {
          let toolCalls = data.choices[0].delta.tool_calls;
          if (toolCalls && toolCalls.length > 0) {
            toolCalls.forEach((toolCall) => {
              if (toolCall.function.name && toolCall.id) {
                toolCallsReceived[toolCall.index] = {
                  function: {
                    name: toolCall.function.name,
                    arguments: "",
                  },
                  type: toolCall.type,
                  id: toolCall.id,
                  index: toolCall.index,
                };
              }
              if (toolCall.function.arguments) {
                toolCallsReceived[toolCall.index].function.arguments =
                  toolCallsReceived[toolCall.index].function.arguments +
                  toolCall.function.arguments;
              }
            });
          }
        }
        if (data.choices[0].delta.content) {
          const text = data.choices[0].delta.content;
          if (text) {
            finalAnswer += text;
            onStreamMessage(finalAnswer);
          }
        }
      } else if (data.choices[0].finish_reason === "tool_calls") {
        onToolResponse(toolCallsReceived, finalAnswer);
        eventSource.removeAllEventListeners();
        eventSource.close();
      } else {
        onFinish(finalAnswer, data.usage);
        eventSource.removeAllEventListeners();
        eventSource.close();
      }
    } catch (error: any) {
      console.log("error in parse", error);
      crashlytics().recordError(error);
      eventSource.removeAllEventListeners();
      eventSource.close();
    }
  });

  eventSource.addEventListener("error", (error) => {
    console.error("Error: defines", error);
    const uid = useUserStore.getState().user?.uid;

    archiveResponse(
      uid ? uid : "",
      "initialRouterPromptV2",
      model,
      OPENAI_API_KEY,
      messages[messages.length - 1],
      temperature,
      additionalData?.top_p,
      additionalData?.max_tokens,
      additionalData?.presence_penalty,
      additionalData?.frequency_penalty,
      undefined,
      JSON.stringify(error)
    );

    const res = error as {
      message?: string;
      xhrStatus?: number;
      code?: "context_length_exceeded";
    };

    if (res.message) {
      if (res.code === "context_length_exceeded") {
        onError(contextLengthMessage);
      } else if (res.xhrStatus === 500) {
        onError(defaultErrorMessage);
      } else if (res.xhrStatus === 429) {
        onError(defaultErrorMessage);
      } else {
        onError(res.message);
      }
    } else {
      onError(defaultErrorMessage);
    }

    eventSource.removeAllEventListeners();
    eventSource.close();
  });

  return () => {
    eventSource.removeAllEventListeners();
    eventSource.close();
  };
};

export const makePromptResponse = async (uid?: string, roomId?: string) => {
  if (uid && roomId)
    axios({
      url: `${BACKEND_URL}/generateRoomPrompts`,
      method: "POST",
      params: {
        uid,
        roomId,
      },
      data: {
        uid,
        roomId,
      },
    });
};

export const makeUserPromptResponse = async (uid: string) => {
  axios({
    url: `${BACKEND_URL}/generateUserPrompts`,
    method: "POST",
    params: {
      uid,
    },
    data: {
      uid,
    },
  }).catch((e) => console.log("error fetching prompts", e));
};
