import { CampaignPost, mediaStyleTemplates } from "@models/Event/Campaign";
import { createCampaignPost } from "@models/Event/createCampaignUtils";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { useCallback, useEffect, useState } from "react";

export const useNewCampaignPost = (
  eventId: string | undefined,
  creatorId: string,
  isOpen?: boolean,
  editingPost?: CampaignPost,
  editFlag?: boolean
) => {
  // console.log("edit", editFlag);
  // console.log("editingPost", newPost);

  const [newPost, updateDraftPost] = useState<CampaignPost | undefined>(() =>
    editFlag ? editingPost : undefined
  );
  const [editingNow, setEditingNow] = useState<"datetime" | "text">("text");

  useEffect(() => {
    if (isOpen && !editFlag && eventId) {
      updateDraftPost(createCampaignPost(eventId, creatorId));
    } else if (isOpen && editFlag && editingPost) {
      updateDraftPost(editingPost);
    }
  }, [editFlag, isOpen, eventId, creatorId, editingPost]);

  const onCaptionUpdate = (caption: string) => {
    updateDraftPost((prev) => {
      if (prev)
        return {
          ...prev,
          caption: caption,
        };
    });
  };

  const onMediaStyleUpdate = (mediaTemplate: mediaStyleTemplates) => {
    updateDraftPost((prev) => {
      if (prev) {
        return {
          ...prev,
          mediaStyle: mediaTemplate,
        };
      }
    });
  };

  const onTagUpdate = (tags: string) => {
    updateDraftPost((prev) => {
      if (prev)
        return {
          ...prev,
          tags: tags,
        };
    });
  };

  const onHashtagUpdate = (hashtags: string) => {
    updateDraftPost((prev) => {
      if (prev)
        return {
          ...prev,
          hashtags,
        };
    });
  };

  const onMediaUpload = useCallback((newFile: CloudinaryMedia) => {
    updateDraftPost((prev) => {
      if (prev) {
        return {
          ...prev,
          media: [...prev.media, newFile],
        };
      }
    });
  }, []);

  const onMediaDelete = (toDelete: CloudinaryMedia) => {
    updateDraftPost((prev) => {
      if (prev) {
        return {
          ...prev,
          media: prev.media.filter((item) => item.path !== toDelete.path),
        };
      }
    });
  };

  return {
    newPost,
    updateDraftPost,
    onCaptionUpdate,
    onTagUpdate,
    onMediaDelete,
    onMediaUpload,
    onHashtagUpdate,
    onMediaStyleUpdate,
    editingNow,
    setEditingNow,
  };
};
