import { useUserStore } from "@providers/user/store/useUserStore";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

export const useWonAward = () => {
  const { wonId } = useUserStore((state) => {
    return {
      wonId: state.user?.unseenAwards?.length
        ? state.user?.unseenAwards[0]
        : "",

      // unseenAwards: state.user?.unseenAwards,
    };
  }, shallow);

  const navigation = useNavigation();

  useEffect(() => {
    if (wonId) {
      setTimeout(() => {
        navigation.navigate("AwardWon", { achivementId: wonId });
      }, 1000);
    }
  }, [wonId]);
};
