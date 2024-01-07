import { BadgeSection } from "@hooks/badges/useBadgeSections";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserContext } from "@providers/user/UserProvider";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export const useNutriTaskSection = (sectionId?: string) => {
  const { state } = useAuthContext();
  const { user } = useUserContext();
  const [nutritionSection, setNutritionSection] = useState<BadgeSection>();

  useEffect(() => {
    if (state.gameId && user?.nutritionBadgeId && sectionId) {
      const sectionRef = firestore()
        .collection("sbEvents")
        .doc(state.gameId)
        .collection("badges")
        .doc(user.nutritionBadgeId)
        .collection("badgeSections")
        .doc(sectionId);

      const unsub = sectionRef.onSnapshot((doc) => {
        const remSection = doc.data() as BadgeSection | null;
        if (remSection) {
          setNutritionSection(remSection);
        } else {
          setNutritionSection(undefined);
        }
      });

      return () => {
        if (unsub) {
          unsub();
        }
      };
    }
  }, [state.gameId, user?.nutritionBadgeId, sectionId]);

  return { nutritionSection };
};
