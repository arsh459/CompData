import { useState } from "react";
import {
  createNewStream,
  saveNewStream,
  updateStream,
  updateStreamState,
} from "@models/Workouts/createStream";
import { UserInterface } from "@models/User/User";
import { useWorkoutStream } from "./useWorkoutStream";
import { endLiveWorkout } from "@templates/community/workouts/utils";

export const useWorkoutTracking = (
  user?: UserInterface,
  seriesId?: string,
  videoId?: string,
  type?: "workout" | "nutrition" | "live",
  parentId?: string,
  communityId?: string
  // date?: string
) => {
  const { userStream, setLoading, loading } = useWorkoutStream(
    seriesId,
    videoId,
    user?.uid,
    type
    // date
  );

  const [isJoinModal, setIsOpenJoin] = useState<boolean>(false);

  const [streamState, setStreamState] = useState<"paused" | "streaming">(
    "paused"
  );
  const [streamedSeconds, setStreamedSeconds] = useState<number>(0);

  const onProgressLoad = async () => {
    if (seriesId && videoId && userStream?.id && streamState === "streaming") {
      // console.log("here");
      if (
        streamedSeconds &&
        streamedSeconds % 7 === 0 &&
        streamState === "streaming"
      ) {
        // console.log("here now");
        await updateStream(seriesId, videoId, userStream.id, 7, "exercises");
        setStreamedSeconds(0);
      } else if (streamState === "streaming") {
        // console.log("here instead");
        setStreamedSeconds((prev: number) => prev + 1);
      }
    }
  };

  // console.log("userStream.streamedSeconds", userStream?.streamedSeconds);
  // console.log("streamState", streamState);

  const handleStreaming = async () => {
    if (streamState === "paused") {
      onPlay();
    } else {
      // console.log("Changing to paused");
      setStreamState("paused");
    }
  };

  const onPlay = async () => {
    if (!loading && !userStream && user?.uid && seriesId && videoId) {
      const now = new Date();

      const newStream = createNewStream(
        user.uid,
        `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
        type === "workout" ? "video" : "live",
        now.getTime(),
        user.name,
        user.profileImage,
        "active"
      );

      await saveNewStream(
        seriesId,
        videoId,
        newStream,
        type === "workout" ? "exercises" : "lives"
      );
      setLoading(true);
    } else if (type === "live" && userStream && seriesId && videoId) {
      await updateStreamState(
        seriesId,
        videoId,
        userStream.id,
        "active",
        "lives"
      );
    }

    if (type === "workout") {
      setStreamState("streaming");

      if (document)
        setTimeout(() => {
          document
            .querySelector("#" + "myRank")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 600);
    } else if (type === "live") {
      setStreamState("streaming");
      setIsOpenJoin(true);
    }
  };

  const onClose = () => {
    setIsOpenJoin(false);
    if (document)
      setTimeout(() => {
        document
          .querySelector("#" + "myRank")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 600);
  };

  const onLeaveLiveVideo = async () => {
    if (userStream && seriesId && videoId) {
      await updateStreamState(
        seriesId,
        videoId,
        userStream.id,
        "inactive",
        "lives"
      );

      setIsOpenJoin(false);
      setStreamState("paused");

      if (user?.uid && parentId && communityId) {
        await endLiveWorkout(
          seriesId,
          userStream.id,
          videoId,
          user?.uid,
          "lives",
          parentId,
          communityId
        );
      }
    }
  };

  const onRequestLeave = () => {
    setStreamState("paused");
    setIsOpenJoin(true);
  };

  const onEnd = () => setStreamState("paused");

  return {
    handleStreaming,
    onProgressLoad,
    streamState,
    onRequestLeave,
    onEnd,
    onPlay,
    isJoinModal,
    onClose,
    onLeaveLiveVideo,
    userStream,
  };
};
