import firestore from "@react-native-firebase/firestore"; // FirebaseFirestoreTypes,
import { useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "@providers/auth/AuthProvider";
import {
  createChatGPTMessages,
  fetchAllMessages,
  makePromptResponse,
  makeSSECall,
  makeTitleResponse,
  saveFinalResponse,
  updateLastUserMessage,
} from "./utils";
import { ChatMessage, MessageResponse } from "@models/ChatBot/interface";
import { createSystemPrompt } from "@modules/ChatBot/StartNewChatMain/utils";
import { useUserContext } from "@providers/user/UserProvider";
import crashlytics from "@react-native-firebase/crashlytics";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import { useChatVoiceStore } from "@providers/chat/store/useChatVoiceStore";
import { checkIfFileExists, transcribeAudio } from "@modules/ChatBot/utils";
import {
  ACCESS_KEY,
  BUCKET,
  OPENAI_API_KEY,
  S3_AWS_REGION,
  SECRET_KEY,
} from "react-native-dotenv";
import { shallow } from "zustand/shallow";
import { Alert, Platform } from "react-native";
import { RNS3 } from "react-native-upload-aws-s3";

// import { FlashList } from "@shopify/flash-list";
// import { LayoutAnimation, Platform } from "react-native";

export type sakhiStateTypes =
  | "ERROR"
  | "FETCHING"
  | "TYPING"
  | "READY"
  | "INIT";

export const contextLengthMessage =
  "Maxiumum context length reached. Clear chat to start again";
export const defaultErrorMessage =
  "Sakhi seems to be busy. We are experiencing heavy load. Please try in a few minutes";

export const useSakhi = (
  roomId: string,
  roomTitle?: string,
  sysyemPrompt?: string
) => {
  const [sakhiState, setSakhiState] = useState<sakhiStateTypes>("INIT");
  const [allChatMessages, setAllChatMessages] = useState<ChatMessage[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>(defaultErrorMessage);
  const { state } = useAuthContext();
  const [currentActiveMessage, setCurrentActiveMessage] =
    useState<MessageResponse>();

  // const list = useRef<FlashList<ChatMessage> | null>(null);
  const { config } = useConfigContext();
  const { setCurrentActiveMessageVoice, setRoomId } = useChatVoiceStore(
    (state) => ({
      setCurrentActiveMessageVoice: state.setCurrentActiveMessageVoice,
      setRoomId: state.setRoomId,
      // recordAudioPath: state.recordAudioPath,
    }),
    shallow
  );

  const { user } = useUserContext();
  const onboardingDone = user?.flags?.chatScreenOnboard;

  useEffect(() => {
    // use for userId
    if (state.uid && config?.apiKey) {
      const listener = firestore()
        .collection("users")
        .doc(state.uid)
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .where("inContext", "==", true)
        .orderBy("createdOn", "desc")
        .onSnapshot((allDocs) => {
          const { lastResponse, chatMessages } = fetchAllMessages(allDocs);

          // update latest message
          setCurrentActiveMessage(lastResponse);
          setAllChatMessages(chatMessages);
          setCurrentActiveMessageVoice(lastResponse);

          // if last message not by gpt
          if (
            (!chatMessages.length || chatMessages[0].role === "user") &&
            onboardingDone
          ) {
            // if (lastResponse)

            // audio tag and transcript does not exist - transcribe & upload
            // update transcript and URL in one go

            // setSakhiState("FETCHING");
            // if (false) {

            if (
              chatMessages[0]?.audioTag &&
              chatMessages[0]?.transcribeStatus !== "Success"
            ) {
              // console.log("from inside of transcribe when not success");
              // Alert.alert("Transcibe local file", chatMessages[0].audioFile);
              // use promis.all adn when both are done trigger the gpt and update the lasted chat message with

              // console.log("hi 2", chatMessages[0].transcribeStatus);

              // console.log("HI I am here", chatMessages);
              if (chatMessages[0].transcribeStatus === "Uploading") {
                if (chatMessages[0].audioFile) {
                  const transcribeAndSendText = async () => {
                    // console.log(
                    //   "transcribeAndSendText",
                    //   chatMessages.length,
                    //   chatMessages.length > 0
                    //     ? chatMessages[0].audioFile
                    //     : "no message"
                    // );

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
                          keyPrefix: `webapp/${state.uid}/`,
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
                        if (state.uid && lastResponse?.id) {
                          await updateLastUserMessage(
                            lastResponse.messages,
                            state.uid,
                            roomId,
                            lastResponse?.id,
                            updatedMessage
                          );

                          return;
                        }

                        // now just update the mew message for that create a function
                        // const resultText = await transcribeAudio(
                        //   chatMessages[0].audioFile,
                        //   OPENAI_API_KEY
                        // );
                      } catch (e: any) {
                        // update the latest chat message with failed message status
                        Alert.alert(
                          "Transcription Failed. Please try again",
                          e
                        );
                        const updatedMessage: ChatMessage = {
                          ...chatMessages[0],
                          transcribeStatus: "Failed",
                        };
                        if (state.uid && lastResponse?.id) {
                          await updateLastUserMessage(
                            lastResponse.messages,
                            state.uid,
                            roomId,
                            lastResponse?.id,
                            updatedMessage
                          );
                          return;
                        }
                      }

                      // if (state.uid) {
                      //   await saveFinalResponse(
                      //     resultText,
                      //     "user",
                      //     roomId,
                      //     state.uid,
                      //     currentActiveMessage
                      //   );
                      //   Alert.alert("Sent transcibe text");
                      // }
                    }
                  };
                  transcribeAndSendText();
                } else {
                  setSakhiState("ERROR");
                  return;
                }

                // here will upload and transcribe then trigger the gpt
              } else if (chatMessages[0].transcribeStatus === "Failed") {
                setSakhiState("READY");
                return;
              }
              return;
            }

            // console.log("chat message after uploading", chatMessages);

            // setSakhiState("TYPING");
            const messagesForGPT = createChatGPTMessages(
              sysyemPrompt ? sysyemPrompt : createSystemPrompt(),
              chatMessages
            );

            const onSuccess = async (finalText: string) => {
              saveFinalResponse(
                finalText,
                "assistant",
                roomId,
                state.uid ? state.uid : "",
                lastResponse
              ).then(() => {
                setSakhiState("READY");

                // only fo this if chat messages are more than one
                if (chatMessages.length >= 1) {
                  makePromptResponse(state.uid, roomId).catch((e) => {
                    console.log(e);
                    crashlytics().recordError(e);
                  });

                  if (!roomTitle && state.uid && roomId) {
                    makeTitleResponse(state.uid, roomId).catch((e) => {
                      // console.log("title fail", e);
                      crashlytics().recordError(e);
                    });
                  }
                }
              });
            };

            const onError = (message: string) => {
              setErrorMessage(message);
              setSakhiState("ERROR");
            };

            const onSetAnswer = (newMessageRemote: string) => {
              setAllChatMessages((prev) => {
                const lastMessage = prev[0];
                setSakhiState("TYPING");

                // return prev;

                if (!lastMessage) {
                  return [
                    {
                      id: uuidv4(),
                      createdOn: Date.now(),
                      content: newMessageRemote,
                      role: "assistant",
                    },
                  ];
                } else if (lastMessage.role !== "assistant") {
                  return [
                    {
                      id: uuidv4(),
                      createdOn: Date.now(),
                      content: newMessageRemote,
                      role: "assistant",
                    },
                    ...prev,
                  ];
                } else {
                  return [
                    {
                      ...prev[0],
                      content: newMessageRemote,
                    },
                    ...prev.slice(1, prev.length),
                  ];
                }
              });

              // if (Platform.OS === "android") {
              //   // This must be called before `LayoutAnimation.configureNext` in order for the animation to run properly.
              //   list.current?.prepareForLayoutAnimationRender();
              //   // After removing the item, we can start the animation.
              //   LayoutAnimation.configureNext(
              //     LayoutAnimation.Presets.easeInEaseOut
              //   );
              // }
            };

            setSakhiState("FETCHING");

            // make sse call and save
            makeSSECall(
              messagesForGPT,
              onSetAnswer,
              onSuccess,
              onError,
              0.75,
              "gpt-3.5-turbo",
              config?.apiKey
              // "gpt-4", // TO USE GPT-4
            );
          } else {
            setSakhiState("READY");
          }
        });

      setRoomId(roomId);

      return () => {
        listener();
      };
    }
  }, [state.uid, roomId, sysyemPrompt, onboardingDone, config?.apiKey]);

  const handleNewUserMessage = async (newMessage: string) => {
    if (state.uid) {
      // save new message
      await saveFinalResponse(
        newMessage,
        "user",
        roomId,
        state.uid,
        currentActiveMessage
      );
    }
  };

  // const makeGPTCall = async () => {
  //   if (content !== "") {
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${OPENAI_API_KEY}`,
  //     };
  //     const data = {
  //       model: "gpt-3.5-turbo",
  //       messages: [{ role: "user", content }],
  //       temperature: 1,
  //       stream: true,
  //     };

  //     let finalAnswer = "";
  //     const eventSource = new sse(
  //       "https://api.openai.com/v1/chat/completions",
  //       { headers, method: "POST", body: JSON.stringify(data) }
  //     );

  //     eventSource.addEventListener("message", (event) => {
  //       try {
  //         const data = JSON.parse(
  //           (event as MessageEvent).data
  //         ) as ChatCompletion;

  //         if (!data.choices[0].finish_reason) {
  //           const text = data.choices[0].delta.content;

  //           if (text) {
  //             finalAnswer += text;
  //             setAnswer(finalAnswer);
  //           }
  //         } else {
  //           eventSource.removeAllEventListeners();
  //           eventSource.close();
  //         }
  //       } catch (error: any) {
  //         console.log("error in parse", error);
  //       }
  //     });

  //     eventSource.addEventListener("error", (error) => {
  //       console.error("Error:", error);
  //       eventSource.removeAllEventListeners();
  //       eventSource.close();
  //     });

  //     return () => {
  //       eventSource.removeAllEventListeners();
  //       eventSource.close();
  //     };
  //   }
  // };

  return { allChatMessages, errorMessage, handleNewUserMessage, sakhiState };
};

/**
 * createRoom
 *
 * fetch all messages
 * if last message by
 *
 *
 */
