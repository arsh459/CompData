import crashlytics from "@react-native-firebase/crashlytics";
// import {
//   FirebaseRecaptchaVerifierModal,
//   FirebaseRecaptchaBanner,
// } from "expo-firebase-recaptcha";
import { useState } from "react";
import { Text, TextInput, View, Button, TouchableOpacity } from "react-native";
// import { NEXT_PUBLIC_FIREBASE_CONFIG } from "react-native-dotenv";
// import {
//   //   getAuth,
//   PhoneAuthProvider,
//   signInWithCredential,
// } from "firebase/auth";
// import { auth } from "@config/firebase";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

// import type { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RootStackParamList } from "@routes/MainStack";
// import { useAuth } from "@hooks/auth/useAuth";
// import HomeScreenTemplate from "@modules/HomeScreenTemplate";

// import firebase from "./config/firebase";

interface Props {}
// const configObj = JSON.parse(
// NEXT_PUBLIC_FIREBASE_CONFIG ? NEXT_PUBLIC_FIREBASE_CONFIG : "{}"
// );
// const attemptInvisibleVerification = false;

const AuthMain: React.FC<Props> = ({}) => {
  // const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationId, setVerificationId] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [message, showMessage] = useState<{ text: string; color?: string }>({
    text: "",
  });

  return (
    <View className="w-full">
      <Text className="text-4xl font-semibold text-blue-500 px-4">
        Auth Screen
      </Text>

      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={configObj}
      /> */}

      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="+1 999 999 9999"
        autoFocus
        // autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
      />

      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            // if (recaptchaVerifier.current) {
            // const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await auth().signInWithPhoneNumber(
              phoneNumber
              // recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
              text: "Verification code has been sent to your phone.",
            });
            // }
          } catch (err: any) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
            crashlytics().recordError(err);
          }
        }}
      />
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            if (verificationId) {
              await verificationId.confirm(verificationCode);
            }
            // const credential = PhoneAuthProvider.credential(
            //   verificationId,
            //   verificationCode
            // );
            // await auth().signIn(auth, credential);
            showMessage({ text: "Phone authentication successful 👍" });
          } catch (err: any) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
            crashlytics().recordError(err);
          }
        }}
      />
      {message ? (
        <TouchableOpacity
          style={
            [
              // StyleSheet.absoluteFill,
              // { backgroundColor: 0xffffffee, justifyContent: "center" },
            ]
          }
          onPress={() => showMessage({ text: "" })}
        >
          <Text
            style={{
              color: message.color || "blue",
              fontSize: 17,
              textAlign: "center",
              margin: 20,
            }}
          >
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}
      {/* {attemptInvisibleVerification ? <FirebaseRecaptchaBanner /> : null} */}
    </View>
  );
};

export default AuthMain;
