import { FlatList, Text, View } from "react-native";
import Header from "@modules/Header";
import PlusCTA from "@components/Buttons/PlusCTA";
import LineDivider from "@components/LineDivider";
import { useGameContext } from "@providers/game/GameProvider";
import { getCurrentMonth } from "@utils/challange/challengeWeekUtils";
import TeamCard from "./TeamCard";
import { useNavigation } from "@react-navigation/native";
import { useEventCoachesV2 } from "@hooks/event/useEventCoachesV2";
import { useUserContext } from "@providers/user/UserProvider";

const SelectTeamsScreen = () => {
  const navigation = useNavigation();
  const { game } = useGameContext();

  const week = "overall";
  const month = getCurrentMonth(
    game?.configuration?.sprints,
    game?.configuration?.starts,
    game?.configuration?.challengeLength
  );

  const { user } = useUserContext();

  const { rankCoaches, onNext } = useEventCoachesV2(
    game?.id,
    true,
    week,
    month,
    undefined,
    undefined,
    undefined
  );

  return (
    <>
      <Header backIcon="arrow_circle" back={false} />

      <FlatList
        data={rankCoaches}
        renderItem={({ item }) => (
          <TeamCard team={item} month={month} week={week} />
        )}
        ListHeaderComponent={
          <>
            <View className="flex justify-center items-center py-4">
              <PlusCTA
                text="Join game by yourself"
                onPress={() => {
                  user?.onboarded
                    ? navigation.navigate("JoinBoat", { section: "welcome" })
                    : navigation.navigate("Home");
                }}
              />
            </View>
            <View className="py-4 iphoneX:py-8">
              <LineDivider color="#374151" />
            </View>
            <Text className="text-center text-gray-700 font-semibold text-xl iphoneX:text-2xl iphoneX:b-4">
              Join a team
            </Text>
          </>
        }
        keyExtractor={(item) => item.uid}
        onEndReachedThreshold={0.5}
        onEndReached={onNext}
        className="flex-1 bg-white p-4"
      />
    </>
  );
};

export default SelectTeamsScreen;
