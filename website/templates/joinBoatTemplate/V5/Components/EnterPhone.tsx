import { weEventTrack } from "@analytics/webengage/user/userLog";
import { LocalUser } from "@models/User/User";
import { useState } from "react";
import PhoneInput, { CountryData } from "react-phone-input-2";
import JoinBoatWrapperV2 from "../JoinBoatWrapper";

interface Props {
  localUser?: LocalUser | undefined;
  onPhoneUpdate: (phone: string) => void;
  onUserPhoneUpdate: (phone?: string) => void;
}

const EnterPhone: React.FC<Props> = ({
  localUser,
  onPhoneUpdate,
  onUserPhoneUpdate,
}) => {
  const [countryData, setCountryDetdata] = useState<CountryData>();
  const [alertMsg, setAlertMsg] = useState<string>();

  const onNext = () => {
    if (
      !localUser?.phone?.match(
        `[0-9]{${(countryData?.format.match(/\./g) || []).length || 10}}`
      )
    ) {
      setAlertMsg("Please provide valid phone number");
    } else {
      setAlertMsg("");
      onUserPhoneUpdate(
        localUser?.phone
          ? localUser?.phone?.includes("+")
            ? localUser.phone
            : `+${localUser.phone}`
          : undefined
      );
      weEventTrack("fScanPhone_clickNext", {});
    }
  };

  const onChange = (text: string, data: {} | CountryData) => {
    onPhoneUpdate(text);
    setCountryDetdata(data as CountryData);
  };

  // console.log("lo", localUser?.phone);

  return (
    <JoinBoatWrapperV2
      headText="Introduction"
      title="What is your contact no.?"
      current={2}
      onNext={onNext}
    >
      <div className="flex flex-row items-center bg-[#262630] rounded-lg px-2">
        <PhoneInput
          placeholder="999 999 9999"
          country="in"
          value={localUser?.phone}
          onChange={(text, data) => onChange(text, data)}
          containerStyle={{ backgroundColor: "#262630", borderRadius: 8 }}
          inputStyle={{
            backgroundColor: "#262630",
            width: "100%",
            border: 0,
            color: "#FFFFFF",
          }}
          dropdownStyle={{ backgroundColor: "#262630", color: "#F1F1F1" }}
          containerClass="phoneInputOnBoard"
        />
      </div>
      {alertMsg ? <p className="p-2 text-red-500">{alertMsg}</p> : null}
    </JoinBoatWrapperV2>
  );
};

export default EnterPhone;
