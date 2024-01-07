import axios from "axios";
import { useEffect, useState } from "react";

interface CheckResponse {
  status: "success";
  proStatus: boolean;
  expiry: number;
}

export const usePaidStatus = (uid: string) => {
  const [expiryString, setExpiryString] = useState<
    "Paid" | "Expired" | "Unpaid" | "Unknown"
  >("Unknown");

  useEffect(() => {
    if (uid) {
      const getPaidStatus = async () => {
        const resp = await axios({
          url: "https://socialboat.live/api/updateMotivator/check",
          // url:
          method: "POST",
          params: {
            uid,
          },
        });

        const response = resp.data as CheckResponse;
        const now = Date.now();
        if (response.expiry && response.expiry > now) {
          setExpiryString("Paid");
        } else if (response.expiry && response.expiry > 0) {
          setExpiryString("Expired");
        } else if (response.expiry && response.expiry <= 0) {
          setExpiryString(`Unpaid`);
        }
      };

      getPaidStatus();
    }
  }, [uid]);

  return {
    expiryString,
  };
};
