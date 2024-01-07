import { getQueryParamsForFeed } from "@hooks/drawer/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface FeedQuery {
  postId?: string;
}

export type feedQueryTypes = "postId";

export const useFeed = () => {
  const router = useRouter();

  const q = router.query as FeedQuery;
  const [postId, setPostId] = useState<string>("");
  const [isPosting, setIsPosting] = useState<boolean>(false);

  const onPost = () => setIsPosting(true);
  const onCancelPost = () => setIsPosting(false);

  useEffect(() => {
    if (router.isReady && typeof q.postId === "string") {
      setPostId(q.postId);
    }
  }, [router.isReady, q]);

  const onClickPost = (postId: string) => {
    q.postId = postId;
    router.push(getQueryParamsForFeed(q), undefined, { shallow: true });

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
  };

  const onBack = () => {
    router.back();
    // if (postId) {
    //   q.postId = "";
    //   router.push(getQueryParamsForFeed(q), undefined, { shallow: true });
    // } else {
    //   router.back();
    // }
  };

  return {
    postId,
    onClickPost,
    onBack,
    isPosting,
    onPost,
    onCancelPost,
  };
};
