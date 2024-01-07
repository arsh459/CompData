import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface CheckResponse {
  status: "success";
  proStatus: boolean;
  expiry: number;
}

export const checkStatusAsync = async (uid: string) => {
  const resp = await axios({
    url: "/api/updateMotivator/check",
    // url:
    method: "POST",
    params: {
      uid,
    },
  });

  return resp.data as CheckResponse;
};

export const usePaidStatus = (uid: string) => {
  const [expiryString, setExpiryString] = useState<string>("LOADING");
  const [status, setStatus] = useState<"LOADING" | "INACTIVE" | "ACTIVE">(
    "LOADING"
  );

  useEffect(() => {
    if (uid) {
      const getPaidStatus = async () => {
        try {
          const response = await checkStatusAsync(uid);

          const now = Date.now();
          if (response.expiry && response.expiry > now) {
            setExpiryString(
              `ACTIVE: ${format(new Date(response.expiry), "h:mma d MMM yyyy")}`
            );
            setStatus("ACTIVE");
          } else if (response.expiry && response.expiry > 0) {
            setExpiryString(
              `INACTIVE: ${format(
                new Date(response.expiry),
                "h:mma d MMM yyyy"
              )}`
            );
            setStatus("INACTIVE");
          } else if (response.expiry && response.expiry <= 0) {
            setExpiryString(`NOT PAID`);
            setStatus("INACTIVE");
          }
        } catch (error) {
          console.error(error);
        }
      };

      getPaidStatus();
    }
  }, [uid]);

  return {
    expiryString,
    status,
  };
};
