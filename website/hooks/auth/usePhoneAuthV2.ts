import { useState } from "react";
import {
  AuthCredential,
  // getAuth,
  ConfirmationResult,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
  //   User,
  //   UserCredential,
} from "firebase/auth";
import { auth } from "@config/firebase";

export const usePhoneAuthV2 = (recaptcha: RecaptchaVerifier | undefined) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult>();
  const [phoneCred, setPhoneCred] = useState<AuthCredential>();
  //   const [phoneUser, setPhoneUser] = useState<User>();
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
      } else {
        setWarning(true);
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

      setLoading(false);
      setWarning(true);
    }
  };

  // console.log("error", errorMessage);

  const verifyCode = async () => {
    try {
      // console.log("confirmation", confirmation, code);
      if (confirmation) {
        const authCred = PhoneAuthProvider.credential(
          confirmation.verificationId,
          code
        );

        await signInWithCredential(auth, authCred);

        setLoading(true);
        // const result = await confirmation.confirm(code);
        setPhoneCred(authCred);
        // setPhoneUser(authCred.);
        setWarning(false);
        setLoading(false);
        setErrorMessage("");
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
    // phoneUser,
  };
};
