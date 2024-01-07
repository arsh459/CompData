import firestore from "@react-native-firebase/firestore";
import { useEffect } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  createChatGPTMessagesV2,
  fetchAllMessages,
  makeSSECallV2,
  saveFinalResponse,
  updateLastUserMessage,
} from "../utils";
import { Alert, Platform } from "react-native";
import { RNS3 } from "react-native-upload-aws-s3";
import {
  ACCESS_KEY,
  BUCKET,
  OPENAI_API_KEY,
  S3_AWS_REGION,
  SECRET_KEY,
} from "react-native-dotenv";
import { checkIfFileExists, transcribeAudio } from "@modules/ChatBot/utils";
import { useChatVoiceStore } from "@providers/chat/store/useChatVoiceStore";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useGPTPrompt } from "@hooks/gptPrompts/useGptPrompt";
import { callSakhi } from "./utils/utils";
import { useSakhiAIStore } from "./store/useSakhiAIStore";
import { ChatMessage } from "@models/ChatBot/interface";

export type sakhiStateTypes =
  | "ERROR"
  | "FETCHING"
  | "ANALYZING"
  | "TYPING"
  | "READY"
  | "INIT";

export const useSakhiV2 = () => {
  const {
    roomId,
    sakhiState,
    setSakhiState,
    setLastMessage,
    setMessages,
    lastMessage,
    onError,
    errorMessage,
    messages,
    onStreamMessage,
    onNewMessageFromAssistant,
    onToolResponse,
  } = useSakhiAIStore(
    (state) => ({
      roomId: state.room?.id,
      sakhiState: state.sakhiState,
      setSakhiState: state.setSakhiState,
      setLastMessage: state.setLastMessage,
      setMessages: state.setMessages,
      onError: state.onError,
      onStreamMessage: state.onStreamMessage,
      lastMessage: state.lastMessage,
      errorMessage: state.errorMessage,
      messages: state.messages,
      onNewMessageFromAssistant: state.onNewMessageFromAssistant,
      onToolResponse: state.onToolResponse,
    }),
    shallow
  );

  const { setCurrentActiveMessageVoice, setRoomId } = useChatVoiceStore(
    (state) => ({
      setCurrentActiveMessageVoice: state.setCurrentActiveMessageVoice,
      setRoomId: state.setRoomId,
      recordAudioPath: state.recordAudioPath,
    }),
    shallow
  );
  const { config } = useConfigContext();
  const { gptPrompt, tools } = useGPTPrompt("initialRouterPromptV2");
  const { onboardingDone, uid } = useUserStore(
    (state) => ({
      onboardingDone: state.user?.flags?.chatScreenOnboard,
      uid: state.user?.uid,
    }),
    shallow
  );

  useEffect(() => {
    if (uid && config?.apiKey && gptPrompt) {
      const listener = firestore()
        .collection("users")
        .doc(uid)
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .where("inContext", "==", true)
        .orderBy("createdOn", "desc")
        .onSnapshot(async (allDocs) => {
          const { lastResponse, chatMessages } = fetchAllMessages(allDocs);
          setLastMessage(lastResponse);
          setMessages(chatMessages);
          setCurrentActiveMessageVoice(lastResponse);
          if (callSakhi(chatMessages, setSakhiState, onboardingDone)) {
            if (
              chatMessages[0]?.audioTag &&
              chatMessages[0]?.transcribeStatus !== "Success"
            ) {
              if (chatMessages[0].transcribeStatus === "Uploading") {
                if (chatMessages[0].audioFile) {
                  const transcribeAndSendText = async () => {
                    let previousMessageInConv = "";
                    if (chatMessages.length > 1) {
                      previousMessageInConv = chatMessages[1].content;
                    }

                    if (chatMessages[0].audioFile) {
                      try {
                        const fileStatus = await checkIfFileExists(
                          chatMessages[0].audioFile
                        );

                        // file doesn't exist
                        if (!fileStatus) {
                          throw new Error("File doesn't exist. Try again");
                        }

                        const options = {
                          keyPrefix: `webapp/${uid}/`,
                          bucket: BUCKET,
                          region: S3_AWS_REGION,
                          accessKey: ACCESS_KEY,
                          secretKey: SECRET_KEY,
                          successActionStatus: 201,
                        };

                        const [transcibeText, uploadResponse] =
                          await Promise.all([
                            transcribeAudio(
                              chatMessages[0].audioFile,
                              OPENAI_API_KEY,
                              previousMessageInConv
                            ),
                            RNS3.put(
                              {
                                uri: chatMessages[0].audioFile,
                                name: `${uuidv4()}_Sakhi.${
                                  Platform.OS === "ios" ? "m4a" : "mp4"
                                }`,
                                type:
                                  Platform.OS === "ios"
                                    ? "audio/m4a"
                                    : "audio/mp4",
                              },
                              options
                            ),
                          ]);

                        const uploadUrl =
                          uploadResponse.body.postResponse.location;
                        const updatedMessage: ChatMessage = {
                          ...chatMessages[0],
                          audioFile: uploadUrl,
                          transcribeStatus: "Success",
                          content: transcibeText,
                        };
                        if (uid && lastResponse?.id) {
                          await updateLastUserMessage(
                            lastResponse.messages,
                            uid,
                            roomId ? roomId : "",
                            lastResponse?.id,
                            updatedMessage
                          );

                          return;
                        }
                      } catch (e: any) {
                        Alert.alert(
                          "Transcription Failed. Please try again",
                          e
                        );
                        const updatedMessage: ChatMessage = {
                          ...chatMessages[0],
                          transcribeStatus: "Failed",
                        };
                        if (uid && lastResponse?.id) {
                          await updateLastUserMessage(
                            lastResponse.messages,
                            uid,
                            roomId ? roomId : "",
                            lastResponse?.id,
                            updatedMessage
                          );
                          return;
                        }
                      }
                    }
                  };
                  transcribeAndSendText();
                } else {
                  setSakhiState("ERROR");
                  return;
                }
              } else if (chatMessages[0].transcribeStatus === "Failed") {
                setSakhiState("READY");
                return;
              }
              return;
            } else {
              const messagesForGPT = createChatGPTMessagesV2(
                chatMessages,
                gptPrompt.prompt
              );
              makeSSECallV2(
                messagesForGPT,
                onStreamMessage,
                onNewMessageFromAssistant,
                onError,
                gptPrompt.temperature,
                gptPrompt.model,
                config.apiKey,
                onToolResponse,
                {
                  frequency_penalty: gptPrompt.frequency_penalty,
                  presence_penalty: gptPrompt.presence_penalty,
                  max_tokens: gptPrompt.max_tokens,
                  top_p: gptPrompt.top_p,
                  temperature: gptPrompt.temperature,
                },
                tools,
                gptPrompt.tool_choice
              );
            }
          } else {
            setSakhiState("READY");
          }
        });

      setRoomId(roomId ? roomId : "");

      return () => {
        listener();
      };
    }
  }, [uid, roomId, onboardingDone, config?.apiKey, gptPrompt]);

  const handleNewUserMessage = async (newMessage: string) => {
    if (uid && roomId) {
      await saveFinalResponse(newMessage, "user", roomId, uid, lastMessage);
    }
  };

  return {
    allChatMessages: messages,
    errorMessage,
    handleNewUserMessage,
    sakhiState,
  };
};
