import { updateUserAppDetails } from "@models/User/updateUtils";
import { useEffect } from "react";
import DeviceInfo from "react-native-device-info";
import crashlytics from "@react-native-firebase/crashlytics";

export const useBuildDetails = (uid?: string) => {
  useEffect(() => {
    const getDeviceInfo = async () => {
      const buildNumber = DeviceInfo.getBuildNumber();
      const version = DeviceInfo.getVersion();
      if (uid) {
        DeviceInfo.getFirstInstallTime()
          .then((installTime) => {
            setTimeout(
              () =>
                updateUserAppDetails(
                  uid,
                  buildNumber,
                  version,
                  installTime
                ).catch((e) => {
                  crashlytics().recordError(e);
                  console.log("app install time failed");
                }),
              5000
            );
          })
          .catch(() =>
            setTimeout(() => {
              updateUserAppDetails(uid, buildNumber, version).catch((e) => {
                console.log("app device update failed");
                crashlytics().recordError(e);
              });
            }, 5000)
          );
      }
    };

    getDeviceInfo();
  }, [uid]);
};
