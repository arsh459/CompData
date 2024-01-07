import { useRTConnection } from "@hooks/cast/useRTConnection";
import { useCast } from "@hooks/cast/useCast";
import { useEffect, useState } from "react";

export const useCastStatus = (castId?: string) => {
  const [disconnectedWarning, setWebDisconnected] = useState<boolean>(false);

  useRTConnection(castId);
  const { cast } = useCast(castId);

  useEffect(() => {
    if (cast?.webStatus === "DISCONNECTED") {
      setWebDisconnected(true);
    } else {
      setWebDisconnected(false);
    }
  }, [cast?.webStatus]);

  const onCloseWarning = () => setWebDisconnected(false);

  return {
    disconnectedWarning,
    onCloseWarning,
  };
};
