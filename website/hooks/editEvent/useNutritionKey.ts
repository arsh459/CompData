import { planKeyVerify } from "@models/Event/checkoutCodeVerify";
import { useEffect, useState } from "react";

export const useNutritionKey = (
  planKey: string | undefined,
  id: string,
  seriesId: string
) => {
  const [keyValid, setKeyValid] = useState<boolean>(false);

  useEffect(() => {
    const verifyTimer = setTimeout(async () => {
      try {
        if (planKey && seriesId) {
          const isKeyValud = await planKeyVerify(planKey, id, seriesId);

          setKeyValid(isKeyValud);
        }
      } catch (error) {
        console.log("error", error);
        setKeyValid(false);
      }
    }, 120);

    return () => {
      if (verifyTimer) {
        clearTimeout(verifyTimer);
      }
    };
  }, [planKey, id, seriesId]);

  return {
    keyValid,
  };
};
