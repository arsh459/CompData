import { usePhoneAuthContext } from "@modules/Auth/providers/PhoneAuthProvider";
import { View, Text, TextInput, Button } from "react-native";

interface Props {}

const CodeInput: React.FC<Props> = ({}) => {
  const { onUpdateVerificationCode, onSignIn } = usePhoneAuthContext();

  return (
    <View>
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="123456"
        autoFocus
        onChangeText={onUpdateVerificationCode}
      />
      <Button title="Sign In" onPress={onSignIn} />
    </View>
  );
};

export default CodeInput;
