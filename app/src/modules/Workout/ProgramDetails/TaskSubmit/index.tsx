import { useState } from "react";
import { View, SafeAreaView } from "react-native";
import TaskStream from "./TaskStream";
import crashlytics from "@react-native-firebase/crashlytics";
import WarningModal from "./WarningModal";
// import { useNewPost } from "@hooks/posts/useNewPost";
// import { saveNewPostWithActivity } from "@utils/post/createUtils";
// import { useGameContext } from "@providers/game/GameProvider";
// import { useTeamContext } from "@providers/team/TeamProvider";
import { useNavigation } from "@react-navigation/native";
// import { useUserContext } from "@providers/user/UserProvider";
import { useTaskContext } from "@providers/task/TaskProvider";
import { useKeepAwake } from "@sayem314/react-native-keep-awake";
// import { Video, getRealPath, getVideoMetaData } from "react-native-compressor";
// import { Video } from "expo-av";
// import BottomBar from "./BottomBar";
// import { v4 as uuid } from "uuid";
// import {
//   ACCESS_KEY,
//   BUCKET,
//   S3_AWS_REGION,
//   SECRET_KEY,
// } from "react-native-dotenv";
// import {
//   Camera,
//   CameraCaptureError,
//   VideoFile,
// } from "react-native-vision-camera";
// import { RNS3 } from "react-native-upload-aws-s3";
// import { createAWSMedia } from "@components/MediaPicker/createUtils";
import Header from "@modules/Header";
import SocialBoat from "@components/SocialBoat";
// import { AWSMedia } from "@models/Media/MediaTypeInterface";

export type VideoStateType = "init" | "started" | "ended";
export type RecordingStateType = "recording" | "paused" | "ended";

interface Props {
  showWarning: boolean;
  setShowWarning: (val: boolean) => void;
}

const TaskSubmit: React.FC<Props> = ({ showWarning, setShowWarning }) => {
  // keep awake
  useKeepAwake();

  // const { team, teamLeader } = useTeamContext();
  // const { game } = useGameContext();
  // const { user } = useUserContext();
  const { task } = useTaskContext();
  const navigation = useNavigation();

  // const cameraRef = useRef<Camera>(null);

  const [_, setPostInteraction] = useState<boolean>(false);
  // const [uploaded, setUploaded] = useState<boolean>(false);
  const [videoState, setVideoState] = useState<VideoStateType>("init");
  // const [progress, setProgress] = useState<number>(0);
  // const [readyForSubmit, setReadyForSubmit] = useState<boolean>(false);
  // const [videoFiles, setVideoFile] = useState<VideoFile[]>([]);
  const [recordingState] = useState<RecordingStateType>("ended");

  // const { newPost } = useNewPost(
  //   teamLeader?.uid,
  //   "private",
  //   team?.id,
  //   game ? game.id : "",
  //   "",
  //   user?.uid,
  //   user?.name,
  //   user?.profileImage,
  //   user?.uid === teamLeader?.uid,
  //   undefined,
  //   "",
  //   true,
  //   undefined,
  //   undefined,
  //   false,
  //   task?.id

  const startRecording = () => {
    // if (recordingState === "ended") {
    //   if (cameraRef && cameraRef.current) {
    //     setRecordingState("recording");
    //     cameraRef.current.startRecording({
    //       flash: "off",
    //       onRecordingFinished: (video: VideoFile) => {
    //         setVideoFile((prev) => [...prev, video]);
    //       },
    //       onRecordingError,
    //       fileType: "mp4",
    //     });
    //   }
    //   setVideoState("started");
    // }
  };

  const resumeRecording = async () => {
    // if (recordingState === "paused") {
    //   if (cameraRef && cameraRef.current) {
    //     setRecordingState("recording");
    //     await cameraRef.current.resumeRecording();
    //   }
    // } else if (recordingState === "ended") {
    //   if (cameraRef && cameraRef.current) {
    //     setRecordingState("recording");
    //     cameraRef.current.startRecording({
    //       flash: "off",
    //       onRecordingFinished: (video: VideoFile) => {
    //         setVideoFile((prev) => [...prev, video]);
    //       },
    //       onRecordingError,
    //       fileType: "mp4",
    //     });
    //   }
    // }
    // setShowWarning(false);
  };

  const pauseRecording = async () => {
    // if (recordingState === "recording") {
    //   if (cameraRef && cameraRef.current) {
    //     setRecordingState("paused");
    //     await cameraRef.current.pauseRecording();
    //   }
    // }
    // setShowWarning(true);
  };

  const endRecording = async () => {
    // if (recordingState !== "ended") {
    //   if (cameraRef && cameraRef.current) {
    //     setRecordingState("ended");
    //     await cameraRef.current.stopRecording();
    //   }
    // }
  };

  // const stopRecording = async () => {
  //   // if (recordingState !== "ended") {
  //   //   if (cameraRef && cameraRef.current) {
  //   //     setRecordingState("ended");
  //   //     await cameraRef.current.stopRecording();
  //   //   }
  //   // }
  //   // setShowWarning(true);
  // };

  // const onRecordingError = () =>
  //   //error: CameraCaptureError
  //   {
  //   };

  const onQuit = async () => {
    try {
      await endRecording();
    } catch (error: any) {
      crashlytics().recordError(error);
    }

    navigation.goBack();
    setShowWarning(false);
  };

  const onFinish = async () => {
    try {
      await endRecording();
    } catch (error: any) {
      crashlytics().recordError(error);
    }

    setShowWarning(false);
    setPostInteraction(true);
    // await onRecordingSave();
  };

  // const onPost = async () => {
  //     try {
  //       await saveNewPostWithActivity(
  //         team.id,
  //         newPost,
  //         task,
  //         game.id,
  //         undefined,
  //         undefined
  //       );
  //     } catch (error: any) {
  //     }
  //   } else {
  //   }
  // };

  // const onGoToTeam = async () => {
  //   try {
  //     // await onPost();
  //     setPostInteraction(false);
  //     // navigation.navigate("Community");
  //   } catch (error: any) {
  //   }
  // };

  return (
    <>
      <Header
        back={true}
        onBack={pauseRecording}
        backIcon="arrow"
        headerColor="#100F1A"
        tone="dark"
        titleNode={<SocialBoat textColor="#FFFFFF" />}
        centerTitle={true}
      />
      <View className="flex-1 bg-[#100F1A]">
        <SafeAreaView className="flex-1">
          <View className="flex-1 rounded-2xl overflow-hidden relative">
            <TaskStream
              selectedMedia={task?.avatar}
              recordingState={recordingState}
              videoState={videoState}
              setVideoState={setVideoState}
              onStart={startRecording}
              onPause={pauseRecording}
            />
            {/* <BottomBar
              cameraRef={cameraRef}
              showWarning={showWarning}
              isEnded={videoState === "ended"}
              postInteraction={postInteraction}
              onFinish={onFinish}
              pauseRecording={pauseRecording}
              stopRecording={stopRecording}
            /> */}
          </View>
        </SafeAreaView>
      </View>
      <WarningModal
        showModal={showWarning}
        isStarted={videoState === "started"}
        onResume={resumeRecording}
        onQuit={onQuit}
        onFinish={onFinish}
      />
      {/* <PostInteraction
        isOpen={postInteraction}
        submitForAIScan={submitForAIScan}
        onClose={() => setPostInteraction(false)}
        readyForSubmit={readyForSubmit}
        progress={progress / (videoFiles.length ? videoFiles.length : 1)}
        // onGoToTeam={onGoToTeam}
      /> */}
    </>
  );
};

export default TaskSubmit;
