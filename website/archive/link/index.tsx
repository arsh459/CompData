// import Header from "../../components/header";
import clsx from "clsx";
// import FooterV2 from "@modules/footer/Footer";
import DefaultLayout from "@layouts/DefaultLayout";
import { useState } from "react";
// import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
// import PhoneAuth from "@templates/apply/Form/PhoneAuth";
import {
  getAuth,
  signInWithPopup,
  OAuthProvider,
  // PhoneAuthProvider,
  // getRedirectResult,
  // signInWithCredential,
  // linkWithCredential,
  linkWithPopup,
  User,
  OAuthCredential,
  deleteUser,
} from "firebase/auth";
// import { useUser } from "@hooks/auth/useUser";
// import Button from "@components/button";
import { usePhoneAuth } from "@hooks/auth/usePhoneAuth";
import PhoneAuthV2 from "@templates/apply/Form/PhoneAuthV2";
import { seoData } from "@constants/seoData";

const auth = getAuth();

const provider = new OAuthProvider("apple.com");
// import BoatsTemplate from "@templates/boats/boatsTemplate";
// import { useAuth } from "@hooks/auth/useAuth";

interface Props {
  // leaders: LeaderBoard[];
}
const LinkAccount: React.FC<Props> = () => {
  // const { authUser, authStatus } = useAuth();
  const [state, setState] = useState<"phone" | "apple" | "link" | "success">(
    "apple"
  );
  const { element, recaptcha } = useRecapcha(true);

  const {
    phoneCred,
    phoneUser,
    onAuthRequest,
    phoneNumber,
    confirmation,
    code,
    setCode,
    setPhoneNumber,
    warning,
    errorMessage,
    verifyCode,
    loading,
  } = usePhoneAuth(recaptcha);

  const [appleUser, setAppleUser] = useState<User>();
  const [appleCredential, setAppleCredential] =
    useState<OAuthCredential | null>(null);

  //
  // console.log("a", authUser);
  const appleAuth = async () => {
    const result = await signInWithPopup(auth, provider);
    const appleCred = OAuthProvider.credentialFromResult(result);

    setAppleUser(result.user);
    setAppleCredential(appleCred);

    setState("phone");
  };

  const onFinalPhoneAuthRequest = async () => {
    await verifyCode();
    setState("link");
  };

  // console.log("appleUser", appleUser);
  // console.log("phoneCred", phoneCred);

  const linkAppleToPhone = async () => {
    try {
      if (appleUser && appleCredential && phoneCred) {
        // PhoneAuthProvider.credential(confirmation?.verificationId, code);
        if (phoneUser) {
          // delete apple user
          await deleteUser(appleUser);
          await linkWithPopup(phoneUser, provider);
          setState("success");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <DefaultLayout
      title={seoData.linkPage.title}
      description={seoData.linkPage.description}
      link={seoData.linkPage.link}
      canonical={seoData.linkPage.link}
      img={seoData.linkPage.img}
      noIndex={false}
    >
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div
          className={clsx(
            "w-screen h-screen",
            "max-w-screen-xl mx-auto",
            "flex justify-center items-center"
          )}
        >
          {state === "phone" ? (
            <div>
              <PhoneAuthV2
                phoneNumber={phoneNumber}
                code={code}
                brandName=""
                placeholder=""
                confirmation={confirmation}
                verifyCode={onFinalPhoneAuthRequest}
                setPhoneNumber={setPhoneNumber}
                onAuthRequest={onAuthRequest}
                setCode={setCode}
                warning={warning}
                errorMessage={errorMessage}
                loading={loading}
              />
            </div>
          ) : state === "apple" ? (
            <div>
              <h1 className="text-2xl text-center font-bold py-4">
                Link your Apple Account
              </h1>
              <div className="w-[320px]">
                <div className="cursor-pointer" onClick={appleAuth}>
                  <img
                    src="https://ik.imagekit.io/socialboat/apple_BIxm9bGjR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661777910749"
                    className="w-full h-full object-cover"
                    alt="sign up with apple"
                  />
                </div>
              </div>
            </div>
          ) : state === "link" ? (
            <div className="w-[320px]">
              <h1 className="text-2xl text-center font-bold py-4">
                Link your Apple Account
              </h1>
              <div className="cursor-pointer" onClick={linkAppleToPhone}>
                <img
                  src="https://ik.imagekit.io/socialboat/apple_BIxm9bGjR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661777910749"
                  className="w-full h-full object-cover"
                  alt="sign up with apple"
                />
              </div>
            </div>
          ) : state === "success" ? (
            <div>
              <h1 className="text-2xl text-gray-700 text-center font-medium">
                Your account is successfully linked
              </h1>
              <p className="text-base text-center pt-2">
                Please sign out and sign in again to see your previous data
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <div
        id="recaptcha-container"
        ref={element}
        // className={authStatus !== "FAILED" ? "hidden" : ""}
      />
    </DefaultLayout>
  );
};

export default LinkAccount;
