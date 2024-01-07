import Button from "@components/button";
import { usePhoneAuth } from "@hooks/auth/usePhoneAuth";
// import clsx from "clsx";

import Logo from "components/logo/index";
import PhoneInput from "react-phone-input-2";
import dynamic from "next/dynamic";
const ReactCodeInput = dynamic(import("react-code-input"));
import "react-phone-input-2/lib/material.css";
import LoadingModal from "@components/loading/LoadingModal";
import {
  // ConfirmationResult,
  RecaptchaVerifier,
  // signInWithPhoneNumber,
} from "firebase/auth";

interface Props {
  // warning: boolean;
  // text: string;
  // onValueChange: (val: string) => any;
  brandName?: string;
  recaptcha: RecaptchaVerifier | undefined;
  placeholder: string;
}

const PhoneAuth: React.FC<Props> = ({
  // warning,
  // text,
  // onValueChange,
  recaptcha,
  placeholder,
  brandName,
}) => {
  const {
    code,
    errorMessage,
    phoneNumber,
    setPhoneNumber,
    onAuthRequest,
    warning,
    confirmation,
    verifyCode,
    // capchaAbsent,
    loading,
    setCode,
  } = usePhoneAuth(recaptcha);

  // console.log("recaptcha", recaptcha);

  return (
    <div>
      {loading ? (
        <LoadingModal fill="#ff735c" width={48} height={48} noBg={false} />
      ) : null}
      {/* <div id="recaptcha-container" ref={element} /> */}
      <div className="flex flex-col items-center">
        <div>
          {!brandName ? (
            <Logo text={true} size="medium" />
          ) : (
            <div>
              <p className="text-4xl font-semibold text-center pb-1 text-gray-700">
                {brandName}
              </p>
            </div>
          )}
          <p className="pt-2 text-lg font-normal text-gray-500 text-center">
            {!brandName
              ? "Join the Real Life Game"
              : `Sign in to ${brandName}'s community`}
          </p>
        </div>
        <div className="pt-8">
          {confirmation ? (
            <div className="">
              <div>
                <p>Enter your OTP</p>
              </div>
              <ReactCodeInput
                name="code"
                type={undefined}
                inputMode="numeric"
                inputStyle={{
                  marginLeft: "0px",
                  marginTop: "5px",
                  marginBottom: "5px",
                  marginRight: "10px",
                  MozAppearance: "textfield",
                  width: "40px",
                  borderRadius: "8px",
                  fontSize: "20px",
                  height: "48px",
                  border: "1px solid",
                  paddingLeft: "7px",
                  textAlign: "center",
                  backgroundColor: "white",
                  color: "#374151",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
                fields={6}
                value={code}
                onChange={setCode}
              />
            </div>
          ) : (
            <PhoneInput
              placeholder={placeholder}
              country="in"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          )}
          {warning ? (
            <div className="pt-0.5 text-red-500">
              <p>{errorMessage}</p>
            </div>
          ) : null}
        </div>
        <div className="pt-5 w-[300px]">
          <Button
            type="button"
            appearance="contained"
            onClick={confirmation ? verifyCode : onAuthRequest}
          >
            <div className="pt-1 pb-1">
              <p className="text-lg">
                {confirmation ? "Verify code" : "Get OTP"}
              </p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhoneAuth;
