import { useState } from "react";

export const useStepsRefresh = () => {
  const [refresh, setRefresh] = useState<number>(0);
  const [refreshState, setRefreshState] = useState<"REQUESTED" | "DONE">(
    "DONE"
  );

  const onRefresh = () => {
    setRefresh((p) => p + 1);
    setRefreshState("REQUESTED");
  };

  const onSuccess = () => setRefreshState("DONE");

  return {
    refresh,
    onRefresh,
    refreshState,
    onSuccess,
  };
};
