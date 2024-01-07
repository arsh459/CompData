import Swiper from "@components/Swiper";
import { iPhoneX } from "@constants/screen";
import { EventInterface } from "@models/Event/Event";
import { Task } from "@models/Tasks/Task";
import { useNavigation } from "@react-navigation/native";
import { getGameNameReadable } from "@utils/challange/utils";
import { View, Text, Pressable, useWindowDimensions } from "react-native";
import SuggestedTaskCard from "./SuggestedTaskCard";

interface Props {
  suggestedTasks: Task[];
  gameTeams: { [gameId: string]: EventInterface };
}

const SuggestedTasksContainer: React.FC<Props> = ({
  suggestedTasks,
  gameTeams,
}) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <>
      {suggestedTasks.length ? (
        <View>
          <Text className="px-4 pb-2 text-xl iphoneX:text-2xl font-semibold">
            Workouts for you
          </Text>
          <Swiper
            slideWidth={width > iPhoneX ? 200 : 180}
            marginX={10}
            spaceBetween={10}
          >
            {suggestedTasks.map((item) => {
              const gameId = item?.games?.length ? item.games[0] : "";
              return (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    navigation.navigate("Workout", {
                      badgeId: item.badgeId ? item.badgeId : "",
                      // gameId: gameId,
                      // teamId: gameTeams[gameId]?.id,
                    })
                  }
                >
                  <SuggestedTaskCard
                    task={item}
                    challengeName={getGameNameReadable(gameId)}
                    maxHeight={width > iPhoneX ? 300 : 260}
                  />
                </Pressable>
              );
            })}
          </Swiper>
        </View>
      ) : null}
    </>
  );
};

export default SuggestedTasksContainer;
