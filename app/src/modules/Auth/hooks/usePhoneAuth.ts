import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import crashlytics from "@react-native-firebase/crashlytics";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { useState } from "react";
import { Platform } from "react-native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { createFBRequest } from "@utils/analytics/webengage/fb/main";
import { format } from "date-fns";
import { useDeviceStore } from "@providers/device/useDeviceStore";
import { shallow } from "zustand/shallow";

// import { Platform } from "react-native";
// import { useAuthContext } from "@providers/auth/AuthProvider";

GoogleSignin.configure({
  webClientId:
    "930903298444-67eer0239o6rd3gs0sng11quc9s0tu19.apps.googleusercontent.com",
});

export type authP = "apple" | "phone" | "undetermined";

export const usePhoneAuth = () => {
  // const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [verificationId, setVerificationId] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [message, showMessage] = useState<{ text: string; color?: string }>({
    text: "",
  });
  const [selectedAuthProvider, setAuthProvider] = useState<authP>(
    Platform.OS === "android" ? "phone" : "undetermined"
  );

  const onUpdatePhoneNumber = (text: string) => setPhoneNumber(text);
  const onUpdateVerificationCode = (text: string) => setVerificationCode(text);

  const onRequestCode = async () => {
    try {
      if (countryCode === "+91" && phoneNumber.length !== 10) {
        const err = `Mobile number should be 10 digits long`;
        showMessage({ text: err, color: "red" });

        weEventTrack("auth_requestOTPError", {
          phone: `${countryCode}${phoneNumber}`,
          errorMessage: err,
          errorCode: err,
          countryCode: countryCode,
          phoneNumber: phoneNumber,
        });

        setLoading(false);
        return;
      }

      if (phoneNumber.includes("+")) {
        const err = `Don't include + in the number.`;
        showMessage({ text: err, color: "red" });

        weEventTrack("auth_requestOTPError", {
          phone: `${countryCode}${phoneNumber}`,
          errorMessage: err,
          errorCode: err,
          countryCode: countryCode,
          phoneNumber: phoneNumber,
        });

        setLoading(false);
        return;
      }

      if (!Number.isInteger(parseInt(phoneNumber))) {
        const err = `The phone number should be a valid number`;
        showMessage({ text: err, color: "red" });

        weEventTrack("auth_requestOTPError", {
          phone: `${countryCode}${phoneNumber}`,
          errorMessage: err,
          errorCode: err,
          countryCode: countryCode,
          phoneNumber: phoneNumber,
        });

        setLoading(false);
        return;
      }

      setLoading(true);

      // if (recaptchaVerifier.current) {
      // const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await auth().signInWithPhoneNumber(
        `${countryCode}${phoneNumber}`
        // recaptchaVerifier.current
      );
      weEventTrack("auth_clickGetOtp", {
        phone: `${countryCode}${phoneNumber}`,
      });

      setVerificationId(verificationId);
      showMessage({
        text: "Verification code has been sent to your phone.",
      });
      setLoading(false);
      // }
    } catch (err: any) {
      console.log("error", err.message);
      setLoading(false);

      let errorMessage: string = "";
      if (err.message.includes(`"code":403`)) {
        errorMessage = "Cannot use OTP method on virtual device";
      } else {
        errorMessage = err.message;
      }

      // console.log("error Message", errorMessage);

      showMessage({ text: `Error: ${errorMessage}`, color: "red" });
      crashlytics().recordError(err);

      weEventTrack("auth_requestOTPError", {
        phone: `${countryCode}${phoneNumber}`,
        errorMessage: err.message,
        errorCode: err.code,
        countryCode: countryCode,
        phoneNumber: phoneNumber,
      });
    }
  };

  const data = useDeviceStore((state) => state.data, shallow);

  const onSignIn = async () => {
    try {
      // const credential = PhoneAuthProvider.credential(
      //   verificationId,
      //   verificationCode
      // );
      // await signInWithCredential(auth, credential);
      setLoading(true);
      if (verificationId) {
        const response = await verificationId.confirm(verificationCode);
        showMessage({ text: "Phone authentication successful 👍" });

        // we event
        weEventTrack("sign_in_app", {});
        if (response?.user.uid) {
          setTimeout(() => {
            createFBRequest(
              "CompleteRegistration",
              response?.user.uid,
              format(new Date(), "yyyy-MM-dd"),
              data
            );
          }, 1000);
        }

        return response?.user.uid;
      }

      // setLoading(false);
    } catch (err: any) {
      if (err.code === "auth/invalid-verification-code") {
        showMessage({
          text: "The code is incorrect. Please try again",
          color: "red",
        });
        setLoading(false);
      } else if (err.code === "auth/code-expired") {
        showMessage({ text: "The code has expired", color: "red" });
        setLoading(false);
      } else {
        showMessage({ text: `Error: ${err.message}`, color: "red" });
        setLoading(false);
      }

      crashlytics().recordError(err);
      weEventTrack("auth_verifyError", {
        errorCode: err.code,
        errorMessage: err.message,
        countryCode: countryCode,
        phoneNumber: phoneNumber,
        phone: `${countryCode}${phoneNumber}`,
      });
    }
  };

  async function onGoogleSignInPress() {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      weEventTrack("auth_clickGoogleSignIn", {});

      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      console.log("error", error);
      weEventTrack("auth_errorGoogleSignIn", {
        errorCode: error.code,
        errorMessage: error.message,
      });

      crashlytics().recordError(error);
    }
  }

  async function onAppleButtonPress() {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL],
      });

      weEventTrack("auth_clickAppleSignIn", {});

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        showMessage({
          text: "Apple Sign-In failed - no identify token returned",
          color: "red",
        });
      }

      // Create a Firebase credential from the response
      const { identityToken, nonce } = appleAuthRequestResponse;

      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce
      );

      // Sign the user in with the credential
      const resp = await auth().signInWithCredential(appleCredential);

      if (resp?.user.uid) {
        setTimeout(() => {
          createFBRequest(
            "CompleteRegistration",
            resp?.user.uid,
            format(new Date(), "yyyy-MM-dd"),
            data
          );
        }, 1000);

        weEventTrack("sign_in_app_apple", {});
      }
    } catch (error: any) {
      console.log("error", error);
      showMessage({
        text: "Apple Sign-In failed",
        color: "red",
      });
      crashlytics().recordError(error);
    }
  }

  return {
    onSignIn,
    onRequestCode,
    onUpdatePhoneNumber,
    onUpdateVerificationCode,
    phoneNumber,
    verificationCode,
    message,
    verificationId,
    setVerificationId,
    showMessage,
    countryCode,
    setCountryCode,
    loading,
    onAppleButtonPress,
    selectedAuthProvider,
    setAuthProvider,
    onGoogleSignInPress,
  };
};
