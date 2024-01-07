import { useUserKey } from "@hooks/user/useUserKey";
import TextEntry from "@templates/editEvent/Form/TextEntry";
// import { useState } from "react";
// import { useState } from "react"

interface Props {
  uid: string;
  userKey?: string;
  onKeyChange: (newKey: string) => void;
  onButtonPress: (newVal: string) => void;
}

const TakeHandle: React.FC<Props> = ({
  uid,
  userKey,
  onKeyChange,
  onButtonPress,
}) => {
  const { keyValid } = useUserKey(userKey, uid);

  //   console.log("leu", keyValid);

  return (
    <div>
      <TextEntry
        inputMode="text"
        heading="Claim your handle"
        placeholder="Type here"
        warning={!keyValid}
        success={keyValid && userKey ? true : false}
        helperText={
          !userKey
            ? "Enter your unique handle"
            : keyValid
            ? `*This is valid! You can start playing games with this`
            : "This handle already exists. Please try something else"
        }
        value={userKey}
        onChangeText={onKeyChange}
        buttonText={keyValid ? "Next" : ""}
        // buttonAppearance={keyValid ? "Contained"}
        leftButtonText="Back"
        // leftButtonOnPress={onBack}
        onButtonPress={() => {
          if (keyValid && userKey) {
            onButtonPress(userKey);
          }
        }}
      ></TextEntry>
    </div>
  );
};

export default TakeHandle;
