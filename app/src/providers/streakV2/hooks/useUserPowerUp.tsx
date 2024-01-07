import { useEffect } from "react";
import { PowerUpType, PowerUpVariantsType } from "../interface";
import firestore from "@react-native-firebase/firestore";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const useUserPowerUp = (
  powerUpVariant: PowerUpVariantsType,
  setterFunc?: (data: PowerUpType[]) => void
) => {
  const { uid } = useUserStore((state) => ({ uid: state.user?.uid }), shallow);
  useEffect(() => {

    const powerUpSnapShot = firestore()
      .collection(`users/${uid}/powerup`)
      .where("type", "==", powerUpVariant)
      .where("status", "==", "available")
      .onSnapshot((docs) => {
        if (docs && docs.docs.length) {
          const tempPowerUpData = [] as PowerUpType[];

          for (const power of docs.docs) {
            const powerItemData = power.data() as PowerUpType;
            tempPowerUpData.push(powerItemData);
          }
          // console.log(tempPowerUpData);
          setterFunc && setterFunc(tempPowerUpData);
        }else {setterFunc && setterFunc([])}
      });

    return () => powerUpSnapShot();
  }, []);
};

export default useUserPowerUp;
