import { useCallback, useRef, useState } from "react";
import { postTypes } from "@hooks/community/v2/useCommunityParamsV3";

export const useCommunityScroll = (
  postType?: postTypes,
  postId?: string,
  heading?: string
) => {
  const [headingText, setHeadingText] = useState<string>("");
  const [bgClassStr, setBgClassStr] = useState<string>("");
  const [tone, setTone] = useState<"dark">();

  const observer = useRef<IntersectionObserver | null>(null);

  const targetRef = useCallback(
    (node) => {
      if (observer.current) observer.current?.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((element) => {
            if (element.isIntersecting) {
              if (postType && !postId) {
                setTone(undefined);
                if (postType === "spotlight") {
                  setHeadingText("Spotlight");
                  setBgClassStr("bg-cover bg-center bg-spotlight");
                }
                if (postType === "announcement") {
                  setHeadingText("Announcement");
                  setBgClassStr("bg-cover bg-center bg-announcement");
                }
              } else {
                setHeadingText(heading ? heading : "");
                setBgClassStr("bg-[#F3F6F8]");
                setTone("dark");
              }
            } else {
              if (postType && !postId) {
                setTone(undefined);
                setBgClassStr("bg-transparent");
                if (postType === "spotlight") {
                  setHeadingText("Spotlight");
                }
                if (postType === "announcement") {
                  setHeadingText("Announcement");
                }
              } else {
                setHeadingText("");
                setBgClassStr("bg-[#F3F6F8]");
                setTone("dark");
              }
            }
          });
        },
        { rootMargin: "0px 0px -80% 0px" }
      );

      if (node) observer?.current.observe(node);
    },
    [postType, postId, heading, setHeadingText, setBgClassStr, setTone]
  );

  return {
    targetRef,
    headingText,
    bgClassStr,
    tone,
  };
};
