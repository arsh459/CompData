import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useCTA = () => {
  const router = useRouter();

  const { view } = router.query as { view?: string };

  const [ctaHidden, setCTAVisible] = useState<boolean>(false);
  useEffect(() => {
    setCTAVisible(view ? true : false);
  }, [view]);

  return {
    ctaHidden,
  };
};
