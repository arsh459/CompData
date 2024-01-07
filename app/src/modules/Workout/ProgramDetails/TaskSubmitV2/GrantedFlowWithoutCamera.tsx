import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { useCallback, useState } from "react";
import { BackHandler, View } from "react-native";
import { useKeepAwake } from "@sayem314/react-native-keep-awake";
import WarningModal from "../TaskSubmit/WarningModal";
import Header from "@modules/Header";
import SocialBoat from "@components/SocialBoat";
import { useGivenOrientation } from "@hooks/orientation/useGivenOrientation";
// import BottomBarV3 from "../TaskSubmit/BottomBarV3";
import { updateQuit } from "@utils/cast/utils";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useStreamWithoutCamera } from "@hooks/permissions/useStreamWithoutCamera";
import { usePlainTaskContext } from "@providers/task/PlainTaskProvider";
import TaskStreamV4 from "../TaskSubmit/TaskStreamV4";
import { aiToggleStatus } from "../TaskSubmitV3";
import BottomBarV4 from "../TaskSubmit/BottomBarV4";
import {
  calculateFPFromProgress,
  useTaskStream,
} from "@providers/task/hooks/useTaskStream";
// import FPProgress from "./FPProgress";
import crashlytics from "@react-native-firebase/crashlytics";

export type uploadStatusTypes = "UPLOADING" | "SUCCESS" | "FAILED";

export interface uploadProgressObject {
  status: uploadStatusTypes;
  progress: number;
}

interface Props {
  castId?: string;
  tone: "light" | "dark";
  attemptedDate: string;
  aiToggle?: aiToggleStatus;
}

const GrantedFlowWithoutCamera: React.FC<Props> = ({
  castId,
  attemptedDate,
  aiToggle,
  tone,
}) => {
  const [showWarning, setWarning] = useState<boolean>(false);
  const navigation = useNavigation();
  // const [postInteraction, setPostInteraction] = useState<boolean>(false);
  // const [cameraReady, setCameraReady] = useState<boolean>(false);

  const { onStartStreaming, onStopStreaming, streamingState, cast } =
    useStreamWithoutCamera(setWarning, castId);
  const {
    selectedActivity,
    onUpdateProgress,
    onInitActivity,
    checked,
    fpProgress,
  } = useTaskStream(attemptedDate);

  const { task } = usePlainTaskContext();

  //   const { state } = useAuthContext();
  //   const { user } = useUserContext();

  // update orientation
  const { finalOrientation } = useGivenOrientation(
    task?.orientation,
    // "portrait",
    // "landscape",
    castId
  );

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

  const onInit = async () => {
    onStartStreaming();

    ///////////
    await onInitActivity();
    ///////////

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
    //     // stop video
    //     videoTracks[0].stop();
    //   }
    // }

    setWarning(false);
    const { fpAward } = calculateFPFromProgress(
      selectedActivity?.progress || 0,
      task?.fitPoints
    );

    setTimeout(() => {
      navigation.dispatch((state) => {
        const routes = state.routes.filter((r) => r.name !== "UploadTask");

        if (fpAward) {
          routes.push({
            key: `${"Congratulations"}-${Math.round(Math.random() * 1000)}`,
            name: "Congratulations",
            params: {
              earnedFP: fpAward,
              totalFP: task?.fitPoints || 0,
              type: "workout",
              workoutProp: {
                taskId: task?.id || "",
                attemptedDate: attemptedDate,
              },
            },
          });
        } else {
          routes.push({
            key: `${"WorkoutDoneScreen"}-${Math.round(Math.random() * 1000)}`,
            name: "WorkoutDoneScreen",
            params: {
              taskId: task?.id || "",
              attemptedDate: attemptedDate,
            },
          });
        }

        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });

      // navigation.navigate("WorkoutDoneScreen", {
      //   taskId: task?.id || "",
      //   actId: selectedActivity?.id || "",
      //   attemptedDate: attemptedDate,
      // });
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
          cast?.webStatus !== "DISCONNECTED" ? null : !checked ? null : (
            <>
              <TaskStreamV4
                streamingState={streamingState}
                onInit={onInit}
                progress={selectedActivity?.progress}
                fpProgress={selectedActivity?.fpProgress}
                onProgressUpdate={onUpdateProgress}
                playbackId={task?.playbackId}
                videoThumbnail={task?.thumbnails}
                orientation={finalOrientation}
                selectedMedia={task?.avatar}
                onVideoFinish={onFinish}
                videoIntroDur={task?.videoIntroDur}
              />
              {fpProgress > 0 &&
              //  MIN_FP_TH
              task?.fitPoints ? (
                <View />
              ) : // <FPProgress
              //   tone={tone}
              //   fpProgress={fpProgress}
              //   orientation={finalOrientation}
              //   taskFp={task?.fitPoints}
              // />
              null}
            </>
          )}
          <BottomBarV4
            aiToggle={aiToggle}
            isFullScreen={
              castId && cast?.webStatus !== "DISCONNECTED" ? true : false
            }
            isEnded={false}
            onPress={onTap}
            orientation={finalOrientation}
            onFinish={onFinish}
            // localMedia={localMedia}
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

export default GrantedFlowWithoutCamera;
