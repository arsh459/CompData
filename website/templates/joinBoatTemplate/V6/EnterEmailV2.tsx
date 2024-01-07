import { useEffect, useState } from "react";
import JoinBoatWrapper from "./JoinBoatWrapper";

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

interface Props {
  email?: string;
  onEmailUpdate: (val: string) => void;
  onEmailSave: (email?: string) => void;
  progress?: number;
}

const EnterEmailV2: React.FC<Props> = ({
  email,
  onEmailUpdate,
  onEmailSave,
  progress,
}) => {
  const [errorState, setErrorState] = useState<
    "CHECKING" | "ERROR" | "VALID" | "NULL"
  >("NULL");

  useEffect(() => {
    if (email) {
      const getData = setTimeout(() => {
        if (email.length === 0) {
          setErrorState("NULL");
        } else if (emailReg.test(email) === false) {
          setErrorState("ERROR");
        } else if (emailReg.test(email) === true) {
          setErrorState("VALID");
        }
      }, 500);

      return () => clearTimeout(getData);
    }
  }, [email]);

  const handleChange = (text: string) => {
    setErrorState("CHECKING");
    onEmailUpdate(text);
  };

  return (
    <JoinBoatWrapper
      title={"Please add your email address"}
      onNext={() => onEmailSave(email)}
      progress={progress}
      disabled={errorState !== "VALID"}
    >
      <div className="p-4">
        <input
          className="w-full px-4 bg-[#232136] text-white text-lg iphoneX:text-xl border-b border-[#757575] font-baib placeholder:text-[#75757580]"
          style={{ fontFamily: "Nunito-SemiBold" }}
          value={email}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="jhon0@example.com"
          inputMode="email"
          autoCapitalize="none"
        />
        <p
          className="text-base text-red-500 p-4"
          style={{ fontFamily: "Nunito-Light" }}
        >
          {errorState === "ERROR" && "Please enter a valid email"}
        </p>
      </div>
    </JoinBoatWrapper>
  );
};

export default EnterEmailV2;
