// import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState } from "react";
// import { InteractionManager } from "react-native";

export const useInteractionManager = (ms?: number) => {
  const [interactionStatus, setInteractionStatus] = useState<boolean>(false);

  useEffect(() => {
    const runInt = async () => {
      // const task = InteractionManager.runAfterInteractions(() => {
      //   setInteractionStatus(true);
      // });

      const timer = setTimeout(
        () => {
          setInteractionStatus(true);
        },
        ms ? ms : 1000
      );

      return () => {
        // task.cancel();
        clearTimeout(timer);
      };
    };

    runInt();
  }, []);

  return { interactionStatus };
};
