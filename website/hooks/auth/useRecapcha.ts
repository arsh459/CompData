import { useEffect, useState, useRef } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "@config/firebase";
import * as Sentry from "@sentry/browser";
import { weEventTrack } from "@analytics/webengage/user/userLog";

export const useRecapcha = (needCapcha: boolean) => {
  const [recaptcha, setRecaptcha] = useState<RecaptchaVerifier>();
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // console.log("here");
      if (needCapcha && !recaptcha && element && element.current) {
        const verifier = new RecaptchaVerifier(
          auth,
          element.current,
          {
            size: "invisible",
            // badge: "inline",
            callback: () => console.log("here in capcha"),
            // "expired-callback": () => verifier.clear(),
          }
          // auth
        );

        // verifier.render();

        // console.log("verifier", verifier);

        verifier.verify().then(() => {
          setRecaptcha(verifier);
          // if (postRun) {
          //   postRun();
          // }
        });

        // return () => {
        //   if (verifier) {
        //     console.log("destroying");
        //     verifier.clear();
        //   }
        // };
      }
    } catch (error) {
      console.log("error in capcha", error);
      weEventTrack("recapchaFailed", { error: JSON.stringify(error) });
      Sentry.captureException(error);
    }
  }, [recaptcha, needCapcha]);

  return {
    recaptcha,
    element,
  };
};
