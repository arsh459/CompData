import { useEffect } from "react";

import { shallow } from "zustand/shallow";
import { useDeviceStore } from "../store";
import { getMixpanelDistinctId } from "@analytics/webengage/user/userLog";
import { useRouter } from "next/router";

export const useDeviceStoreDateInit = () => {
  const stValue = useDeviceStore((st) => {
    return {
      setIPAddress: st.setIPAddress,
      setFBParams: st.setFBParams,
      setEventURL: st.setEventURL,
      setDistinctId: st.setDistinctId,
    };
  }, shallow);

  const router = useRouter();

  useEffect(() => {
    getMixpanelDistinctId().then((id) => stValue.setDistinctId(id));
    // stValue.setAdValue();
    // stValue.setDeviceInfo();
    const fullURL = `${window.location.origin}${router.asPath}`;
    stValue.setEventURL(fullURL);

    stValue.setFBParams();
    stValue.setIPAddress();
  }, []);
};
