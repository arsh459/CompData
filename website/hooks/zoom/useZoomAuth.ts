import { AuthTokenResponse } from "@utils/zoom/zoomToken";
import { useRouter } from "next/router";
// import { AuthTokenResponse } from "pages/api/zoom/utils/zoomToken";
import { useEffect, useState } from "react";
import {
  internalRefreshZoomAccessToken,
  internalRequestZoomAccessToken,
} from "./authUtils";
import { redirectAfterAuthQuery } from "./interface/redirectAfterAuthorization";

export const useZoomAuth = () => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState<AuthTokenResponse | undefined>();

  useEffect(() => {
    const getToken = async () => {
      if (router.isReady) {
        const q = router.query as redirectAfterAuthQuery;

        // if no auth code
        if (!authToken?.refresh_token && q.code) {
          try {
            const res = await internalRequestZoomAccessToken(q.code);
            // console.log("res", res);
            if (res) {
              setAuthToken(res);
            }
          } catch (error) {
            router.push("/apply");
          }
        }

        // if auth code is there
        else if (authToken?.refresh_token && q.code) {
          const refreshTimer = setTimeout(async () => {
            try {
              // console.log("refreshing");
              const res = await internalRefreshZoomAccessToken(
                authToken.refresh_token
              );
              if (res) {
                setAuthToken(res);
              }
            } catch (error) {
              router.push("/apply");
            }
          }, 3500 * 1000);
          return refreshTimer;
        }
      }
    };

    const timer = getToken();

    return () => {
      timer.then((timerEl) => {
        if (timerEl) {
          console.log("timer destroyed");
          clearTimeout(timerEl);
        }
      });
    };
  }, [router.isReady, router.query, authToken?.refresh_token]);

  return {
    authToken,
  };
};
