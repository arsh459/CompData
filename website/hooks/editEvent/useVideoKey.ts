import { videoKeyVerify } from "@models/Event/checkoutCodeVerify";
import { useEffect, useState } from "react";

export const useVideoKey = (
  videoKey: string | undefined,
  id: string,
  seriesId: string
) => {
  //   const [cName, setName] = useState<string>("");
  //   const [cEmail, setEmail] = useState<string>("");
  //   const [cPhone, setPhone] = useState<string>("");
  const [keyValid, setKeyValid] = useState<boolean>(false);

  useEffect(() => {
    // console.log("in useEffect");
    const verifyTimer = setTimeout(async () => {
      try {
        // console.log("here");
        if (videoKey && seriesId) {
          //   console.log("userKey here", userKey);
          const isKeyValud = await videoKeyVerify(videoKey, id, seriesId);
          //   console.log("remote", remoteKey);

          setKeyValid(isKeyValud);
        }
      } catch (error) {
        console.log("error", error);
        setKeyValid(false);
      }
    }, 120);

    // console.log("verifyTimer", verifyTimer);

    return () => {
      if (verifyTimer) {
        clearTimeout(verifyTimer);
      }
    };
  }, [videoKey, id, seriesId]);

  return {
    keyValid,
  };
};
