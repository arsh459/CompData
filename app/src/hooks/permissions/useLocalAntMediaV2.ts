// import { useAntMedia } from "@antmedia/react-native-ant-media";
// import { Ice_Server } from "@hooks/stun/useStun";
import { useEffect, useState } from "react";
import { streamingStateTypes } from "./useRTCCam";

// const wsLink = "ws://emre.socialboat.live:5080/WebRTCApp/websocket";

export const useLocalAntMedia = (servers: RTCIceServer[]) => {
  const [streamingState, setStreamingState] =
    useState<streamingStateTypes>("init");

  const [localMedia, setLocalMedia] = useState<string>("");

  useEffect(() => {
    const initialise = async () => {
      const peerConnection = new RTCPeerConnection({
        iceServers: servers,
      });

      peerConnection.addEventListener("connectionstatechange", (event) => {});
      peerConnection.addEventListener("icecandidate", (event) => {});
      peerConnection.addEventListener("icecandidateerror", (event) => {});
      peerConnection.addEventListener(
        "iceconnectionstatechange",
        (event) => {}
      );
      peerConnection.addEventListener("icegatheringstatechange", (event) => {});
      peerConnection.addEventListener("negotiationneeded", (event) => {});
      peerConnection.addEventListener("signalingstatechange", (event) => {});
      peerConnection.addEventListener("addstream", (event) => {});
      peerConnection.addEventListener("removestream", (event) => {});
    };

    initialise();
  }, []);

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
