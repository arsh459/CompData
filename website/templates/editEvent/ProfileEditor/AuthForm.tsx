import { updateUserEmail } from "@models/User/updateUtils";
import { UserInterface } from "@models/User/User";
import TextEntry from "@templates/editEvent/Form/TextEntry";
import clsx from "clsx";
import { useEffect } from "react";
import { useState } from "react";

import {
  // ConfirmationResult,
  RecaptchaVerifier,
  // signInWithPhoneNumber,
} from "firebase/auth";
// import TopClose from "@templates/community/Program/Feed/TopClose";
import PhoneAuth from "@templates/apply/Form/PhoneAuth";
// import ProfileEditor from "@templates/editEvent/ProfileEditor/ProfileEditor";

interface Props {
  user: UserInterface | undefined;
  recaptcha: RecaptchaVerifier | undefined;

  brandName?: string;
}

const AuthForm: React.FC<Props> = ({
  user,
  recaptcha,

  brandName,
}) => {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    setEmail(user?.email ? user.email : "");
  }, [user?.email]);

  const onButtonPress = async (key: "email", value: string | undefined) => {
    try {
      if (key === "email" && user && typeof value === "string") {
        await updateUserEmail(user.uid, value);
      }
    } catch (error) {
      console.log("error updating value in auth form", error);
    }
  };

  return (
    <div className={clsx()}>
      {!user ? (
        <PhoneAuth
          placeholder="Enter your phone"
          recaptcha={recaptcha}
          brandName={brandName}
        />
      ) : user && !user.email ? (
        <div className={"flex justify-center"}>
          <TextEntry
            inputMode="email"
            heading="What's your email?"
            placeholder="Type here"
            helperText={`To notify you when someone joins your boat`}
            value={email}
            onChangeText={setEmail}
            buttonText="Next"
            onButtonPress={() => onButtonPress("email", email)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default AuthForm;
