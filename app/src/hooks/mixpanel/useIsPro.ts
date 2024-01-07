import { subscriptionStatus } from "@hooks/subscription/useSubscription";

import { setProUser } from "@utils/analytics/webengage/userLog";
import { useEffect } from "react";

export const useIsPro = (status: subscriptionStatus) => {
  useEffect(() => {
    setProUser(status === "SUBSCRIBED" ? true : false);
  }, [status]);
};
