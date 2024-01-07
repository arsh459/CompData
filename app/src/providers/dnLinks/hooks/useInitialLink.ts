// import { useIsForeground } from "@hooks/utils/useIsForeground";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DNParseResult, handleDNLink } from "./handleLink";
// import { useNavigation } from "@react-navigation/native";

export const useBackgroundLinks = (
  setDNResult: Dispatch<SetStateAction<DNParseResult | undefined>>
) => {
  //   const { appStateVisible } = useIsForeground();
  const [checkState, setCheckState] = useState<boolean>(true);

  // const navigation = useNavigation();

  useEffect(() => {
    const handleInitialLink = async () => {
      const initialLink = await dynamicLinks().getInitialLink();

      if (initialLink) {
        const resp = handleDNLink(initialLink);

        setDNResult(resp);
        // setTimeout(() => handleNavigation(resp, navigation), 200);
      }
    };

    if (checkState) {
      handleInitialLink();
      setCheckState(false);
    }
  }, [checkState]);
};
