import { useCallback, useEffect } from "react";
import { useIsForeground } from "@hooks/utils/useIsForeground";
// import { VideoStateType } from "@modules/Workout/ProgramDetails/TaskSubmit";
import { useAuthContext } from "@providers/auth/AuthProvider";
import {
  // getTeamCaptainId,
  getTeamCaptainIdFromParticipating,
  //   getTeamId,
  getTeamIdFromParticipating,
} from "@utils/utills";
import { useUserContext } from "@providers/user/UserProvider";
import {
  createVideoPost,
  // saveNewPostWithActivity,
  saveNewPostWithActivityWithTaskParams,
} from "@utils/post/createUtils";
import { useRTConnection } from "@hooks/cast/useRTConnection";
import { updatePause, updatePlay } from "@utils/cast/utils";
import { useCast } from "@hooks/cast/useCast";
import { createAntStream, saveAntStream } from "@models/AntStream/AntStream";
import { useLocalAntMedia } from "./useLocalAntMedia";
import { Ice_Server } from "@hooks/stun/useStun";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { usePlainTaskContext } from "@providers/task/PlainTaskProvider";

export type streamingStateTypes = "init" | "play" | "pause";

export const useRTCCam = (
  setShowWarning: (newState: boolean) => void,
  servers: Ice_Server[],
  attempedDate: string,
  castId?: string
) => {
  const { state } = useAuthContext();
  const { user } = useUserContext();
  const { task } = usePlainTaskContext();
  const { cast } = useCast(castId);

  // const netInfoState = useNetInfo();
  useRTConnection(castId);

  // const [streamId, setStreamId] = useState<string>("");
  const {
    streamingState,
    setStreamingState,
    // adaptor,
    localMedia,
    setLocalMedia,
  } = useLocalAntMedia(servers);

  // websync effect
  useEffect(() => {
    if (cast?.taskState === "play") {
      setStreamingState("play");
      setShowWarning(false);
    } else if (cast?.taskState === "pause") {
      setStreamingState("pause");
      setShowWarning(true);
    }
  }, [cast?.taskState]);

  const onStartStreaming = () => {
    if (streamingState !== "play") {
      setStreamingState("play");
      castId && updatePlay(castId);
    }
  };
  const onStopStreaming = () => {
    if (streamingState !== "pause") {
      setStreamingState("pause");
      castId && updatePause(castId);
    }
  };

  const initPost = useCallback(async () => {
    if (state.uid && task?.id) {
      // setStreamingState("settingUp");
      const leaderId = getTeamCaptainIdFromParticipating(
        user?.participatingInGameWithTeam,
        state.gameId
      );
      const teamId = getTeamIdFromParticipating(
        user?.participatingInGameWithTeam,
        state.gameId
      );

      const antSt = createAntStream(state.uid);

      const post = createVideoPost(
        [],
        state.uid,
        state.gameId,
        leaderId,
        teamId,
        task?.id,
        attempedDate,
        user?.name,
        user?.profileImage,
        antSt.id
        // true
      );

      saveNewPostWithActivityWithTaskParams(
        teamId ? teamId : state.gameId,
        post,
        state.gameId,
        task?.id,
        0,
        task?.name,
        task?.thumbnails,
        undefined,
        undefined
      );

      saveAntStream(antSt);

      weEventTrack("workout_saveTask", {});

      return antSt.id;
    }
  }, [
    state.uid,
    task?.id,
    user?.participatingInGameWithTeam,
    state.gameId,
    user?.name,
    user?.profileImage,
    task?.id,
    task?.name,
    task?.thumbnails,
  ]);

  // controller
  // useEffect(() => {
  //   const main = async () => {
  //     // play request
  //     if (!streamId && streamingState === "play") {
  //       const sId = await initPost();
  //       sId && setStreamId(sId);
  //     } else if (streamId && streamingState === "play" && adaptor.publish) {
  //       adaptor.publish(streamId);
  //     } else if (streamId && streamingState === "pause" && adaptor.stop) {
  //       adaptor.stop(streamId);
  //     }
  //   };

  //   main();
  // }, [
  //   streamingState, // update by controller
  //   streamId, // on initial
  //   initPost,
  //   user?.participatingInGameWithTeam,
  //   state.gameId,
  //   adaptor.publish,
  //   adaptor.stop,
  // ]);

  const { appStateVisible } = useIsForeground();

  useEffect(() => {
    if (appStateVisible === "background" || appStateVisible === "inactive") {
      setShowWarning(true);
      setStreamingState("pause");

      castId && updatePause(castId);
    }
  }, [appStateVisible, castId]);

  return {
    // lvRef,
    onStartStreaming,
    onStopStreaming,
    streamingState,
    cast,
    localMedia,
    setLocalMedia,
    adaptor: null,
    initPost,
  };
};
