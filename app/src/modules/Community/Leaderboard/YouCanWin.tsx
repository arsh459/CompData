import TrophyNewCard from "@modules/ProgressState/TrophyNewCard";
import { useSprintBadges } from "@providers/badges/hooks/useSprintBadges";
import { useGameContext } from "@providers/game/GameProvider";
import { View, Text } from "react-native";

const YouCanWin = () => {
  const { params, game } = useGameContext();
  const { badges, teamBadges } = useSprintBadges(
    game?.id,
    params?.currentSprint?.id
  );

  return badges.length || teamBadges.length ? (
    <View className="flex-1 px-4">
      <Text
        className="text-[#F1F1F1] text-center py-12 iphoneX:py-16 text-xl iphoneX:text-2xl"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        Badges you can win
      </Text>

      {[...badges, ...teamBadges].map((item) => {
        return (
          <View key={item.id}>
            <TrophyNewCard
              badgeImg={item.badgeImage}
              text={item.name}
              subText={item.description}
              colorArr={item.bgLinearColors}
              textColor={item.textColor}
              subTextColor={item.subTextColor}
              layoutStyleTw="px-2 py-4 flex flex-row items-center rounded-3xl mb-4"
            />
          </View>
        );
      })}
    </View>
  ) : null;
};

export default YouCanWin;
