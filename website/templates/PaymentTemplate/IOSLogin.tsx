import LoadingModal from "@components/loading/LoadingModal";
import {
  //   getAuth,
  // getRedirectResult,
  OAuthProvider,
  signInWithPopup,
  // signInWithRedirect,
} from "firebase/auth";
import { auth } from "@config/firebase";
import { useState } from "react";
import CTA from "./CTA";
import AndroidLogin from "./AndroidLogin";
import { weEventTrack } from "@analytics/webengage/user/userLog";

//   const auth = getAuth();
const provider = new OAuthProvider("apple.com");

const IOSLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errorMess, setErrorMess] = useState<string>("");

  const appleAuth = async () => {
    setLoading(true);
    try {
      // await signInWithRedirect(auth, provider);

      await signInWithPopup(auth, provider);

      weEventTrack("auth_clickAppleSignIn", {});
    } catch (error: any) {
      console.log("apple login error", error);
      // const errorCode = error.code;
      const errorMessage = error.message;

      if (errorMessage === "Firebase: Error (auth/popup-closed-by-user).") {
        setErrorMess("Try again. You cancelled the sign in");
      } else if (
        errorMessage ===
        "Firebase: IdP denied access. This usually happens when user refuses to grant permission. (auth/user-cancelled)."
      ) {
        setErrorMess("Try again. Looks like you denied permissions");
      } else {
        setErrorMess(errorMessage);
      }

      // console.log("error", errorCode);
      // console.log("errorMessage", errorMessage);
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   const getResult = async () => {
  //     try {
  //       const result = await getRedirectResult(auth);
  //       if (result) {
  //         OAuthProvider.credentialFromResult(result);
  //       }
  //     } catch (error: any) {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;

  //       console.log("error", errorCode);
  //       console.log("errorMessage", errorMessage);

  //       setErrorMess(errorMessage);
  //     }
  //   };

  //   getResult();
  // }, []);

  return (
    <div className="w-full  max-w-screen-xl mx-auto flex flex-col items-center px-4">
      {loading ? (
        <LoadingModal fill="#ff735c" width={48} height={48} noBg={false} />
      ) : null}

      <AndroidLogin />

      <p className="text-lg font-semibold text-center py-12 font-baib">Or</p>

      <CTA
        text="Sign In with Apple"
        onClick={appleAuth}
        bgColor="bg-[#F1F1F1]"
        textColor="text-black"
        textSize="text-base sm:text-lg lg:text-xl"
        icon="https://ik.imagekit.io/socialboat/Vector__36__U1KvII9Y7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663593384962"
        width="px-8"
      />
      {errorMess ? (
        <div className="pt-4">
          <p className="text-red-500 text-base text-center">{errorMess}</p>
        </div>
      ) : (
        <div className="pt-4">
          <p className="text-white opacity-80 text-base text-center">
            Note: Apple sign in might not work in incognito mode
          </p>
        </div>
      )}
    </div>
  );
};

export default IOSLogin;
