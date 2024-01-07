import LoadingModal from "@components/loading/LoadingModal";
import CTA from "@templates/PaymentTemplate/CTA";
import PhoneInput from "react-phone-input-2";
import dynamic from "next/dynamic";
import "react-phone-input-2/lib/material.css";
import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import { socialboatLogoColor2 } from "@constants/icons/iconURLs";
import { usePhoneAuthCred } from "@hooks/auth/usePhoneAuthCred";

const ReactCodeInput = dynamic(import("react-code-input"));

interface Props {
  onAuthSuccess: (phoneNumber?: string) => Promise<void>;
}

const AuthScreen: React.FC<Props> = ({ onAuthSuccess }) => {
  useAuth();
  const { element, recaptcha } = useRecapcha(true);

  const {
    code,
    errorMessage,
    phoneNumber,
    setPhoneNumber,
    onAuthRequest,
    warning,
    confirmation,
    verifyCode,
    loading,
    setCode,
  } = usePhoneAuthCred(recaptcha, onAuthSuccess);

  return (
    <div className="w-full h-full max-w-sm mx-auto flex flex-col p-4">
      {loading ? (
        <LoadingModal fill="#ff735c" width={48} height={48} noBg={false} />
      ) : null}

      <div className="flex justify-center items-center">
        <img
          src={socialboatLogoColor2}
          className="w-2/3 max-w-xs aspect-1 object-contain"
          alt="socialboat logo with gradient "
        />
      </div>

      <div className="mb-10 flex flex-col">
        <p className="text-base md:text-lg my-4 font-bair text-center">
          {confirmation
            ? "Verify Code send to +91XXXXXXXXXX"
            : "Sign in to Get Your Results"}
        </p>

        {confirmation ? (
          <div className="w-max mx-auto">
            <ReactCodeInput
              name="code"
              type={undefined}
              inputMode="numeric"
              inputStyle={{
                margin: "5px",
                MozAppearance: "textfield",
                width: "40px",
                borderRadius: "8px",
                fontSize: "20px",
                fontFamily: "BaiJamjuree-Regular",
                height: "48px",
                textAlign: "center",
                backgroundColor: "#FFFFFF36",
                color: "#FFFFFF",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
              fields={6}
              value={code}
              onChange={setCode}
            />
          </div>
        ) : (
          <div className="bg-[#262630] rounded-lg px-2">
            <PhoneInput
              placeholder="+91 999 999 9999"
              country="in"
              value={phoneNumber}
              onChange={setPhoneNumber}
              containerStyle={{
                backgroundColor: "#262630",
                borderRadius: 8,
              }}
              inputStyle={{
                fontFamily: "BaiJamjuree-Regular",
                backgroundColor: "#262630",
                width: "100%",
                border: 0,
                color: "#FFFFFF",
              }}
              dropdownStyle={{
                backgroundColor: "#262630",
                color: "#F1F1F1",
              }}
              containerClass="phoneInputOnBoard"
            />
          </div>
        )}

        {warning ? <p className="pt-1 text-red-500">{errorMessage}</p> : null}
      </div>

      <div className="flex-1" />

      <CTA
        onClick={confirmation ? verifyCode : onAuthRequest}
        text={confirmation ? "Login" : "Get OTP"}
        textSize="text-base sm:text-lg lg:text-xl"
        styleStr="font-popM rounded-full"
        textColor="text-[#100F1A]"
        bgColor="bg-white"
        width="w-full px-16"
      />

      <div id="recaptcha-container" ref={element} />
    </div>
  );
};

export default AuthScreen;
