import {
  ChatMessage,
  MessageResponse,
  Room,
  realtimeDBRoom,
} from "@models/ChatBot/interface";
import { create } from "zustand";
import { sakhiStateTypes } from "../useSakhiV2";
import { ToolCall, ToolResponseCall } from "@models/config/Tools";
import { sbFunctions } from "@utils/GptToolsFunction/fetchFunctionCalls";
import { questionResponse } from "@models/User/questionResponseInterface ";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { getUpdatedMessages } from "../utils/utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import {
  getEstimatedTokensFromResponse,
  makePromptResponse,
  makeTitleResponse,
  saveFinalResponse,
  saveToolResponse,
} from "@hooks/chatbot/utils";
import crashlytics from "@react-native-firebase/crashlytics";
import { fetchFunctionCalls } from "@utils/GptToolsFunction";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { getUpdatedMessageForButton } from "./storeUtils";

export type questionVisibilityState = "none" | "visible";
export const contextLengthMessage =
  "Maxiumum context length reached. Clear chat to start again";
export const defaultErrorMessage =
  "Sakhi seems to be busy. We are experiencing heavy load. Please try in a few minutes";

export interface SakhiAiInterface {
  questionVisibility: questionVisibilityState;
  questionToAsk?: questionResponse;
  setQuestionToAsk: (newQuestion: questionResponse) => void;

  realtimeRoom?: realtimeDBRoom;
  setRealtimeRoom: (newRoom: realtimeDBRoom) => void;

  room?: Room;
  setRoom: (newRoom: Room) => void;

  // current message
  lastMessage?: MessageResponse;
  setLastMessage: (newMessage?: MessageResponse) => void;

  // all messages
  messages: ChatMessage[];
  setMessages: (newMessages: ChatMessage[]) => void;

  // errorMessage
  errorMessage?: string;
  setErrorMessage: (newError?: string) => void;

  // actions
  onNewMessageFromAssistant: (response: string) => Promise<void>;
  onStreamMessage: (response: string) => void;
  onError: (message: string) => void;
  onToolResponse: (toolResponse: ToolCall[], finalAnswer: string) => void;

  // loadingType
  sakhiState: sakhiStateTypes;
  setSakhiState: (newSakhiState: sakhiStateTypes) => void;

  // initializing room
  onInit: (newRoom?: Room) => void;
  resetStore: () => void;
}

export const useSakhiAIStore = create<SakhiAiInterface>((set, get) => {
  return {
    questionVisibility: "none",
    messages: [],
    sakhiState: "INIT",
    resetStore: () => {
      set((state) => ({
        ...state,
        sakhiState: "INIT",
        room: undefined,
        errorMessage: undefined,
        messages: [],
        lastMessage: undefined,
      }));
    },

    setQuestionToAsk: (newQ: questionResponse) => {},
    onInit: (newRoom?: Room) => {
      if (newRoom) {
        set((state) => ({
          ...state,
          room: newRoom,
        }));
      }
    },

    setRoom: (newRoom: Room) => {
      set((state) => ({
        ...state,
        room: newRoom,
      }));
    },

    setRealtimeRoom: (newRoom: realtimeDBRoom) => {
      set((state) => ({
        ...state,
        realtimeRoom: newRoom,
      }));
    },

    setLastMessage: (newMessages?: MessageResponse) => {
      set((state) => ({
        ...state,
        lastMessage: newMessages,
      }));
    },

    setMessages: (newMessages: ChatMessage[]) => {
      set((state) => ({ ...state, messages: newMessages }));
    },

    onNewMessageFromAssistant: async (newMessage: string) => {
      const { room, lastMessage, messages } = get();
      const uid = useUserStore.getState().user?.uid;

      if (room?.id) {
        const isSaved = await saveFinalResponse(
          newMessage,
          "assistant",
          room?.id,
          uid ? uid : "",
          lastMessage
        );
        if (isSaved) {
          set((state) => ({
            ...state,
            sakhiState: "READY",
          }));
          // only fo this if chat messages are more than one
          if (messages.length >= 1) {
            makePromptResponse(uid, room.id).catch((e) => {
              console.log("error in creating prompts", e);
              crashlytics().recordError(e);
            });
            if (!room.title && uid) {
              makeTitleResponse(uid, room.id).catch((e) => {
                console.log("title fail", e);
                crashlytics().recordError(e);
              });
            }
          }
        }
      }
    },

    onStreamMessage: (message: string) => {
      set((state) => {
        const prevMessages = state.messages;
        let updatedMessages = getUpdatedMessages(prevMessages, message);
        return { ...state, sakhiState: "TYPING", messages: updatedMessages };
      });
    },

    onError: (message: string) => {
      set((state) => ({
        ...state,
        errorMessage: message,
        sakhiState: "ERROR",
      }));
    },

    onToolResponse: async (toolsToCall: ToolCall[], finalAnswer: string) => {
      set((state) => ({ ...state, sakhiState: "ANALYZING" }));
      const uid = useUserStore.getState().user?.uid;
      const { room, lastMessage } = get();
      let messages: ChatMessage[] = [];
      let contextLength: number = 0;
      let tool_calls: ToolResponseCall[] = [];
      try {
        tool_calls = toolsToCall.map((functionCall) => {
          const { index, ...rest } = functionCall;
          return rest;
        });

        let responseMessage: ChatMessage = {
          id: uuidv4(),
          createdOn: Date.now(),
          role: "assistant",
          content: finalAnswer,
          tool_calls,
        };

        contextLength += getEstimatedTokensFromResponse(finalAnswer);

        let response: any[] = [];

        for (const [_, functionCall] of toolsToCall.entries()) {
          try {
            let data = await fetchFunctionCalls(
              functionCall.function.name as sbFunctions,
              JSON.parse(functionCall.function.arguments)
            );
            response.push(data);
            weEventTrack("functionCallDone", {
              callId: functionCall.id,
              callName: functionCall.function.name,
            });
          } catch (e) {
            console.log("error", e);
            response.push("server error");
            crashlytics().recordError(e as any);
            weEventTrack("functionCallFailed", {
              callId: functionCall.id,
              callName: functionCall.function.name,
            });
          }
        }

        if (response) {
          toolsToCall.forEach((functionCall, index) => {
            let stringifedContentObject = JSON.stringify({
              arguments: JSON.parse(functionCall.function.arguments),
              result: response[index],
            });
            let updatedMessage: ChatMessage = getUpdatedMessageForButton(
              {
                role: "tool",
                tool_call_id: functionCall.id,
                name: functionCall.function.name as sbFunctions,
                content: stringifedContentObject,
                id: uuidv4(),
                createdOn: Date.now(),
              },
              functionCall,
              response[index]
            );
            contextLength += getEstimatedTokensFromResponse(
              stringifedContentObject
            );
            messages.push(updatedMessage);
          });

          if (response && room?.id && uid) {
            await saveToolResponse(
              messages,
              contextLength,
              room?.id,
              uid,
              responseMessage,
              lastMessage
            );
          }
        }
        set((state) => ({
          ...state,
          sakhiState: "FETCHING",
        }));
      } catch (e) {
        console.log("error", e);
        crashlytics().recordError(e as any);
        set((state) => ({
          ...state,
          errorMessage: "Tool call failed",
          sakhiState: "ERROR",
        }));
      }
    },

    setSakhiState: (newSakhiState: sakhiStateTypes) => {
      set((state) => ({ ...state, sakhiState: newSakhiState }));
    },

    setErrorMessage: (newError?: string) => {
      set((state) => ({
        ...state,
        errorMessage: newError,
      }));
    },
  };
});
