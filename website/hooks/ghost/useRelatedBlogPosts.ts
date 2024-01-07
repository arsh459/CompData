import { PostOrPage } from "@tryghost/content-api";
import { getRelatedPostsUsingTags } from "@utils/ghostutils";
import { useEffect, useState } from "react";

export const useRelatedBlogPosts = (
  currentPostTag?: string,
  currentPostId?: string
) => {
  const [relatedPosts, setRelatedPosts] = useState<PostOrPage[]>([]);

  useEffect(() => {
    const getPost = async () => {
      if (currentPostId && currentPostTag) {
        const response = await getRelatedPostsUsingTags(
          currentPostTag,
          currentPostId
        );

        if (response) {
          setRelatedPosts(response);
        }
      }
    };
    getPost();
  }, [currentPostId, currentPostTag]);

  return {
    relatedPosts,
  };
};
