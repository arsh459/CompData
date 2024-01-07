import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import React, { useRef } from "react";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import clsx from "clsx";

type targetTypes =
  | "intro"
  | "transform"
  | "goal"
  | "rewards"
  | "HTP1"
  | "HTP2"
  | "HTP3";

interface Props {
  target: targetTypes;
}

const Section: React.FC<Props> = ({ target, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.75 });
  const flagHTP: boolean =
    target === "HTP1" || target === "HTP2" || target === "HTP3";

  if (entry?.isIntersecting) {
    weEventTrack("game_scroll_down", { section: target });
  }

  return (
    <div
      ref={ref}
      className={clsx(
        "flex flex-col transition-opacity duration-500",
        flagHTP && "flex-1"
      )}
    >
      {/* {target !== "intro" ? <div className="h-16 iphoneX:h-20" /> : null} */}
      <div className="flex-1 flex flex-col">{children}</div>
      {/* <div className="h-16 iphoneX:h-20" /> */}
    </div>
  );
};

export default Section;
