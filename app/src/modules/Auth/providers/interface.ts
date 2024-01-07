// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { authP } from "../hooks/usePhoneAuth";
// import { authP } from "../hooks/usePhoneAuth";

export interface PhoneAuthContextInterface {
  // recaptchaVerifier: React.RefObject<FirebaseRecaptchaVerifierModal>;
  showMessage: (newMess: { text: string; color?: string }) => void;
  phoneNumber: string;
  verificationCode: string;
  verificationId?: FirebaseAuthTypes.ConfirmationResult;
  setVerificationId: (
    id: FirebaseAuthTypes.ConfirmationResult | undefined
  ) => void;
  message: { text: string; color?: string };
  countryCode: string;
  setCountryCode: (newCode: string) => void;
  onSignIn: () => Promise<string | undefined>;
  onAppleButtonPress: () => Promise<void>;
  onGoogleSignInPress: () => Promise<void>;
  onRequestCode: () => void;

  onUpdatePhoneNumber: (phone: string) => void;
  onUpdateVerificationCode: (code: string) => void;
  loading: boolean;
  selectedAuthProvider: authP;
  setAuthProvider: (newPr: authP) => void;
}
