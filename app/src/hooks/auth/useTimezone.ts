import { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import TimeZone from "react-native-timezone";
import crashlytics from "@react-native-firebase/crashlytics";

export const useTimezone = (uid?: string) => {
  useEffect(() => {
    const handleTimezoneInfo = async () => {
      if (uid) {
        const dateObj = new Date();
        const offset = dateObj.getTimezoneOffset();

        const timeZone = await TimeZone.getTimeZone();

        firestore()
          .collection("users")
          .doc(uid)
          .update({
            [`recommendationConfig.timezone.offset`]: offset,
            [`recommendationConfig.timezone.tzString`]: timeZone
              ? timeZone
              : "",
          })
          .catch((e) => {
            console.log("error", e);
            crashlytics().recordError(e);
          });
      }
    };

    handleTimezoneInfo();
  }, [uid]);
};
