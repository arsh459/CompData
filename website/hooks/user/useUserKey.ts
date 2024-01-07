import { checkoutKeyVerify } from "@models/User/userKey";
import { useEffect, useState } from "react";

export const useUserKey = (userKey: string | undefined, uid: string) => {
  //   const [cName, setName] = useState<string>("");
  //   const [cEmail, setEmail] = useState<string>("");
  //   const [cPhone, setPhone] = useState<string>("");
  const [keyValid, setKeyValid] = useState<boolean>(false);

  useEffect(() => {
    // console.log("in useEffect");
    const verifyTimer = setTimeout(async () => {
      try {
        // console.log("here");
        if (userKey) {
          //   console.log("userKey here", userKey);
          const isKeyValud = await checkoutKeyVerify(userKey, uid);
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
  }, [userKey, uid]);

  return {
    keyValid,
  };
};
