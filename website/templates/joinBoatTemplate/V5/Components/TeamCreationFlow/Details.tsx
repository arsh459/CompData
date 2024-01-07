import { weEventTrack } from "@analytics/webengage/user/userLog";
import { universities } from "@constants/organization";
import { boatParamQueryV5 } from "@hooks/joinBoat/V5/useSection";
import { LocalUser } from "@models/User/User";
import { TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import PhoneInput, { CountryData } from "react-phone-input-2";

interface Props {
  localUser?: LocalUser | undefined;
  onNameUpdate: (val: string) => void;
  onOrganisationUpdate: (val: string) => void;
  onPhoneUpdate: (val: string) => void;
  onDetailsUpdate: (
    name?: string,
    organisation?: string,
    phone?: string
  ) => void;
}

const Details: React.FC<Props> = ({
  localUser,
  onNameUpdate,
  onOrganisationUpdate,
  onPhoneUpdate,
  onDetailsUpdate,
}) => {
  const [countryData, setCountryDetdata] = useState<CountryData>();
  const [alertMsg, setAlertMsg] = useState<string>();

  const onProceed = () => {
    if (
      !localUser?.phone?.match(
        `[0-9]{${(countryData?.format.match(/\./g) || []).length || 10}}`
      )
    ) {
      setAlertMsg("Please provide valid phone number");
    } else {
      onDetailsUpdate(
        localUser?.name,
        localUser?.organisation,
        localUser?.phone
          ? localUser?.phone?.includes("+")
            ? localUser.phone
            : `+${localUser.phone}`
          : undefined
      );
      weEventTrack("orgOnboardName_clickNext", {});
    }
  };

  const router = useRouter();

  const q = router.query as boatParamQueryV5;

  const onChange = (text: string, data: {} | CountryData) => {
    onPhoneUpdate(text);
    setCountryDetdata(data as CountryData);
  };

  return (
    <div className="px-4 w-full max-w-md mx-auto">
      <p className="text-2xl font-baib">{"Let's start with your name"}</p>
      <div className="h-8" />
      <div className="JoinBoatField py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"What people call you"}
          label={"Name"}
          variant="outlined"
          onChange={(newVal) => onNameUpdate(newVal.target.value)}
          value={localUser?.name}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      {q.org && universities[q.org] ? (
        <div className="JoinBoatField py-4">
          <TextField
            style={{ width: "100%" }}
            placeholder={"What is your College name"}
            label={"College Name"}
            variant="outlined"
            onChange={(newVal) => onOrganisationUpdate(newVal.target.value)}
            value={localUser?.organisation}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      ) : null}
      {!localUser?.phone ? (
        <>
          <div className="JoinBoatField py-4">
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
        </>
      ) : null}
      <div className="h-8" />
      {localUser?.name ? (
        <div className="flex justify-center items-center">
          <button
            className="bg-[#F03D5F] px-12 py-2 rounded-lg font-baim"
            onClick={onProceed}
          >
            Proceed
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Details;
