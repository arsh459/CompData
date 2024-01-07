import { GoogleFitOAuth, GoogleUser } from "./User";
import firestore from "@react-native-firebase/firestore";

export const createGoogleFitOAuth = (
  scopes: string[],
  serverAuthCode: string | null,
  idToken: string | null,
  user?: GoogleUser
): GoogleFitOAuth => {
  return {
    scopes,
    serverAuthCode: serverAuthCode ? serverAuthCode : "",
    idToken: idToken ? idToken : "",
    ...(user ? { user } : {}),
  };
};

export const updateGoogleFitAuth = async (
  uid: string,
  googleOAuth: GoogleFitOAuth
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ googleFit: googleOAuth });
};
