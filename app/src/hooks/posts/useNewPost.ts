// import { uploadInternalRequest } from "@hooks/cloudinary/utils";
import { sessionTypes } from "@models/Event/Event";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { Post } from "@models/Post/Post";
import { createNewPost } from "@utils/post/createUtils";
// import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { createNewPost } from "@models/Posts/createUtils";
// import { Post } from "@models/Posts/Post";
import { useCallback, useEffect, useState } from "react";

export const useNewPost = (
  communityId: string | undefined,
  view: "public" | "private",
  eventId: string | undefined,
  gameId: string,
  cohortId?: string,
  authorId?: string,
  authorName?: string,
  authorImg?: CloudinaryMedia | AWSMedia,
  byAdmin?: boolean,
  score?: number,
  sessionName?: string,
  isOpen?: boolean,
  initalSessionType?: sessionTypes,
  editingPost?: Post,
  editFlag?: boolean,
  taskId?: string,
  // streamId?: string,
  // bs64Img?: string,
  // streamMedia?: (CloudinaryMedia | AWSMedia)[],
  refreshPost?: number
) => {
  const [newPost, updateDraftPost] = useState<Post | undefined>(() =>
    editFlag ? editingPost : undefined
  );
  const [editingNow, setEditingNow] = useState<"datetime" | "text">("text");
  const [sessionStart, setSessionStart] = useState<Date | null>();
  const [processing] = useState<boolean>(false);

  useEffect(() => {
    if (gameId && isOpen && authorId && !editFlag && !newPost?.id) {
      updateDraftPost(
        createNewPost(
          communityId,
          eventId,
          authorId,
          view,
          gameId,
          cohortId,
          authorName,
          authorImg,
          byAdmin,
          score,
          // sessionId,
          sessionName,
          initalSessionType,
          taskId
          // streamId,
          // streamMedia
        )
      );
    }
  }, [
    editFlag,
    isOpen,
    communityId,
    eventId,
    authorId,
    view,
    authorName,
    authorImg,
    byAdmin,
    score,
    // streamMedia,
    sessionName,
    cohortId,
    initalSessionType,
    taskId,
    // streamId,
    gameId,
    refreshPost,
    newPost?.id,
    // bs64Img,
  ]);

  const onMediaUpload = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      updateDraftPost((prev) => {
        if (prev) {
          return {
            ...prev,
            media: [...prev.media, ...newFiles],
          };
        }
      });
    },
    []
  );

  useEffect(() => {
    if (editFlag && editingPost) {
      updateDraftPost(editingPost);
    }
  }, [editFlag, editingPost]);

  // useEffect(() => {
  //   const sendRequest = async () => {
  //     if (bs64Img) {
  //       setProcessing(true);
  //       const res = await uploadInternalRequest(bs64Img);

  //       if (res) {
  //         onMediaUpload([res]);
  //       }

  //       setProcessing(false);
  //     }
  //   };

  //   sendRequest();
  // }, [bs64Img, streamMedia, onMediaUpload]);

  const onUpdateSessionType = (sessionType: sessionTypes) => {
    updateDraftPost((prev) => {
      if (prev)
        return {
          ...prev,
          sessionType: sessionType,
        };
    });
  };

  const onScoreUpdate = (newScore: number) => {
    updateDraftPost((prev) => {
      if (prev) {
        return {
          ...prev,
          score: newScore,
        };
      }
    });
  };

  const onUpdateText = (newText: string) => {
    updateDraftPost((prev) => {
      if (prev)
        return {
          ...prev,
          text: newText,
        };
    });
  };

  const onMediaDelete = useCallback((toDelete: CloudinaryMedia | AWSMedia) => {
    updateDraftPost((prev) => {
      if (prev) {
        return {
          ...prev,
          media: prev.media.filter((item) => item.id !== toDelete.id),
        };
      }
    });
  }, []);

  const onUpdatePostMedia = useCallback(
    (newMedia: (CloudinaryMedia | AWSMedia)[]) => {
      updateDraftPost((prev) => {
        if (prev) {
          return {
            ...prev,
            media: newMedia,
          };
        }
      });
    },
    []
  );

  const onRemoveById = useCallback((id: string) => {
    updateDraftPost((prev) => {
      if (prev) {
        return {
          ...prev,
          media: prev.media.filter((item) => item.id !== id),
        };
      }
    });
  }, []);

  return {
    newPost,
    updateDraftPost,
    onUpdateText,
    onMediaDelete,
    onMediaUpload,
    onScoreUpdate,
    sessionStart,
    setSessionStart,
    onUpdateSessionType,
    editingNow,
    setEditingNow,
    onRemoveById,
    processing,
    onUpdatePostMedia,
  };
};
