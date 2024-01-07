import { Text, View } from "react-native";
import Swiper from "@components/Swiper";
import { Dimensions } from "react-native";
import GameCard from "./GameCard";
import { useState } from "react";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { EventInterface } from "@models/Event/Event";

const { width: WIDTH } = Dimensions.get("window");

interface Props {
  games: EventInterface[];
  gameTeams: { [gameId: string]: EventInterface };
  vertical?: boolean;
}

const GamesContainer: React.FC<Props> = ({ games, gameTeams, vertical }) => {
  const { state } = useAuthContext();
  const [boxWidth, setBoxWidth] = useState<number>(0);

  return (
    <>
      <Text className="px-4 pb-2 text-xl iphoneX:text-2xl font-semibold">
        {state.status === "SUCCESS" ? "Fitness Games" : "Discover Games"}
      </Text>
      <View
        className="bg-[#ECECEC]"
        onLayout={(e) => setBoxWidth(e.nativeEvent.layout.width)}
        style={{ paddingVertical: boxWidth * 0.02 }}
      >
        {state.status === "SUCCESS" && !vertical ? (
          <Swiper
            pagination={true}
            slideWidth={WIDTH}
            centered={true}
            dotColor="#828282"
            dotWidth={boxWidth * 0.1}
            dotHeight={boxWidth * 0.02}
            paginationTopSpace={boxWidth * 0.02}
          >
            {games.map((item) => (
              <GameCard
                key={item.id}
                game={item}
                event={gameTeams[item.id]}
                maxHeight={boxWidth * 0.75}
                paddingX={boxWidth * 0.02}
              />
            ))}
          </Swiper>
        ) : (
          <>
            {games.map((item) => (
              <GameCard
                key={item.id}
                game={item}
                event={gameTeams[item.id]}
                maxHeight={boxWidth * 0.75}
                paddingX={boxWidth * 0.02}
                marginY="my-2"
              />
            ))}
          </>
        )}
      </View>
    </>
  );
};

export default GamesContainer;
