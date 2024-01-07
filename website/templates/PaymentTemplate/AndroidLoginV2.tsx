import PhoneInput from "react-phone-input-2";
import dynamic from "next/dynamic";
const ReactCodeInput = dynamic(import("react-code-input"));
import "react-phone-input-2/lib/material.css";
import LoadingModal from "@components/loading/LoadingModal";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import CTA from "./CTA";
import { usePhoneAuthCred } from "@hooks/auth/usePhoneAuthCred";

interface Props {
  onAuthSuccess: (phone?: string) => Promise<void>;
}

const AndroidLoginV2: React.FC<Props> = ({ onAuthSuccess }) => {
  //   const { hideRecapcha, authStatus } = useAuth();
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
    <>
      <div className="absolute inset-0 -z-10 flex justify-center items-end overflow-hidden">
        <img
          src={
            "https://ik.imagekit.io/socialboat/tr:w-1000,c-maintain_ratio,fo-auto/Screenshot_2022-09-26_at_6.03_2_-Jr7v7s_5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664528664653"
          }
          className="w-full max-w-4xl object-contain"
          alt="image of two people with doing exercise holding weight"
        />
      </div>

      <div className="h-20" />

      <div className="w-full max-w-screen-xl mx-auto flex flex-col items-center pt-8 px-4">
        {loading && !recaptcha ? (
          <LoadingModal fill="#ff735c" width={48} height={48} noBg={false} />
        ) : null}
        <div className="flex flex-col items-center">
          <h6 className="text-2xl md:text-3xl font-bold font-baib">
            {confirmation ? "Verify Code" : "Just one step to unlock SB"}
          </h6>

          <div className="py-10 flex flex-col items-center">
            <p className="text-base md:text-lg mb-4 font-bair">
              {confirmation
                ? "Code send to +91XXXXXXXXXX"
                : "Enter your phone no."}
            </p>

            {confirmation ? (
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
            ) : (
              <div className="flex flex-row items-center bg-[#262630] rounded-lg px-2">
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
                  dropdownStyle={{ backgroundColor: "#262630" }}
                  dropdownClass="text-white hover:text-gray-500"
                  containerClass="phoneInputOnBoard"
                />
              </div>
              // <PhoneInput
              //   country="in"
              //   value={phoneNumber}
              //   onChange={setPhoneNumber}
              //   disableDropdown={true}
              //   countryCodeEditable={false}
              //   inputStyle={{
              //     fontFamily: "BaiJamjuree-Regular",
              //     backgroundColor: "#42424A",
              //     border: 0,
              //     paddingTop: 14,
              //     paddingBottom: 14,
              //     paddingLeft: 14,
              //   }}
              //   containerClass="phoneInputDropdown"
              // />
            )}

            {warning ? (
              <div className="pt-1 text-red-500">
                <p>{errorMessage}</p>
              </div>
            ) : null}
          </div>
        </div>

        <CTA
          onClick={confirmation ? verifyCode : onAuthRequest}
          text={confirmation ? "Login" : "Get OTP"}
          textSize="text-base sm:text-lg lg:text-xl"
          bgColor="bg-[#F03D5F]"
          width="w-max px-16"
        />

        <div
          id="recaptcha-container"
          ref={element}
          // className={hideRecapcha ? "hidden" : ""}
        />
      </div>
    </>
  );
};

export default AndroidLoginV2;
