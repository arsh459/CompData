// import SocialBoat from "@components/SocialBoat";
// import Header from "@modules/Header";
// import TaskSubmit from "@modules/Workout/ProgramDetails/TaskSubmit";
// import TaskSubmit from "@modules/Workout/ProgramDetails/TaskSubmit";
// import { useLandscape } from "@hooks/orientation/useLandscape";
// import { useLandscape } from "@hooks/orientation/useLandscape";

// import LiveStreamV3 from "@modules/Workout/ProgramDetails/TaskSubmit/LiveStreamV3";
// import TaskSubmitV2 from "@modules/Workout/ProgramDetails/TaskSubmitV2";
// import { BadgeProgressProvider } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
// import { GameProvider } from "@providers/game/GameProvider";
// import { TaskProvider } from "@providers/task/TaskProvider";
// import { TeamProvider } from "@providers/team/TeamProvider";
// import { UserProvider } from "@providers/user/UserProvider";
// import { useRoute } from "@react-navigation/native";
// import { useAntMedia, rtc_view } from "@antmedia/react-native-ant-media";
// import {  useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  // TouchableOpacity,
  View,
} from "react-native";
// import { useRef } from "react";
// import { Text, View } from "react-native";
// import { useState } from "react";
// import { Platform } from "react-native";
// import { useState } from "react";
// import { useState } from "react";
// import { View } from "react-native";

export interface UploadTaskParams {
  gameId: string;
  // teamId: string;
  taskId: string;
  attemptedDate: string;
  // selectedDayNumber: number;
  // badgeId: string;
  castId?: string;
}

const UploadTask = () => {
  // const route = useRoute();
  // const params = route.params as UploadTaskParams;
  // const defaultStreamName = "stream2";

  // const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // const streamNameRef = useRef<string>(defaultStreamName);
  // const [localMedia, setLocalMedia] = useState("");

  // const adaptor = useAntMedia({
  //   url: "ws://emre.socialboat.live:5080/WebRTCApp/websocket",
  //   mediaConstraints: {
  //     audio: false,
  //     video: {
  //       width: 640,
  //       height: 480,
  //       frameRate: 30,
  //       facingMode: "front",
  //     },
  //   },
  //   callback(command: any, data: any) {
  //     switch (command) {
  //       case "pong":
  //         break;
  //       case "publish_started":
  //         setIsPlaying(true);
  //         break;
  //       case "publish_finished":
  //         setIsPlaying(false);
  //         break;
  //       default:
  //         break;
  //     }
  //   },
  //   callbackError: (err: any, data: any) => {
  //     console.error("callbackError", err, data);
  //   },
  //   peer_connection_config: {
  //     iceServers: [
  //       {
  //         url: "stun:stun.l.google.com:19302",
  //       },
  //     ],
  //   },
  //   debug: false,
  // });

  // useEffect(() => {
  //   const verify = () => {

  //     if (adaptor.localStream.current && adaptor.localStream.current.toURL()) {

  //         adaptor.localStream.current.toURL()
  //       );

  //       return setLocalMedia(adaptor.localStream.current.toURL());
  //     }
  //     setTimeout(verify, 5000);
  //   };
  //   verify();
  // }, [adaptor.localStream]);

  // useEffect(() => {
  //   if (localMedia) {
  //     InCallManager.start({ media: "video" });
  //   }
  // }, [localMedia]);

  // const handlePublish = useCallback(() => {
  //   if (!adaptor) {
  //     return;
  //   }

  //   adaptor.publish(streamNameRef.current);
  // }, [adaptor]);

  // const handleStop = useCallback(() => {
  //   if (!adaptor) {
  //     return;
  //   }

  //   adaptor.stop(streamNameRef.current);
  // }, [adaptor]);

  // const cameraRef = useRef<LiveStreamMethods | null>(null);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.heading}>Ant Media WebRTC Publish</Text>
        {/* {localMedia ? <>{rtc_view(localMedia, styles.streamPlayer)}</> : <></>} */}
        {/* {!isPlaying ? (
          <>
            <TouchableOpacity onPress={handlePublish} style={styles.button}>
              <Text>Start Publishing</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={handleStop} style={styles.button}>
              <Text>Stop Publishing</Text>
            </TouchableOpacity>
          </>
        )} */}
      </View>
    </SafeAreaView>
  );

  // return (
  //   <GameProvider selectedGameId={params.gameId}>
  //     <UserProvider>
  //       <TeamProvider selectedTeamId={params.teamId}>
  //         <BadgeProgressProvider badgeId={params.badgeId}>
  //           <TaskProvider
  //             selectedDayNumber={params.selectedDayNumber}
  //             selectedTaskId={params.taskId}
  //           >
  //             <TaskSubmitV2 castId={params.castId} />
  //           </TaskProvider>
  //         </BadgeProgressProvider>
  //       </TeamProvider>
  //     </UserProvider>
  //   </GameProvider>
  // );
};

export default UploadTask;

/**
 * create post, activity and stream on init
 * start and pause stream.
 *
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    alignSelf: "center",
    width: "80%",
    height: "80%",
  },
  streamPlayer: {
    width: "100%",
    height: "80%",
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 10,
  },
  heading: {
    alignSelf: "center",
  },
});

/**
 * create streamObj streamId -> {uid: string; postId: string; activityId: string; taskId: string; id: string}
 *
 * vodReady -> addStreamAWSMedia to post;
 *
 *
 */
