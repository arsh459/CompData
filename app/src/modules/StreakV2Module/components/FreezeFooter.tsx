import ClickButton from "@modules/JoinBoatMainV3/components/ClickButton";
import { useStreakStore } from "@providers/streakV2/store/useStreakStoreV2";
import { purchasePowerUps } from "@providers/streakV2/utils/purchasePowerUps";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { shallow } from "zustand/shallow";

const FreezeFooter = () => {
  const { freezeCount, resestFreezeCount } = useStreakStore((state) => ({
    freezeCount: state.freezeCount,
    resestFreezeCount: () => state.setFreezCount("reset"),
  }));
  const { uid } = useUserStore(
    (state) => ({
      uid: state.user?.uid,
    }),
    shallow
  );
  const navigation = useNavigation();
  return (
    <View>
      <ClickButton
        onNext={async () => {
          await purchasePowerUps(freezeCount, "freeze", uid);
          resestFreezeCount();
          navigation.goBack();
        }}
        nextBtnText={`Refil for ${freezeCount * 10} FP`}
      />
    </View>
  );
};

export default FreezeFooter;
