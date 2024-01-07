import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { SOCIALBOAT_GAME } from "@providers/auth/AuthProvider";
import { GameProvider } from "@providers/game/GameProvider";
import { Text, ScrollView, SafeAreaView } from "react-native";
import UniverseCard from "./UniverseCard";

interface Props {
  gameId: string;
}

const GameInvite: React.FC<Props> = ({ gameId }) => {
  return (
    <ScrollView className="flex-1 bg-[#100F1A] p-4" bounces={false}>
      <SafeAreaView>
        <GameProvider selectedGameId={gameId}>
          <UniverseCard />
        </GameProvider>
        {gameId !== TEAM_ALPHABET_GAME ? (
          <>
            <Text
              className="text-white text-xl iphoneX:text-2xl text-center my-8"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              or
            </Text>
            <GameProvider selectedGameId={SOCIALBOAT_GAME}>
              <UniverseCard />
            </GameProvider>
          </>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
};

export default GameInvite;
