import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useDNContext } from "../DNProvider";
import { handleNavigation } from "./handleLink";
import { removePendingNav } from "@utils/notifications/uttils";
import { useUserStore } from "@providers/user/store/useUserStore";

export const useDNSNav = () => {
  const { uid, pendingNav } = useUserStore(({ user }) => {
    return { uid: user?.uid, pendingNav: user?.pendingNav };
  });
  const { dnResult, setDNResult } = useDNContext();
  const navigation = useNavigation();

  useEffect(() => {
    if (uid && pendingNav) {
      handleNavigation(pendingNav, navigation);

      removePendingNav(uid);
      setDNResult(undefined);
    }
  }, [uid, pendingNav]);

  useEffect(() => {
    if (dnResult && dnResult.route) {
      handleNavigation(dnResult, navigation);
      setDNResult(undefined);
    }
  }, [dnResult]);
};
