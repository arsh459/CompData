import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import JoinBoatWrapper from "./JoinBoatWrapper";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const emailReg = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

interface Props {
  onEmailSave: (email?: string) => void;
  onSkip: () => void;
  progress?: number;
}

const EnterEmail: React.FC<Props> = ({ onEmailSave, progress, onSkip }) => {
  // console.log("RenderTest EnterEmail");
  const [userEmail, onEmailUpdate] = useState<string>("");
  const [init, setInit] = useState<boolean>(false);
  // const [emailValidError, setEmailValidError] = useState("");
  const [errorState, setErrorState] = useState<
    "CHECKING" | "ERROR" | "VALID" | "NULL"
  >("NULL");

  const userEmailDB = useUserStore((state) => state.user?.email, shallow);

  useEffect(() => {
    if (userEmailDB && !init) {
      onEmailUpdate(userEmailDB);
      setInit(true);
    }
  }, [userEmailDB, init]);

  useEffect(() => {
    const getData = setTimeout(() => {
      try {
        weEventTrack("regexCheckCheck", { email: userEmail });
        if (userEmail.length === 0) {
          setErrorState("NULL");
          // setEmailValidError("Please enter a valid email");
        } else if (emailReg.test(userEmail) === false) {
          setErrorState("ERROR");
          // setEmailValidError("Please enter a valid email");
        } else if (emailReg.test(userEmail) === true) {
          setErrorState("VALID");
          // setEmailValidError("");
        }
      } catch (error) {
        weEventTrack("regexCheckFail", { email: userEmail });
      }
    }, 500);

    return () => clearTimeout(getData);
  }, [userEmail]);

  const handleChange = (text: string) => {
    setErrorState("CHECKING");
    onEmailUpdate(text);
  };

  return (
    <JoinBoatWrapper
      title={"Please add your email address"}
      onNext={() => onEmailSave(userEmail)}
      progress={progress}
      onSkip={onSkip}
      // disabled={!userEmail || !!emailValidError}
      disabled={errorState !== "VALID"}
    >
      <View className="p-4">
        <TextInput
          className="w-full mx-auto px-4 text-white text-lg iphoneX:text-xl border-b border-[#757575]"
          style={{ fontFamily: "Nunito-SemiBold" }}
          value={userEmail}
          onChangeText={handleChange}
          placeholder="jhon0@example.com"
          placeholderTextColor="#75757580"
          blurOnSubmit
          inputMode="email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text
          className="text-base text-red-500 p-4"
          style={{ fontFamily: "Nunito-Light" }}
        >
          {errorState === "ERROR" && "Please enter a valid email"}
        </Text>
      </View>
    </JoinBoatWrapper>
  );
};

export default EnterEmail;
