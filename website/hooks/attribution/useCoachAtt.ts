import { useRouter } from "next/router";

export const useCoachAtt = () => {
  const router = useRouter();

  const q = router.query as {
    home?: string;
    coach?: string;
    utm_source?: string;
  };

  const finalRef = q.coach
    ? `coach=${q.coach}&utm_source=${q.utm_source ? q.utm_source : ""}`
    : "";

  return {
    coachRef: finalRef,
    coachUID: q.coach,
    utm_source: q.utm_source ? q.utm_source : "",
  };
};
