import { headerTypes } from "@modules/Header";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useGameContext } from "@providers/game/GameProvider";
// import { useNavigation } from "@react-navigation/native";
import { formatWithCommas } from "@utils/number";
import { getGamePricingHandler } from "@utils/payments/utils";
import { Pressable, ScrollView, Text, View } from "react-native";

interface Props {
  children: React.ReactNode;
  setIsTrasparent?: (val: headerTypes) => void;
}

const LockedProgramWrapper: React.FC<Props> = ({
  children,
  setIsTrasparent,
}) => {
  // const navigation = useNavigation();
  const { game } = useGameContext();
  const { state, signInRequest } = useAuthContext();

  const { cost, moneyBackDays, freeAccessDays } = getGamePricingHandler(game);

  const onPress = () => {
    if (state.status === "SUCCESS" && game?.id) {
      // navigation.navigate("InviteScreen");
    } else {
      signInRequest();
    }
  };

  return (
    <View className="flex-1 bg-black">
      <ScrollView
        className="flex-1"
        onScroll={(e) =>
          setIsTrasparent &&
          setIsTrasparent(
            e.nativeEvent.contentOffset.y <= 50 ? "overlay" : "solid"
          )
        }
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
      <View className="bg-black/20 flex flex-row p-2 iphoneX:p-4 h-16 iphoneX:h-20 border-t border-[#AFAFAF]/75">
        <View className="flex-1 flex-col flex justify-center items-center">
          <Text className="text-white font-bold text-base iphoneX:text-lg">
            {cost ? `Rs ${formatWithCommas(cost)}` : "Free"}
          </Text>
          <Text className="text-white text-sm font-medium">
            {freeAccessDays
              ? `${freeAccessDays} day Free Trial`
              : moneyBackDays
              ? `${moneyBackDays} day money back`
              : "Your Entry Bet"}
          </Text>
        </View>
        <Pressable
          className="flex-1 flex justify-center items-center bg-[#EF6275] rounded-xl"
          onPress={onPress}
        >
          <Text className="text-white font-bold text-center">
            Join The Game
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LockedProgramWrapper;
