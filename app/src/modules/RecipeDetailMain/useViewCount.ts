import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useEffect } from "react";

export const useViewCount = (type: "recipe" | "reel", taskName?: string) => {
  useEffect(() => {
    if (type === "recipe" && taskName) {
      weEventTrack("recipeOpen", { taskName });
    } else if (type === "reel" && taskName) {
      weEventTrack("reelOpen", { taskName });
    }
  }, [taskName, type]);
};
