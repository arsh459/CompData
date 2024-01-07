import { useState } from "react";
import {
  //   AuthCredential,
  // getAuth,
  ConfirmationResult,
  linkWithCredential,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  //   User,
  // UserCredential,
} from "firebase/auth";
import { auth } from "@config/firebase";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { checkPhoneRequest, mergeUsers } from "./checkPhoneRequest";

export const usePhoneAuthCred = (
  recaptcha: RecaptchaVerifier | undefined,
  onAuthSuccess: (phone?: string) => Promise<void>
) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult>();
  //   const [phoneCred, setPhoneCred] = useState<AuthCredential>();
  //   const [phoneUser, setPhoneUser] = useState<User>();
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [warning, setWarning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userInDb, setUserInDB] = useState<string>("");
  // const [capchaAbsent, setCacpchaStatus] = useState<boolean>(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCacpchaStatus(true);
  //   }, 2000);
  // }, []);

  //   console.log("userInDb", userInDb);

  const onAuthRequest = async () => {
    // console.log("hi I am here", recaptcha);
    try {
      if (phoneNumber.length >= 10 && recaptcha) {
        setLoading(true);
        const phoneUID = await checkPhoneRequest(`+${phoneNumber}`);
        setUserInDB(phoneUID);

        const confirm = await signInWithPhoneNumber(
          auth,
          `+${phoneNumber}`,
          recaptcha
        );
        setConfirmation(confirm);
        setWarning(false);
        setLoading(false);
        setErrorMessage("");

        weEventTrack("auth_clickGetOtp", { phone: `+${phoneNumber}` });
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

        setLoading(true);
        if (auth.currentUser && !userInDb) {
          await linkWithCredential(auth.currentUser, authCred);

          // navigate to slot selection
          await onAuthSuccess(`+${phoneNumber}`);
          // update user phone number in db
        } else if (userInDb) {
          const previousUser = auth.currentUser?.uid;
          await confirmation.confirm(code);

          // merge user specs
          await mergeUsers(userInDb, previousUser);
          await onAuthSuccess();
        }
        setLoading(false);
        setWarning(false);
        setErrorMessage("");

        weEventTrack("auth_clickVerifyCode", {});

        // const result = await confirmation.confirm(code);
        // setPhoneCred(authCred);
        // setPhoneUser(result.user);
        // setWarning(false);
        // setLoading(false);
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
      } else if (error.code === "auth/provider-already-linked") {
        await onAuthSuccess();
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        setErrorMessage("Your account already exists, Try another method");
        setConfirmation(undefined);
        setPhoneNumber("");
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
    // phoneCred,
    // phoneUser,
  };
};
