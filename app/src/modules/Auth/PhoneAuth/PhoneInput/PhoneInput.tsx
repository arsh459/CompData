import { usePhoneAuthContext } from "@modules/Auth/providers/PhoneAuthProvider";
import { View, Text, TextInput, Button } from "react-native";

interface Props {}

const PhoneInput: React.FC<Props> = ({}) => {
  const {
    onUpdatePhoneNumber,
    phoneNumber,
    // countryCode,
    // setCountryCode,
    onRequestCode,
  } = usePhoneAuthContext();

  return (
    <View>
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="+1 999 999 9999"
        autoFocus
        // autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={onUpdatePhoneNumber}
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={onRequestCode}
      />
    </View>
  );
};

export default PhoneInput;
