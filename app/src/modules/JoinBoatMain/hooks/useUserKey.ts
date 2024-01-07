import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
import { checkoutKeyVerify } from "../utils/userKey";

export const useUserKey = (userKey: string | undefined, uid: string) => {
  //   const [cName, setName] = useState<string>("");
  //   const [cEmail, setEmail] = useState<string>("");
  //   const [cPhone, setPhone] = useState<string>("");
  const [keyValid, setKeyValid] = useState<boolean>(false);

  useEffect(() => {
    const verifyTimer = setTimeout(async () => {
      try {
        if (userKey) {
          const isKeyValud = await checkoutKeyVerify(userKey, uid);

          setKeyValid(isKeyValud);
        }
      } catch (error: any) {
        console.log("error", error);
        setKeyValid(false);
        crashlytics().recordError(error);
      }
    }, 120);

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
