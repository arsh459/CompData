import { useState } from "react";
import {
  AuthCredential,
  // getAuth,
  ConfirmationResult,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  User,
  // UserCredential,
} from "firebase/auth";
import { auth } from "@config/firebase";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { createFBRequest } from "@analytics/webengage/fb/main";
import { format } from "date-fns";
import { useDeviceStore } from "@analytics/webengage/fb/store";
import { shallow } from "zustand/shallow";
import { useDeviceStoreDateInit } from "@analytics/webengage/fb/hooks/useDeviceStoreInit";

export const usePhoneAuth = (recaptcha: RecaptchaVerifier | undefined) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult>();
  const [phoneCred, setPhoneCred] = useState<AuthCredential>();
  const [phoneUser, setPhoneUser] = useState<User>();
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [warning, setWarning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [capchaAbsent, setCacpchaStatus] = useState<boolean>(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCacpchaStatus(true);
  //   }, 2000);
  // }, []);

  useDeviceStoreDateInit();

  const onAuthRequest = async () => {
    try {
      if (phoneNumber.length >= 10 && recaptcha) {
        setLoading(true);
        const confirm = await signInWithPhoneNumber(
          auth,
          `+${phoneNumber}`,
          recaptcha
        );
        setConfirmation(confirm);
        setWarning(false);
        setLoading(false);
        setErrorMessage("");

        weEventTrack("auth_clickGetOtp", {
          phone: `+${phoneNumber}`,
        });
      } else {
        setWarning(true);
        if (phoneNumber.length < 10) {
          setErrorMessage("The number has less than 10 digits");

          weEventTrack("authError_requestCode", {
            code: "invalid phone",
            phone: `+${phoneNumber}`,
          });
        } else if (!recaptcha) {
          weEventTrack("authError_requestCode", {
            code: "No recpacha",
            phone: `+${phoneNumber}`,
          });
          setErrorMessage(
            "This browser blocked our verifier. Can you retry on Chrome?"
          );
        }
      }
    } catch (error: any) {
      console.log("error code", error.code);
      if (error.message.includes("Hostname")) {
        setErrorMessage("This is a temporary issue");
      } else if (error.code === "auth/captcha-check-failed") {
        setErrorMessage("Recapcha has failed. Please refresh");
      } else if (error.code === "auth/invalid-phone-number") {
        setErrorMessage("Please enter a valid phone");
      } else if (error.code === "auth/invalid-verification-code") {
        setErrorMessage("The code is incorrect. Please try again");
      } else {
        setErrorMessage(error.code);
      }

      weEventTrack("authError_requestCode", {
        code: error.code,
        phone: `+${phoneNumber}`,
      });

      setLoading(false);
      setWarning(true);
    }
  };

  // console.log("error", errorMessage);
  const data = useDeviceStore((state) => state.data, shallow);

  const verifyCode = async () => {
    try {
      // console.log("confirmation", confirmation, code);
      if (confirmation) {
        const authCred = PhoneAuthProvider.credential(
          confirmation.verificationId,
          code
        );

        setLoading(true);
        const result = await confirmation.confirm(code);
        setPhoneCred(authCred);
        setPhoneUser(result.user);
        setWarning(false);
        setLoading(false);
        setErrorMessage("");

        // send auth event
        createFBRequest(
          "CompleteRegistration",
          result.user.uid,
          format(new Date(), "yyyy-MM-dd"),
          data
        ).catch((e) => console.log("error in registration call"));

        weEventTrack("sign_in_web", {});
        weEventTrack("auth_clickVerifyCode", {});
      }
    } catch (error: any) {
      setWarning(true);
      setLoading(false);
      setCode("");

      if (error.code === "auth/invalid-verification-code") {
        setErrorMessage("The code is incorrect. Please try again");
      } else if (error.code === "auth/code-expired") {
        setErrorMessage("The code has expired");
        setConfirmation(undefined);
      } else {
        setErrorMessage(error.code);
      }
      console.log("error in verify", error.code);
    }
  };

  return {
    onAuthRequest,
    verifyCode,
    // capchaAbsent,
    phoneNumber,
    setPhoneNumber,
    errorMessage,
    code,
    setCode,
    warning,
    confirmation,
    loading,
    phoneCred,
    phoneUser,
  };
};
