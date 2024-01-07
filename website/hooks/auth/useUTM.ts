import { utmSourceTrack } from "@analytics/webengage/user/userLog";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useUTM = () => {
  const router = useRouter();

  const q = router.query as { utm_source?: string };

  useEffect(() => {
    q.utm_source && utmSourceTrack(q.utm_source);
  }, [q.utm_source]);
};
