import { useState } from "react";
import {
  View,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import JoinBoatWrapper from "../JoinBoatWrapper";
import { CountryPicker } from "react-native-country-codes-picker";
import { LocalUser } from "@hooks/user/useLocalUserV2";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  localUser?: LocalUser | undefined;
  onPhoneUpdate: (phone: string) => void;
  onUserPhoneUpdate: (phone?: string) => void;
  backOnDone?: boolean;
}

const EnterPhone: React.FC<Props> = ({
  localUser,
  onPhoneUpdate,
  onUserPhoneUpdate,
  backOnDone,
}) => {
  const { width } = useWindowDimensions();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [alertMsg, setAlertMsg] = useState<string>();

  const onNext = () => {
    if (
      (localUser?.phone?.replace(countryCode, "").match(/[0-9]/g) || [])
        .length < 10
    ) {
      setAlertMsg("Please provide valid phone number");
    } else {
      setAlertMsg("");
      onUserPhoneUpdate(
        localUser?.phone
          ? localUser?.phone?.includes("+")
            ? localUser.phone
            : `${countryCode}${localUser.phone}`
          : undefined
      );
      weEventTrack("fScanPhone_clickNext", {});
    }
  };

  return (
    <JoinBoatWrapper
      headText="Introduction"
      title="What is your contact no.?"
      current={2}
      onNext={onNext}
      backOnDone={backOnDone}
    >
      <View className="flex flex-row items-center px-4 py-3 bg-[#262630] rounded-lg m-4">
        <TouchableOpacity onPress={() => setShow(true)}>
          <Text
            style={{
              fontSize: width > 376 ? 20 : 16,
              color: "#FFFFFF",
              textAlignVertical: "center",
            }}
          >
            {countryCode}
          </Text>
        </TouchableOpacity>
        <View className="w-3" />
        <TextInput
          placeholder="999 999 9999"
          autoFocus
          keyboardType="phone-pad"
          maxLength={10}
          onChangeText={(text) => onPhoneUpdate(text)}
          textContentType="telephoneNumber"
          placeholderTextColor="#FFFFFF80"
          style={{
            fontSize: width > 376 ? 20 : 16,
            color: "#FFFFFF",
            textAlignVertical: "center",
          }}
          value={localUser?.phone?.replace(countryCode, "")}
          className="flex-1"
          blurOnSubmit
        />
      </View>
      {alertMsg ? <Text className="px-5 text-red-500">{alertMsg}</Text> : null}
      <CountryPicker
        show={show}
        lang="en"
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
    </JoinBoatWrapper>
  );
};

export default EnterPhone;
