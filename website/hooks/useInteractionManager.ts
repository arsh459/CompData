import { useEffect, useState } from "react";

export const useInteractionManager = (ms?: number) => {
  const [interactionStatus, setInteractionStatus] = useState<boolean>(false);

  useEffect(() => {
    const runInt = async () => {
      const timer = setTimeout(
        () => {
          setInteractionStatus(true);
        },
        ms ? ms : 1000
      );

      return () => {
        clearTimeout(timer);
      };
    };

    runInt();
  }, [ms]);

  return { interactionStatus };
};
