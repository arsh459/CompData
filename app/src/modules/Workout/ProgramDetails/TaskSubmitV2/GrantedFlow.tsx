import crashlytics from "@react-native-firebase/crashlytics";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, EventSubscription, View } from "react-native";
import BottomBarV2 from "../TaskSubmit/BottomBarV2";
import { useKeepAwake } from "@sayem314/react-native-keep-awake";
import TaskStreamV2 from "../TaskSubmit/TaskStreamV2";
import { useTaskContext } from "@providers/task/TaskProvider";
import WarningModal from "../TaskSubmit/WarningModal";
import { useExpoCamera } from "@hooks/permissions/useExpoCamera";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { backgroundUpload } from "./utils";
import {
  createVideoPost,
  saveNewPostWithActivity,
  updatePostMedia,
} from "@utils/post/createUtils";
import { getTeamCaptainId, getTeamId } from "@utils/utills";
import PostInteractionV2 from "../TaskSubmit/PostInteractionV2";
import Header from "@modules/Header";
import SocialBoat from "@components/SocialBoat";
import { AWSMedia } from "@models/Media/MediaTypeInterface";
import { useGivenOrientation } from "@hooks/orientation/useGivenOrientation";
import CastedState from "./CastedState";
import { updateQuit } from "@utils/cast/utils";
import { useRTConnection } from "@hooks/cast/useRTConnection";
import { useCast } from "@hooks/cast/useCast";
import { format } from "date-fns";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

export type uploadStatusTypes = "UPLOADING" | "SUCCESS" | "FAILED";

export interface uploadProgressObject {
  status: uploadStatusTypes;
  progress: number;
}

interface Props {
  castId?: string;
}

const GrantedFlow: React.FC<Props> = ({ castId }) => {
  const [showWarning, setWarning] = useState<boolean>(false);
  const navigation = useNavigation();
  const [postInteraction, setPostInteraction] = useState<boolean>(false);
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const [progress, setProgress] = useState<{ [uploadId: string]: number }>({});
  const [status, setUploadStatus] = useState<{
    [uploadId: string]: uploadStatusTypes;
  }>();
  const [listeners, catchListeners] = useState<EventSubscription[]>([]);

  const { name, profileImage, participatingInGameWithTeam } = useUserStore(
    ({ user }) => {
      return {
        name: user?.name,
        profileImage: user?.profileImage,
        participatingInGameWithTeam: user?.participatingInGameWithTeam,
      };
    },
    shallow
  );

  const {
    cameraRef,
    startRecording,
    videoFiles,
    recordingState,
    videoState,
    stopRecording,
    endRecording,
    videoAdded,
  } = useExpoCamera(setWarning, castId);

  const { task } = useTaskContext();
  const { state } = useAuthContext();
  useRTConnection(castId);
  const { cast } = useCast(castId);

  useGivenOrientation(castId ? "portrait" : task?.orientation);

  const onBackRequest = async () => {
    endRecording();
    setWarning(true);
  };

  const onNativeBack = useCallback(() => {
    const onBackPress = () => {
      endRecording();
      setWarning(true);
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, []);

  useFocusEffect(onNativeBack);

  useEffect(() => {
    if (status) {
      const uploading = Object.values(status).includes("UPLOADING");
      if (!uploading) {
        setTimeout(() => {
          navigation.navigate("Community");
        }, 500);

        for (const listener of listeners) {
          listener.remove();
        }
      }
    }
  }, [status, listeners]);

  const submitForAIScan = async () => {
    if (state.uid && state.gameId && task?.id) {
      const leaderId = getTeamCaptainId(
        participatingInGameWithTeam,
        state.gameId
      );
      const teamId = getTeamId(participatingInGameWithTeam, state.gameId);

      const post = createVideoPost(
        [],
        state.uid,
        state.gameId,
        leaderId,
        teamId,
        task?.id,
        format(new Date(), "yyyy-MM-dd"),
        name,
        profileImage
      );

      await saveNewPostWithActivity(
        teamId ? teamId : state.gameId,
        post,
        task,
        state.gameId,
        0,
        undefined,
        undefined
      );

      const onUploadFinish = async (media: AWSMedia) => {
        await updatePostMedia(teamId ? teamId : state.gameId, post.id, media);
      };

      await backgroundUpload(
        videoFiles,
        state.uid,
        setProgress,
        setUploadStatus,
        onUploadFinish,
        catchListeners
      );
    }
  };

  useKeepAwake();

  const onInitialized = () => {
    setCameraReady(true);
  };

  const onQuit = async () => {
    try {
      await endRecording();
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("ending failed", error);
    }

    setWarning(false);
    setTimeout(() => navigation.goBack(), 500);
    castId && updateQuit(castId);
  };

  const onFinish = async () => {
    try {
      await endRecording();
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("finish failed", error);
    }

    setWarning(false);
    setPostInteraction(true);
    castId && updateQuit(castId);
  };

  return (
    <View className="flex-1 bg-[#100F1A]">
      <Header
        back={true}
        orientation={castId ? "portrait" : task?.orientation}
        headerType={castId ? undefined : "transparent"}
        onBack={onBackRequest}
        backIcon="arrow"
        headerColor="#100F1A"
        tone="dark"
        titleNode={
          !castId && task?.orientation === "landscape" ? null : (
            <View className="flex-1 flex justify-center items-center mr-10 iphoneX:mr-12">
              <SocialBoat textColor="#FFFFFF" />
            </View>
          )
        }
      />

      {castId ? (
        <CastedState
          webStatus={cast?.webStatus}
          onFinish={onFinish}
          cameraRef={cameraRef}
          onInitialized={onInitialized}
          onStart={startRecording}
          onEnd={stopRecording}
          isEnded={recordingState === "ended"}
        />
      ) : (
        <View className="flex-1 rounded-2xl overflow-hidden relative">
          {cameraReady ? (
            <TaskStreamV2
              recordingState={recordingState}
              onStart={startRecording}
              onEnd={stopRecording}
              orientation={task?.orientation}
              videoState={videoState}
              selectedMedia={task?.avatar}
              onVideoFinish={onFinish}
            />
          ) : null}
          <BottomBarV2
            isEnded={false}
            orientation={task?.orientation}
            onFinish={onFinish}
            cameraRef={cameraRef}
            unmountCamera={postInteraction}
            onInitialized={onInitialized}
          />
        </View>
      )}
      <WarningModal
        showModal={showWarning}
        isStarted={videoState === "started"}
        onResume={startRecording}
        onQuit={onQuit}
        supportedOrientations={["landscape", "portrait"]}
        onFinish={onFinish}
      />
      <PostInteractionV2
        isOpen={postInteraction}
        submitForAIScan={submitForAIScan}
        onClose={() => {}}
        orientation={castId ? "portrait" : task?.orientation}
        readyForSubmit={videoAdded}
        progress={progress}
        supportedOrientations={["landscape", "portrait"]}
      />
    </View>
  );
};

export default GrantedFlow;
