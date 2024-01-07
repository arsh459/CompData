import { useState } from "react";

export const useIsGFitPresent = () => {
  const [
    isPresent,
    // setIsPresent
  ] = useState<boolean>(false);

  // useEffect(() => {
  // if (!isPresent) GoogleFit.isAvailable(() => setIsPresent(true));
  // }, [isPresent]);

  return {
    isPresent,
  };
};
