import { usePhoneAuthContext } from "@modules/Auth/providers/PhoneAuthProvider";
import { CountryPicker } from "react-native-country-codes-picker";

import {
  View,
  Text,
  TextInput,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import { CountryItem } from "react-native-country-codes-picker/types/Types";
import { getCountryPhoneLength } from "./utils";
// import { weEventTrack } from "@utils/analytics/webengage/userLog";
// import { useAuthContext } from "@providers/auth/AuthProvider";

interface Props {
  onPress?: () => void;
}

const PhoneInputUI: React.FC<Props> = ({ onPress }) => {
  const { width } = useWindowDimensions();
  const [show, setShow] = useState(false);
  const [maxLength, setMaxLength] = useState<number>(10);

  const { onUpdatePhoneNumber, setCountryCode, countryCode } =
    usePhoneAuthContext();

  const onCountryPickerPress = () => {
    if (onPress) {
      onPress();
    } else {
      setShow(true);
    }
  };

  const onCountryCode = (item: CountryItem) => {
    setMaxLength(getCountryPhoneLength(item.dial_code));

    setCountryCode(item.dial_code);
    setShow(false);
  };

  const onChangeText = (item: string) => {
    if (onPress) {
      onPress();
    } else {
      onUpdatePhoneNumber(item);
    }
  };

  const onCountryPickerClose = () => setShow(false);

  return (
    <View className="mt-4 flex flex-row items-center px-2 py-2 bg-[#262630] rounded-full">
      <CountryPicker
        show={show}
        lang="en"
        onBackdropPress={onCountryPickerClose}
        pickerButtonOnPress={onCountryCode}
      />
      <TouchableOpacity
        onPress={onCountryPickerPress}
        className="rounded-full bg-[#3D3D51] p-2 px-4 flex flex-row items-center"
      >
        <Text
          style={{
            fontSize: width > 376 ? 20 : 16,
            color: "#FFFFFF",
            textAlignVertical: "center",
          }}
        >
          {countryCode}
        </Text>
        <Image
          className="w-2.5 h-2.5 object-cover ml-2"
          resizeMode="cover"
          source={{
            uri: "https://ik.imagekit.io/socialboat/Vector__21__MYUAJ1k61.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669367077962",
          }}
        />
      </TouchableOpacity>
      <View className="w-3" />

      {onPress ? (
        <TouchableOpacity onPress={onPress}>
          <Text className="text-[#FFFFFF80] text-lg">999 999 9999</Text>
        </TouchableOpacity>
      ) : (
        <TextInput
          placeholder="999 999 9999"
          keyboardType="phone-pad"
          autoFocus={false}
          maxLength={maxLength}
          onChangeText={onChangeText}
          textContentType="telephoneNumber"
          placeholderTextColor="#FFFFFF80"
          style={{
            fontSize: width > 376 ? 20 : 16,
            color: "#FFFFFF",
            textAlignVertical: "center",
          }}
          className="flex-1"
        />
      )}
    </View>
  );
};

export default PhoneInputUI;
