import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { BackHandler, View } from "react-native";
import { useKeepAwake } from "@sayem314/react-native-keep-awake";
import { useTaskContext } from "@providers/task/TaskProvider";
import WarningModal from "../TaskSubmit/WarningModal";
import Header from "@modules/Header";
import crashlytics from "@react-native-firebase/crashlytics";
import { useGivenOrientation } from "@hooks/orientation/useGivenOrientation";
import BottomBarV3 from "../TaskSubmit/BottomBarV3";
import { updateQuit } from "@utils/cast/utils";
import TaskStreamV3 from "../TaskSubmit/TaskStreamV3";
import { useRTCCam } from "@hooks/permissions/useRTCCam";
import { Ice_Server } from "@hooks/stun/useStun";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import AiStatus from "./AiStatus";
import { format } from "date-fns";

export type uploadStatusTypes = "UPLOADING" | "SUCCESS" | "FAILED";

export interface uploadProgressObject {
  status: uploadStatusTypes;
  progress: number;
}

interface Props {
  castId?: string;
  servers: Ice_Server[];
}

const GrantedFlowV2: React.FC<Props> = ({ castId, servers }) => {
  const [showWarning, setWarning] = useState<boolean>(false);
  const navigation = useNavigation();

  const {
    onStartStreaming,
    onStopStreaming,
    streamingState,
    cast,
    localMedia,
    // adaptor,
  } = useRTCCam(setWarning, servers, format(new Date(), "yyyy-MM-dd"), castId);

  const { task } = useTaskContext();

  const { finalOrientation } = useGivenOrientation(task?.orientation, castId);

  const onBackRequest = () => {
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
    if (streamingState !== "init") {
      setWarning(true);
      onStopStreaming();
    }
    {
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
  useKeepAwake();

  const onQuit = async () => {
    try {
      onStopStreaming();

      castId && updateQuit(castId);
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("ending failed", error);
    }

    // if (adaptor && adaptor.localStream.current) {
    //   const videoTracks = adaptor.localStream.current?.getVideoTracks();
    //   if (videoTracks.length) {
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

  const onInit = () => {
    onStartStreaming();

    weEventTrack("workout_clickPlay", {
      taskId: task ? task.id : "no_taskId",
      taskName: task?.name ? task.name : "no_taskName",
      fps: task?.fitPoints ? task.fitPoints : -1,
      duration: task?.durationMinutes ? task.durationMinutes : -1,
      isPro: !task?.freeTask ? 1 : 0,
    });
  };

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
    //     videoTracks[0].stop();
    //   }
    // }

    setWarning(false);

    setTimeout(() => {
      navigation.navigate("PostInteraction", {
        badgeId: task?.badgeId ? task.badgeId : "",
      });
    }, 500);
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
            // <View className="flex-1 flex justify-center items-center mr-10 iphoneX:mr-12">
            //   <SocialBoat textColor="#FFFFFF" />
            // </View>
            <AiStatus isEnabled={true} />
          )
        }
      />
      <View className="flex-1 rounded-2xl  relative">
        {castId &&
        cast?.webStatus !== "DISCONNECTED" ? null : !localMedia ? null : (
          <TaskStreamV3
            streamingState={streamingState}
            onInit={onInit}
            onEnd={onTap}
            playbackId={task?.playbackId}
            orientation={finalOrientation}
            selectedMedia={task?.avatar}
            onVideoFinish={onFinish}
            videoIntroDur={task?.videoIntroDur}
          />
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

export default GrantedFlowV2;
