import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { BackHandler, View } from "react-native";
import { useKeepAwake } from "@sayem314/react-native-keep-awake";
import WarningModal from "../TaskSubmit/WarningModal";
import Header from "@modules/Header";
import SocialBoat from "@components/SocialBoat";
import { useGivenOrientation } from "@hooks/orientation/useGivenOrientation";
import BottomBarV3 from "../TaskSubmit/BottomBarV3";
import { updateQuit } from "@utils/cast/utils";
// import TaskStreamV3 from "../TaskSubmit/TaskStreamV3";
import { useRTCCam } from "@hooks/permissions/useRTCCam";
import { Ice_Server } from "@hooks/stun/useStun";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { usePlainTaskContext } from "@providers/task/PlainTaskProvider";
import crashlytics from "@react-native-firebase/crashlytics";

export type uploadStatusTypes = "UPLOADING" | "SUCCESS" | "FAILED";

export interface uploadProgressObject {
  status: uploadStatusTypes;
  progress: number;
}

interface Props {
  castId?: string;
  attemptedDate: string;
  servers: Ice_Server[];
}

const GrantedFlowV3: React.FC<Props> = ({ castId, servers, attemptedDate }) => {
  const [showWarning, setWarning] = useState<boolean>(false);
  const navigation = useNavigation();
  // const [postInteraction, setPostInteraction] = useState<boolean>(false);
  // const [cameraReady, setCameraReady] = useState<boolean>(false);

  const {
    onStartStreaming,
    onStopStreaming,
    streamingState,
    cast,
    localMedia,
    // adaptor,
    // initPost,
  } = useRTCCam(setWarning, servers, attemptedDate, castId);

  const { task } = usePlainTaskContext();

  //   const { state } = useAuthContext();
  //   const { user } = useUserContext();

  // update orientation
  const { finalOrientation } = useGivenOrientation(task?.orientation, castId);

  const onBackRequest = () => {
    // setLocalMedia("");

    setWarning(true);
    onStopStreaming();
  };

  const onResume = () => {
    setWarning(false);
    onStartStreaming();
    weEventTrack("workout_clickResume", {
      taskId: task ? task.id : "no_taskId",
      taskName: task?.name ? task.name : "no_taskName",
      fps: task?.fitPoints ? task.fitPoints : -1,
      duration: task?.durationMinutes ? task.durationMinutes : -1,
      isPro: !task?.freeTask ? 1 : 0,
    });
  };

  const onTap = async () => {
    // if (streamingState !== "init") {
    //   setWarning(true);
    //   onStopStreaming();
    // }
    // {
    //   onStartStreaming();
    // }

    if (streamingState === "play") {
      setWarning(true);
      onStopStreaming();
    } else if (streamingState === "pause") {
      setWarning(false);
      onStartStreaming();
    }

    weEventTrack("workout_clickVideo", {
      taskId: task ? task.id : "no_taskId",
      taskName: task?.name ? task.name : "no_taskName",
      fps: task?.fitPoints ? task.fitPoints : -1,
      duration: task?.durationMinutes ? task.durationMinutes : -1,
      isPro: !task?.freeTask ? 1 : 0,
    });
  };

  //   const onTap = () => {
  //     setWarning(true);
  //   };

  const onNativeBack = useCallback(() => {
    const onBackPress = () => {
      onStopStreaming();
      setWarning(true);
      weEventTrack("workout_clickBack", {
        taskId: task ? task.id : "no_taskId",
        taskName: task?.name ? task.name : "no_taskName",
        fps: task?.fitPoints ? task.fitPoints : -1,
        duration: task?.durationMinutes ? task.durationMinutes : -1,
        isPro: !task?.freeTask ? 1 : 0,
      });

      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, []);

  useFocusEffect(onNativeBack);

  // const submitForAIScan = async () => {
  //   setTimeout(() => {
  //     navigation.navigate("Community");
  //   }, 500);
  // };

  useKeepAwake();

  // const onInitialized = () => {
  //   setCameraReady(true);
  // };

  const onQuit = async () => {
    try {
      onStopStreaming();

      castId && updateQuit(castId);
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("ending failed", error);
    }

    // if (adaptor.localStream.current) {
    //   const videoTracks = adaptor.localStream.current?.getVideoTracks();
    //   if (videoTracks.length) {
    //     // stop video
    //     videoTracks[0].stop();
    //   }
    // }

    setWarning(false);
    setTimeout(() => navigation.goBack(), 500);
    weEventTrack("workout_clickQuit", {
      taskId: task ? task.id : "no_taskId",
      taskName: task?.name ? task.name : "no_taskName",
      fps: task?.fitPoints ? task.fitPoints : -1,
      duration: task?.durationMinutes ? task.durationMinutes : -1,
      isPro: !task?.freeTask ? 1 : 0,
    });
  };

  // const onInit = () => {
  //   onStartStreaming();

  //   weEventTrack("workout_clickPlay", {
  //     taskId: task ? task.id : "no_taskId",
  //     taskName: task?.name ? task.name : "no_taskName",
  //     fps: task?.fitPoints ? task.fitPoints : -1,
  //     duration: task?.durationMinutes ? task.durationMinutes : -1,
  //     isPro: !task?.freeTask ? 1 : 0,
  //   });
  // };

  const onFinish = async () => {
    try {
      onStopStreaming();

      castId && updateQuit(castId);
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("finish failed", error);
    }

    // if (adaptor.localStream.current) {
    //   const videoTracks = adaptor.localStream.current?.getVideoTracks();
    //   if (videoTracks.length) {
    //     // stop video
    //     videoTracks[0].stop();
    //   }
    // }

    setWarning(false);

    setTimeout(() => {
      navigation.navigate("PostInteraction", {
        badgeId: task?.badgeId ? task.badgeId : "",
      });
    }, 500);
    // setPostInteraction(true);
    weEventTrack("workout_clickFinish", {
      taskId: task ? task.id : "no_taskId",
      taskName: task?.name ? task.name : "no_taskName",
      fps: task?.fitPoints ? task.fitPoints : -1,
      duration: task?.durationMinutes ? task.durationMinutes : -1,
      isPro: !task?.freeTask ? 1 : 0,
    });
  };

  return (
    <View className="flex-1 bg-[#100F1A]">
      <Header
        back={true}
        orientation={finalOrientation}
        headerType="transparent"
        onBack={onBackRequest}
        backIcon="arrow"
        headerColor="#100F1A"
        tone="dark"
        titleNode={
          finalOrientation === "landscape" ? null : (
            <View className="flex-1 flex justify-center items-center mr-10 iphoneX:mr-12">
              <SocialBoat textColor="#FFFFFF" />
            </View>
          )
        }
      />

      <View className="flex-1">
        <View className="flex-1 rounded-2xl  relative">
          {castId &&
          cast?.webStatus !== "DISCONNECTED" ? null : !localMedia ? null : (
            // <TaskStreamV4
            //   streamingState={streamingState}
            //   onInit={onInit}
            //   onEnd={onTap}
            //   playbackId={task?.playbackId}
            //   videoThumbnail={task?.thumbnails}
            //   orientation={finalOrientation}
            //   selectedMedia={task?.avatar}
            //   onVideoFinish={onFinish}
            //   videoIntroDur={task?.videoIntroDur}
            // />
            <></>
          )}
          <BottomBarV3
            aiToggle="enabled"
            isFullScreen={
              castId && cast?.webStatus !== "DISCONNECTED" ? true : false
            }
            isEnded={false}
            onPress={onTap}
            orientation={finalOrientation}
            onFinish={onFinish}
            localMedia={localMedia}
          />
        </View>
      </View>

      <WarningModal
        showModal={showWarning}
        isStarted={streamingState !== "init"}
        onResume={onResume}
        onQuit={onQuit}
        supportedOrientations={["landscape", "portrait"]}
        onFinish={onFinish}
      />
    </View>
  );
};

export default GrantedFlowV3;
