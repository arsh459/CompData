// import { useAntMedia } from "@antmedia/react-native-ant-media";
import { Ice_Server } from "@hooks/stun/useStun";
import { aiToggleStatus } from "@modules/Workout/ProgramDetails/TaskSubmitV3";
import { useState } from "react";
import { streamingStateTypes } from "./useRTCCam";

export const useLocalAntMedia = (
  servers: Ice_Server[],
  aiToggle?: aiToggleStatus
) => {
  const [streamingState, setStreamingState] =
    useState<streamingStateTypes>("init");

  const [localMedia, setLocalMedia] = useState<string>("");

  // const adaptor = useAntMedia({
  //   url: "ws://emre.socialboat.live:5080/WebRTCApp/websocket",
  //   mediaConstraints: {
  //     audio: false,
  //     video: {
  //       width: 480,
  //       height: 640,
  //       frameRate: 30,
  //       facingMode: "front",
  //     },
  //   },
  //   callback(command: any, data: any) {
  //     switch (command) {
  //       case "pong":
  //         break;
  //       case "publish_started":
  //         setStreamingState("play");
  //         break;
  //       case "publish_finished":
  //         setStreamingState("pause");
  //         // InCallManager.stop();
  //         break;
  //       default:
  //         break;
  //     }
  //   },
  //   callbackError: (err: any, data: any) => {
  //     console.error("callbackError", err, data);
  //   },
  //   peer_connection_config: {
  //     iceServers: servers,
  //   },
  //   debug: false,
  // });

  // useEffect(() => {
  //   const verify = () => {
  //     if (adaptor.localStream.current && adaptor.localStream.current.toURL()) {
  //       return setLocalMedia(adaptor.localStream.current.toURL());
  //     }
  //     setTimeout(verify, 2500);
  //   };
  //   verify();
  // }, [adaptor.localStream]);

  // useEffect(() => {
  //   if (localMedia) {
  //     InCallManager.start({ media: "video" });
  //   }
  // }, [localMedia]);

  return {
    streamingState,
    // adaptor,
    setStreamingState,
    localMedia,
    setLocalMedia,
  };
};
