import MediaCard from "@components/MediaCard";
import { eventIcon } from "@constants/imageKitURL";
import { useGameContext } from "@providers/game/GameProvider";
import { getCurrentMonthForPurchase } from "@utils/challange/challengeWeekUtils";
import clsx from "clsx";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Text, View } from "react-native";

const dayLength = 24 * 60 * 60 * 1000;

const EventMedia = () => {
  const { game } = useGameContext();
  const { start, end } = getCurrentMonthForPurchase(
    game?.configuration?.sprints,
    game?.configuration?.starts,
    game?.configuration?.challengeLength,
    game?.configuration?.activeSprintId
  );

  const gameStarts = start ? start : game?.configuration?.starts;
  const gameEnds = end
    ? end
    : game?.configuration?.starts
    ? game?.configuration?.starts +
      (game?.configuration?.challengeLength
        ? game?.configuration?.challengeLength
        : 0) *
        dayLength
    : -1;

  const [isPaused, setIsPaused] = useState<boolean>(true);

  return (
    <View
      className={clsx(
        "flex flex-col justify-center items-center overflow-hidden relative z-0"
      )}
    >
      {game && game.media.length > 0 ? (
        <MediaCard
          media={game?.media[0]}
          thumbnail={game?.thumbnail}
          setIsPaused={setIsPaused}
        />
      ) : (
        <View className="w-full h-48 bg-black" />
      )}
      {isPaused ? (
        <LinearGradient
          colors={["transparent", "black"]}
          className="absolute bottom-0 left-0 right-0 z-10 h-16 iphoneX:h-20 flex flex-row items-end pointer-events-none px-4 iphoneX:px-6"
        >
          <View className="flex-1 flex flex-row items-center pb-2">
            <Image
              source={{ uri: eventIcon }}
              className="w-4 iphoneX:w-6 h-4 iphoneX:h-6 mr-2"
              resizeMode="contain"
            />
            {gameStarts ? (
              <Text className="text-white text-center text-sm iphoneX:text-base italic">
                Game starts{" - "}
                <Text className="font-bold whitespace-nowrap">
                  {format(new Date(gameStarts), "d MMMM h:mmaaa")}
                </Text>
                {" - "}
                <Text className="font-bold whitespace-nowrap">
                  {format(new Date(gameEnds), "d MMMM")}
                </Text>
              </Text>
            ) : (
              <Text className="text-white text-center text-xs iphoneX:text-base">
                Starts soon
              </Text>
            )}
          </View>
        </LinearGradient>
      ) : null}
    </View>
  );
};

export default EventMedia;
