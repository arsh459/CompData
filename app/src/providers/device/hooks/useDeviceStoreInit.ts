import { useEffect } from "react";
import { useDeviceStore } from "../useDeviceStore";
import { shallow } from "zustand/shallow";
import { useInstallId } from "./useInstallId";
import { getMixpanelDistinctId } from "@utils/analytics/webengage/userLog";

export const useDeviceStoreDateInit = () => {
  const stValue = useDeviceStore((st) => {
    return {
      setAdValue: st.setAdValue,
      setDeviceInfo: st.setDeviceInfo,
      setIPAddress: st.setIPAddress,
      setLocaleInfo: st.setLocaleInfo,
      setDistinctId: st.setDistinctId,
    };
  }, shallow);

  useInstallId();

  useEffect(() => {
    getMixpanelDistinctId().then((id) => stValue.setDistinctId(id));
    stValue.setAdValue();
    stValue.setDeviceInfo();
    stValue.setIPAddress();
    stValue.setLocaleInfo();
  }, []);
};
