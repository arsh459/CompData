import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { Post } from "@models/Post/Post";
import { createNewPost } from "@utils/postsV3/createUtills";
import { onGetPost, onSavePost } from "@utils/postsV3/utils";
import { useCallback, useEffect, useState } from "react";

export const useNewPost = (
  view?: "public" | "private",
  gameId?: string,
  authorId?: string,
  authorName?: string,
  authorImg?: CloudinaryMedia | AWSMedia,
  editPostId?: string
) => {
  const [newPost, setNewPost] = useState<Post | undefined>();

  const getNewPost = useCallback(() => {
    if (authorId) {
      return createNewPost(
        view || "public",
        gameId || TEAM_ALPHABET_GAME,
        authorId,
        authorName,
        authorImg
      );
    }
  }, [view, gameId, authorId, authorName, authorImg]);

  useEffect(() => {
    const getPost = async () => {
      if (editPostId) {
        const editPost = await onGetPost(editPostId, gameId);
        if (editPost) {
          setNewPost(editPost);
        }
      } else {
        setNewPost(getNewPost());
      }
    };

    getPost();
  }, [editPostId, gameId]);

  const onMediaUpload = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      setNewPost((prev) => {
        if (prev) {
          return {
            ...prev,
            media: [newFiles[0]],
          };
        }
      });
    },
    []
  );

  const onMediaDelete = useCallback(() => {
    setNewPost((prev) => {
      if (prev) {
        return {
          ...prev,
          media: [],
        };
      }
    });
  }, []);

  const onUpdateText = (newText: string) => {
    setNewPost((prev) => {
      if (prev)
        return {
          ...prev,
          text: newText,
        };
    });
  };

  const onSave = async () => {
    if (newPost) {
      await onSavePost(newPost, gameId);
    }
  };

  return {
    newPost,
    onUpdateText,
    onMediaDelete,
    onMediaUpload,
    onSave,
  };
};
