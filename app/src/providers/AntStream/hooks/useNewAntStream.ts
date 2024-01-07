import {
  AntStream,
  createAntStream,
  saveAntStream,
} from "@models/AntStream/AntStream";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useEffect, useState } from "react";

export const useNewAntStream = () => {
  const [antStream, setAntStream] = useState<AntStream>();
  const { state } = useAuthContext();

  useEffect(() => {
    // if no ant stream
    const initStream = async () => {
      if (!antStream?.id && state.uid) {
        const newStream = createAntStream(state.uid);
        // save remote stream
        await saveAntStream(newStream);

        setAntStream(newStream);
      }
    };

    initStream();
  }, [antStream?.id, state.uid]);

  return {
    antStream,
  };
};
