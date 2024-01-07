// import { useGivenOrientation } from "@hooks/orientation/useGivenOrientation";
// import { usePlainTaskContext } from "@providers/task/PlainTaskProvider";
// import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { createContext, useContext, useRef } from "react";
// import { updateQuit } from "@utils/cast/utils";
import Video from "react-native-video";
// import { eventObj } from ".";
import {
  ContentContextInterface,
  ContentContextProps,
  // ContentModalStateType,
  // positionInterfase,
} from "./interface";
// import { useNavigation } from "@react-navigation/native";
// import { SubTask } from "@models/Tasks/Task";
// import firestore from "@react-native-firebase/firestore";
// import crashlytics from "@react-native-firebase/crashlytics";

const ContentContext = createContext<ContentContextInterface | undefined>(
  undefined
);

function ContentProvider({
  children,
}: // streamingState,
// onStartStreaming,
// onStopStreaming,
// castId,
// warning,
// attemptedDate,
// tone,
ContentContextProps) {
  // const timerRef = useRef<number>(0);
  // const navigation = useNavigation();
  // const { task } = usePlainTaskContext();
  const videoRef = useRef<Video>(null);
  // const [contentModalState, setContentModalState] =
  //   useState<ContentModalStateType>("hide");
  // const [subTasksObj, setSubTasksObj] = useState<{ [id: string]: SubTask }>({});
  // const [selectedSubTaskIndex, setSelectedSubTaskIndex] = useState<number>(-1);
  // const positionData = useRef<positionInterfase>({
  //   totalSec: 0,
  //   currentVal: 0,
  //   storeVal: 0,
  // });

  // useEffect(() => {
  //   setContentModalState(warning ? "warning" : "hide");
  // }, [warning]);

  // useEffect(() => {
  //   const getSubTasks = async () => {
  //     if (task?.subTasks) {
  //       const docs = await firestore()
  //         .collection("subTasks")
  //         .where(
  //           "id",
  //           "in",
  //           task.subTasks.map((each) => each.subTaskId)
  //         )
  //         .get();

  //       const remoteSubTasksObj: { [id: string]: SubTask } = {};

  //       for (const doc of docs.docs) {
  //         if (doc.data()) {
  //           const subTask = doc.data() as SubTask;
  //           if (!remoteSubTasksObj.hasOwnProperty(subTask.id))
  //             remoteSubTasksObj[subTask.id] = subTask;
  //         }
  //       }

  //       setSubTasksObj(remoteSubTasksObj);
  //     }
  //   };

  //   getSubTasks();
  // }, [task?.subTasks]);

  // update orientation
  // const { finalOrientation } = useGivenOrientation(task?.orientation, castId);

  // const startTimer = (num: number) => {
  //   timerRef.current = num;
  // };

  // const clearTimer = () => {
  //   timerRef.current = 0;
  // };

  // const onBackRequest = () => {
  //   setContentModalState("warning");
  //   onStopStreaming();
  //   weEventTrack("workout_clickBack", eventObj(task));
  // };

  // const onInit = () => {
  //   onStartStreaming();
  //   weEventTrack("workout_clickPlay", eventObj(task));
  // };

  // const onResume = () => {
  //   setContentModalState("hide");
  //   onStartStreaming();
  //   weEventTrack("workout_clickResume", eventObj(task));
  // };

  // const onPlayPause = (hideWarning?: boolean) => {
  //   if (streamingState === "play") {
  //     if (hideWarning) {
  //       setContentModalState("controls");
  //     } else {
  //       setContentModalState("warning");
  //     }
  //     onStopStreaming();
  //   } else if (streamingState === "pause") {
  //     onStartStreaming();
  //   }

  //   weEventTrack("workout_clickVideo", eventObj(task));
  // };

  // const onQuit = () => {
  //   try {
  //     onStopStreaming();

  //     castId && updateQuit(castId);
  //   } catch (error: any) {
  //     crashlytics().recordError(error);
  //     console.log("ending failed", error);
  //   }

  //   setContentModalState("hide");
  //   setTimeout(() => navigation.goBack(), 500);
  // };

  // const onFinish = async () => {
  //   try {
  //     onStopStreaming();
  //     castId && updateQuit(castId);
  //   } catch (error: any) {
  //     crashlytics().recordError(error);
  //     console.log("finish failed", error);
  //   }

  //   setContentModalState("hide");
  //   setTimeout(() => {
  //     navigation.navigate("PostInteraction", {
  //       badgeId: task?.badgeId ? task.badgeId : "",
  //     });
  //   }, 500);
  //   weEventTrack("workout_clickFinish", eventObj(task));
  // };

  // const handleSlide = (val: Array<number>) => {
  //   if (videoRef && videoRef.current && val.length) {
  //     positionData.current.currentVal = val[0];
  //     videoRef.current.seek(val[0]);
  //     if (streamingState !== "play") {
  //       onPlayPause();
  //     }
  //   }
  //   clearTimer();
  // };

  const value = {
    videoRef,
    // streamingState,
    // contentModalState,
    // setContentModalState,
    // onBackRequest,
    // finalOrientation,
    // onInit,
    // onPlayPause,
    // onResume,
    // onFinish,
    // onQuit,
    // subTasksObj,
    // selectedSubTaskIndex,
    // setSelectedSubTaskIndex,
    // attemptedDate,
    // tone,
    // startTimer,
    // clearTimer,
    // timerRef,
    // positionData,
    // handleSlide,
  };

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

function useContentContext() {
  const context = useContext(ContentContext);

  if (context === undefined) {
    throw new Error("useContentContext must be used within ContentProvider");
  }

  return context;
}

export { ContentProvider, useContentContext };
