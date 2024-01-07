import { sessionTypes, SessionV2 } from "@models/Event/Event";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { createNewPost } from "@models/Posts/createUtils";
import { useEffect, useState, useCallback } from "react";
import { createNewSessionV2 } from "@models/Event/createUtils";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export const useNewSession = (
  //   communityId: string,
  //   view: "public" | "private",
  //   eventId: string,
  //   cohortId: string,
  //   //   authorId?: string,
  //   authorName?: string,
  //   authorImg?: CloudinaryMedia,
  //   byAdmin?: boolean,
  //   score?: number,
  //   sessionId?: string,
  cohortId: string,
  isOpen?: boolean,
  initalSessionType?: sessionTypes
) => {
  const [newSession, updateNewSession] = useState<SessionV2>();
  const [sessionStart, setSessionStart] = useState<Date | null>();

  useEffect(() => {
    if (isOpen)
      updateNewSession(
        createNewSessionV2(undefined, initalSessionType, cohortId)
      );
    setSessionStart(new Date());
  }, [isOpen, initalSessionType, cohortId]);

  //   const onRequestNewPost = () => {
  //     if (authorId)
  //       updateDraftPost(
  //         createNewPost(
  //           communityId,
  //           eventId,
  //           authorId,
  //           view,
  //           cohortId,
  //           authorName,
  //           authorImg,
  //           byAdmin,
  //           score,
  //           sessionId,
  //           sessionName
  //         )
  //       );
  //   };

  //   const onScoreUpdate = (newScore: number) => {
  //     updateDraftPost((prev) => {
  //       if (prev) {
  //         return {
  //           ...prev,
  //           score: newScore,
  //         };
  //       }
  //     });
  //   };

  const onUpdateText = (newText: string) => {
    updateNewSession((prev) => {
      if (prev)
        return {
          ...prev,
          description: newText,
        };
    });
  };

  const onUpdateSessionType = (sessionType: sessionTypes) => {
    updateNewSession((prev) => {
      if (prev)
        return {
          ...prev,
          sessionType: sessionType,
        };
    });
  };

  const onMediaUpload = useCallback((newFile: CloudinaryMedia) => {
    updateNewSession((prev) => {
      if (prev) {
        return {
          ...prev,
          media: newFile,
        };
      }
    });
  }, []);

  const onMediaDelete = () => {
    updateNewSession((prev) => {
      if (prev) {
        const { media, ...rest } = prev;
        return rest;
      }
    });
  };

  return {
    newSession,
    updateNewSession,
    onUpdateText,
    onUpdateSessionType,
    sessionStart,
    setSessionStart,
    onMediaUpload,
    onMediaDelete,
  };
};
