import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useIsForeground } from "@hooks/utils/useIsForeground";
import { useNetStore } from "./useNetStore";
import { shallow } from "zustand/shallow";
// import { useAppStatus } from "@hooks/cast/useAppStatus";

export const useNetConnection = () => {
  const { appStateVisible } = useIsForeground();

  const { setConnectionStatus, retry } = useNetStore(
    (state) => ({
      setConnectionStatus: state.setConnectionStatus,
      retry: state.retry,
    }),
    shallow
  );

  // useAppStatus(appStateVisible === "active" || appStateVisible === "extension");

  useEffect(() => {
    if (appStateVisible === "active") {
      const unsubscribe = NetInfo.addEventListener((state) => {
        if (state.isConnected) {
          setConnectionStatus("connected");
          if (state.type === "wifi") {
            weEventTrack("internetConnected", {
              type: state.type,
              isInternetReachable: state.isInternetReachable ? 1 : 0,
              isConnectionExpensive: state.details?.isConnectionExpensive
                ? 1
                : 0,
              linkSpeed: state.details.linkSpeed ? state.details.linkSpeed : 0,
              rxLinkSpeed: state.details.rxLinkSpeed
                ? state.details.rxLinkSpeed
                : 0,
              txLinkSpeed: state.details.txLinkSpeed
                ? state.details.txLinkSpeed
                : 0,
              strength: state.details.strength ? state.details.strength : 0,
            });
          } else if (state.type === "cellular") {
            weEventTrack("internetConnected", {
              type: state.type,
              isInternetReachable: state.isInternetReachable ? 1 : 0,
              isConnectionExpensive: state.details?.isConnectionExpensive
                ? 1
                : 0,
              cellularGeneration: state.details.cellularGeneration
                ? state.details.cellularGeneration
                : "-",
            });
          } else {
            weEventTrack("internetConnected", {
              type: state.type,
              isInternetReachable: state.isInternetReachable ? 1 : 0,
              isConnectionExpensive: state.details?.isConnectionExpensive
                ? 1
                : 0,
            });
          }
        } else {
          setConnectionStatus("disconnected");
          weEventTrack("internetDisconnected", {
            type: state.type,
            isInternetReachable: state.isInternetReachable ? 1 : 0,
            //   isConnectionExpensive: state.details. ? 1 : 0,
          });
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [appStateVisible, retry]);
};
