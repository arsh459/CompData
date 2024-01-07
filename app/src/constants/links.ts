import { Alert, Linking, Platform } from "react-native";
import crashlytics from "@react-native-firebase/crashlytics";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

export const socialmediaLinks = {
  contact: "https://api.whatsapp.com/send?phone=919958730020&text=Hi!",
  instagram: "https://www.instagram.com/socialboat.live",
  linkedin: "https://in.linkedin.com/company/socialboat-live",
  facebook: "https://www.facebook.com/socialboat.live",
};

export const femaleWellnessBitly =
  "https://chat.whatsapp.com/CnxYJav19BV4jZStm6pDRc";

export const waBaseLink =
  "https://api.whatsapp.com/send?phone=919958730020&text=";

export const phoneCall = "919958730020";

export const callUs = () => {
  let phoneNumber = phoneCall;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phoneCall}`;
  } else {
    phoneNumber = `tel:${phoneCall}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Phone number is not available");
      } else {
        weEventTrack("click_wa", {});
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => {
      console.log(err);
      crashlytics().recordError(err);
    });
};
