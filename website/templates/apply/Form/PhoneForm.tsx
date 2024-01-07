import Loading from "@components/loading/Loading";
import { homeYogaProfileData } from "@constants/landing/home";
import {
  updateUserEmail,
  updateUserTextFields,
} from "@models/User/updateUtils";
import { UserInterface } from "@models/User/User";
import MobileInteractive from "@modules/Banner/MobileInteractive/MobileInteractive";
import TextEntry from "@templates/editEvent/Form/TextEntry";
import clsx from "clsx";
import { useEffect } from "react";
import { useState } from "react";
import PhoneAuth from "./PhoneAuth";
import { RecaptchaVerifier } from "firebase/auth";
import LineDivider from "@templates/editEvent/Form/SessionHolder/LineDivider";

interface Props {
  user: UserInterface | undefined;
  recaptcha: RecaptchaVerifier | undefined;
  mobileInteractive?: boolean;
  brandName?: string;
  bgSmoke?: boolean;
  onClose?: () => void;
  onFinal?: () => void;
}

// new user -> Phone -> Name -> Email -> Post an introduction post

// old user -> Phone ->

// creator -> Phone

const PhoneForm: React.FC<Props> = ({
  user,
  recaptcha,
  mobileInteractive,
  brandName,
  bgSmoke,
  onClose,
  onFinal,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [instaHandle, setInstaHandle] = useState<string>("");

  // console.log("user", user?.instagramHandle);

  useEffect(() => {
    setName(user?.name ? user.name : "");
    setEmail(user?.email ? user.email : "");
    setInstaHandle(user?.instagramHandle ? user.instagramHandle : "");
  }, [user?.name, user?.email, user?.instagramHandle]);

  const onButtonPress = async (
    key: "name" | "email" | "instaHandle",
    value: string | undefined
  ) => {
    try {
      if (key === "name" && user && typeof value === "string" && value) {
        await updateUserTextFields(user.uid, "name", value);
      } else if (
        key === "email" &&
        user &&
        typeof value === "string" &&
        value
      ) {
        await updateUserEmail(user.uid, value);
      } else if (
        key === "instaHandle" &&
        user &&
        typeof value === "string" &&
        value
      ) {
        await updateUserTextFields(user.uid, "instagramHandle", value);
        if (onFinal) {
          onFinal();
        }
      }
    } catch (error) {
      console.log("error updating value in auth form", error);
    }
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1",
        mobileInteractive
          ? " md:grid-cols-2 md:items-center"
          : "flex justify-center items-center",
        bgSmoke ? "" : "w-full h-full min-h-screen"
        // "bg-white"
        // "backdrop-filter backdrop-blur-2xl"
        // bgSmoke ? "bg-smoke-750" : "bg-gradient-to-b from-gray-50 to-gray-200"
        // "bg-gradient-to-b from-gray-50 to-gray-200"
      )}
    >
      {mobileInteractive ? (
        <div>
          <div className="hidden md:visible md:flex justify-center">
            <MobileInteractive
              screen="home"
              size="medium"
              profileProps={homeYogaProfileData}
            />
          </div>
        </div>
      ) : null}

      <div
        className={!mobileInteractive ? "flex justify-center items-center" : ""}
      >
        {!user ? (
          <div className={!mobileInteractive ? " p-10 rounded-lg " : ""}>
            <PhoneAuth
              placeholder="Enter your phone"
              recaptcha={recaptcha}
              brandName={brandName}
            />
            {onClose ? (
              <div className="pt-2">
                <LineDivider />
                <div
                  className="pt-0 flex justify-center cursor-pointer"
                  onClick={onClose}
                >
                  <p className="text-gray-500 text-sm">Stay view only</p>
                </div>
              </div>
            ) : null}
          </div>
        ) : user && !user.name ? (
          <div
            className={
              !mobileInteractive
                ? "bg-gray-50 border rounded-lg p-10 w-full"
                : "flex justify-center"
            }
          >
            <TextEntry
              inputMode="text"
              heading="What's your name?"
              placeholder="Type here"
              helperText={`Just a couple more steps`}
              value={name}
              onChangeText={setName}
              buttonText="Next"
              onButtonPress={() => onButtonPress("name", name)}
            />
          </div>
        ) : user && user.name && !user.email ? (
          <div
            className={
              !mobileInteractive
                ? "bg-gray-50 border rounded-lg p-10 w-full"
                : "flex justify-center"
            }
          >
            <TextEntry
              inputMode="email"
              heading="What's your email?"
              placeholder="Type here"
              helperText={`To notify you. We will not spam you.`}
              value={email}
              onChangeText={setEmail}
              buttonText="Next"
              onButtonPress={() => onButtonPress("email", email)}
            />
          </div>
        ) : user && user.name && user.email && !user.instagramHandle ? (
          <div
            className={
              !mobileInteractive
                ? "bg-gray-50 border rounded-lg p-10 w-full"
                : "flex justify-center"
            }
          >
            <TextEntry
              inputMode="email"
              heading="What's your Insta handle?"
              placeholder="Type here"
              helperText={`So, the coach can tag you with awards`}
              value={instaHandle}
              onChangeText={setInstaHandle}
              buttonText="Next"
              onButtonPress={() => onButtonPress("instaHandle", instaHandle)}
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneForm;
