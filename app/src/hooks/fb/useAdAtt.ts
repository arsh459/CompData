import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { AppLink, Settings } from "react-native-fbsdk-next";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import {
  setUserAdLink,
  weEventTrack,
} from "@utils/analytics/webengage/userLog";
import { useIsForeground } from "@hooks/utils/useIsForeground";
import { useDeviceStore } from "@providers/device/useDeviceStore";
import { shallow } from "zustand/shallow";

const fbsdkInit = (bool: boolean) => {
  if (bool) {
    Settings.setAdvertiserTrackingEnabled(bool).then(() => {
      Settings.initializeSDK();
      Settings.setAutoLogAppEventsEnabled(true);
      Settings.setAdvertiserIDCollectionEnabled(true);
      //   AppLink.fetchDeferredAppLink().then((link) =>
      //   );
    });
  } else {
    Settings.initializeSDK();
    Settings.setAutoLogAppEventsEnabled(true);

    // AppLink.fetchDeferredAppLink().then((link) => console.log("Link 2", link));
  }
};

const handleIOSPermissions = async (
  setAdvertisingEnabled: (adEnabled?: 1 | 0, userAllowed?: 1 | 0) => void
) => {
  const ATT_CHECK = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);

  console.log("ATT_CHECK", ATT_CHECK);
  weEventTrack("track_checkIOSPermissions", { status: ATT_CHECK });

  if (ATT_CHECK === RESULTS.DENIED) {
    const r = await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    weEventTrack("track_checkIOSPermissions", { status: r });

    if (r === "granted" || r === "unavailable") {
      setAdvertisingEnabled(1, 1);
    } else {
      setAdvertisingEnabled(1, 0);
    }

    fbsdkInit(true);
  } else {
    if (ATT_CHECK === "granted" || ATT_CHECK === "unavailable") {
      setAdvertisingEnabled(1, 1);
    } else {
      setAdvertisingEnabled(1, 0);
    }

    fbsdkInit(true);
  }
};

// const { appStateVisible } = useIsForeground();

export const useAdAtt = () => {
  const [init, setInit] = useState<boolean>(false);
  const { appStateVisible } = useIsForeground();

  const { setAdvertisingEnabled, setEventURL } = useDeviceStore(
    (state) => ({
      setAdvertisingEnabled: state.setAdvertisingEnabled,
      setEventURL: state.setEventURL,
    }),
    shallow
  );

  useEffect(() => {
    const handleAtt = async () => {
      let lk: string | null = "";
      if (Platform.OS === "ios" && Number(Platform.Version) > 14) {
        await handleIOSPermissions(setAdvertisingEnabled);
        lk = await AppLink.fetchDeferredAppLink();
      } else {
        fbsdkInit(true);
        setAdvertisingEnabled(1, 1);
        lk = await AppLink.fetchDeferredAppLink();
      }

      if (lk) {
        setEventURL(lk);
        setUserAdLink(lk);
      }
    };

    if (appStateVisible === "active" && !init) {
      handleAtt();
      setInit(true);
    }
  }, [appStateVisible, init]);

  return {};
};
