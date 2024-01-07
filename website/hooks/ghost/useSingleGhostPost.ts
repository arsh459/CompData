import { PostOrPage } from "@tryghost/content-api";
import { getSinglePost } from "@utils/ghost/ghostutils";
import { useEffect, useState } from "react";

export const useSingleGhostPost = (id?: string) => {
  const [post, setPost] = useState<PostOrPage>();

  useEffect(() => {
    const getFunc = async () => {
      if (id) {
        const ghostResponce = await getSinglePost(id);

        if (ghostResponce) {
          setPost(ghostResponce);
        }
      }
    };
    getFunc();
  }, [id]);

  return {
    post,
  };
};
