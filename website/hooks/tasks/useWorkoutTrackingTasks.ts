import { useCallback, useEffect, useState } from "react";
import {
  addMediaToStream,
  createNewStream,
  removeMediaFromStream,
  resumeTaskStream,
  //   saveNewStream,
  saveTaskStream,
  updateTaskStream,
  //   updateStream,
  //   updateStreamState,
  updateTaskStreamState,
  voidTask,
} from "@models/Workouts/createStream";
import { UserInterface } from "@models/User/User";
// import { useWorkoutStream } from "./useWorkoutStream";
// import { endLiveWorkout } from "@templates/community/workouts/utils";
import { useWorkoutTaskStream } from "./useWorkoutTaskStream";
import { useRouter } from "next/router";
import { internalWhatsappVoidMessage } from "./utils";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

const inactivePeriod = 90 * 60 * 60 * 1000;
const stopActivityPeriod = 10 * 60 * 60 * 1000;

export const useWorkoutTrackingTasks = (
  // onStreamIdUpdate: (newId: string) => void,
  user?: UserInterface,
  taskId?: string

  // streamId?: string
  //   type?: "workout" | "nutrition" | "live",
  //   parentId?: string,
  //   communityId?: string
) => {
  const { userStream, setLoading, loading } = useWorkoutTaskStream(
    taskId,
    user?.uid
  );

  // console.log("user?.uid", user?.uid);

  //   const [isJoinModal, setIsOpenJoin] = useState<boolean>(false);
  const [streamState, setStreamState] = useState<"paused" | "streaming">(
    "paused"
  );
  const [streamedSeconds, setStreamedSeconds] = useState<number>(0);
  // const [localInit, toggleLocalInit] = useState<boolean>(false);
  const [warning, handleWarning] = useState<boolean>(false);
  const [stopWorkoutModal, toggleWorkoutModal] = useState<
    "none" | "leave" | "void"
  >("none");

  const router = useRouter();

  // console.log("streamState", streamState);

  const onVoidWorkout = async () => {
    if (taskId && userStream?.id) {
      await voidTask(taskId, userStream.id);
      toggleWorkoutModal("none");
      router.back();
    }
  };

  useEffect(() => {
    if (warning) {
      // console.log("IN WARNING");
      // send WhatsApp message
      if (taskId && userStream?.id) {
        internalWhatsappVoidMessage(taskId, userStream?.id).catch((e) =>
          console.log("e", e)
        );
      }

      // new timer then workout will be void
      const timer = setTimeout(async () => {
        if (taskId && userStream?.id) {
          await voidTask(taskId, userStream?.id);
        }
        toggleWorkoutModal("none");
        router.back();
      }, stopActivityPeriod);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [warning, taskId, userStream?.id, router]);

  useEffect(() => {
    if (streamState === "streaming") {
      const interval = setInterval(() => {
        setStreamedSeconds((prev) => prev + 1);
      }, 1000);

      const popupTimer = setTimeout(() => {
        // console.log("HEREREE");
        handleWarning(true);
        toggleWorkoutModal("void");
      }, inactivePeriod);

      return () => {
        clearInterval(interval);
        clearTimeout(popupTimer);
      };
    }
  }, [streamState]);

  useEffect(() => {
    if (
      typeof userStream?.currentReservoir === "number" &&
      typeof userStream?.reservoirSeconds === "number" &&
      Math.abs(
        userStream?.currentReservoir +
          userStream?.reservoirSeconds -
          streamedSeconds
      ) > 15
    ) {
      // console.log(
      //   "here in reconcile",
      //   userStream?.currentReservoir + userStream?.reservoirSeconds
      // );
      setStreamedSeconds(
        userStream?.currentReservoir + userStream?.reservoirSeconds
      );
      // toggleLocalInit(true);
    }
  }, [
    userStream?.currentReservoir,
    userStream?.reservoirSeconds,
    streamedSeconds,
  ]);

  useEffect(() => {
    const updateRemote = async () => {
      // update every 13 seconds
      if (
        userStream?.streamLastStarted &&
        streamedSeconds &&
        streamedSeconds % 13 === 0 &&
        taskId &&
        userStream?.id
      ) {
        // console.log("here now");
        const secondsToUpdate = Math.floor(
          (Date.now() - userStream?.streamLastStarted) / 1000
        );

        // const prev = userStream.streamedSeconds;

        // seconds to update
        await updateTaskStream(taskId, userStream?.id, secondsToUpdate);
      }
    };

    updateRemote();
  }, [streamedSeconds, taskId, userStream?.id, userStream?.streamLastStarted]);

  //   const onProgressLoad = async () => {
  //     if (seriesId && videoId && userStream?.id && streamState === "streaming") {
  //       if (
  //         streamedSeconds &&
  //         streamedSeconds % 7 === 0 &&
  //         streamState === "streaming"
  //       ) {
  //         await updateStream(seriesId, videoId, userStream.id, 7, "exercises");
  //         setStreamedSeconds(0);
  //       } else if (streamState === "streaming") {
  //         setStreamedSeconds((prev: number) => prev + 1);
  //       }
  //     }
  //   };

  // console.log("userStream.streamedSeconds", userStream?.streamedSeconds);
  // console.log("streamState", streamState);

  const handleStreaming = async () => {
    if (streamState === "paused") {
      console.log("play");
      onPlay();
    } else {
      setStreamState("paused");
      if (taskId && userStream?.id) {
        const currentReservoirNow = Math.floor(
          (Date.now() -
            (userStream.streamLastStarted
              ? userStream.streamLastStarted
              : Date.now())) /
            1000
        );

        // console.log("currentReservoirNow", currentReservoirNow);

        // const currentReservoir = userStream.currentReservoir
        //   ? userStream.currentReservoir
        //   : 0;

        // console.log("currentReservoir", currentReservoir);

        await updateTaskStreamState(
          taskId,
          userStream?.id,
          "inactive",
          currentReservoirNow,
          userStream.reservoirSeconds ? userStream.reservoirSeconds : 0
        );
      }
    }
  };

  // console.log("userStream", userStream, loading, taskId);

  const saveNewLocalStream = async () => {
    const now = new Date();

    if (user?.uid && taskId) {
      const newStream = createNewStream(
        user.uid,
        `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
        "task",
        now.getTime(),
        user.name,
        user.profileImage,
        "active"
      );

      await saveTaskStream(newStream, taskId);

      return newStream.id;
    }
  };

  const onUploadMedia = useCallback(
    async (newFile: (CloudinaryMedia | AWSMedia)[]) => {
      if (!userStream?.id && user?.uid && taskId) {
        const now = new Date();
        const newStream = createNewStream(
          user.uid,
          `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
          "task",
          now.getTime(),
          user.name,
          user.profileImage,
          "active",
          newFile
        );

        await saveTaskStream(newStream, taskId);
        return newStream.id;
      } else if (userStream?.id && taskId) {
        for (const file of newFile) {
          await addMediaToStream(taskId, userStream.id, file);
        }

        return userStream.id;
      }
    },
    [userStream?.id, taskId, user?.uid, user?.name, user?.profileImage]
  );

  const onDeleteMedia = useCallback(
    async (newFile: CloudinaryMedia | AWSMedia) => {
      if (userStream?.id && taskId) {
        await removeMediaFromStream(taskId, userStream.id, newFile);
      }
    },
    [userStream?.id, taskId]
  );

  const onPlay = async () => {
    if (!loading && !userStream && taskId && user?.uid) {
      await saveNewLocalStream();
      setStreamState("streaming");
      setLoading(true);
    } else if (userStream?.id && taskId) {
      await resumeTaskStream(userStream?.id, taskId, Date.now());
      setStreamState("streaming");
    }
  };

  const closeWarningModal = () => toggleWorkoutModal("none");
  const onRequestLeaveLive = () => toggleWorkoutModal("leave");

  // on start
  // create new stream

  // on update
  // increment seconds from last started

  // onPause
  // increment residue seconds
  // remove last started

  //   const onClose = () => {
  //     setIsOpenJoin(false);
  //     if (document)
  //       setTimeout(() => {
  //         document
  //           .querySelector("#" + "myRank")
  //           ?.scrollIntoView({ behavior: "smooth", block: "start" });
  //       }, 600);
  //   };

  // const onLeaveLiveVideo = async () => {
  //   if (userStream && taskId) {
  //     await updateTaskStreamState(taskId, userStream.id, "inactive");

  //     //   setIsOpenJoin(false);
  //     setStreamState("paused");
  //   }
  // };

  // const onRequestLeave = async () => {
  //   setStreamState("paused");
  //   if (taskId && userStream?.id) {
  //     await updateTaskStreamState(taskId, userStream?.id, "inactive");
  //   }
  // };

  const onPauseWorkout = async () => {
    setStreamState("paused");
    if (taskId && userStream?.id) {
      const currentReservoirNow = Math.floor(
        (Date.now() -
          (userStream.streamLastStarted
            ? userStream.streamLastStarted
            : Date.now())) /
          1000
      );

      // console.log("currentReservoirNow", currentReservoirNow);

      // const currentReservoir = userStream.currentReservoir
      //   ? userStream.currentReservoir
      //   : 0;

      // console.log("currentReservoir", currentReservoir);
      await updateTaskStreamState(
        taskId,
        userStream?.id,
        "inactive",
        currentReservoirNow,
        userStream.reservoirSeconds ? userStream.reservoirSeconds : 0
      );
    }
  };

  return {
    handleStreaming,
    onPauseWorkout,
    streamState,
    closeWarningModal,
    onVoidWorkout,
    // onRequestLeave,
    onUploadMedia,
    onDeleteMedia,
    // onPlay,
    streamedSeconds,
    stopWorkoutModal,
    onRequestLeaveLive,
    saveNewLocalStream,
    // isJoinModal,
    // onClose,
    // onLeaveLiveVideo,
    userStream,
  };
};

/**
 *
 *
 *
 */
