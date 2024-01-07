import MediaCard from "@components/MediaCard";
import { LinearGradient } from "expo-linear-gradient";
import InfoBtn from "@components/Buttons/InfoBtn";
import ChallengeEnds from "./ChallengeEnds";
import clsx from "clsx";
import { View } from "react-native";
import { EventInterface } from "@models/Event/Event";
import GameDetais from "./GameDetails";
import { useNavigation } from "@react-navigation/native";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
import { useJoinStatus } from "@providers/team/hooks/useJoinStatus";
import { useUserContext } from "@providers/user/UserProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";

interface Props {
  game: EventInterface;
  event?: EventInterface;
  maxHeight: number;
  paddingX: number;
  marginY?: string;
}

const GameCard: React.FC<Props> = ({
  game,
  event,
  maxHeight,
  paddingX,
  marginY,
}) => {
  const { user } = useUserContext();
  const { state } = useAuthContext();
  const navigation = useNavigation();
  const { leader } = useLeaderboard(event?.ownerUID);
  const { isMember } = useJoinStatus(event, user, state.status);

  return (
    <View
      className={clsx(
        marginY,
        "flex justify-center items-center rounded-2xl overflow-hidden relative z-0"
      )}
      style={{ marginHorizontal: paddingX }}
    >
      <MediaCard
        media={game.media[0]}
        thumbnail={game.thumbnail}
        maxHeight={maxHeight}
        notPlayable={true}
      />
      <LinearGradient
        className={clsx(
          "absolute left-0 right-0 top-0 z-10 p-2.5",
          "flex flex-row justify-between items-start"
        )}
        colors={["black", "transparent"]}
      >
        <InfoBtn
          onPress={() =>
            navigation.navigate("GameLanding", { gameId: game.id })
          }
        />
        <ChallengeEnds parentEvent={game} />
      </LinearGradient>
      <LinearGradient
        className="absolute left-0 right-0 bottom-0 z-10 p-2.5"
        colors={["black", "transparent"]}
        start={[0.5, 1]}
        end={[0.5, 0]}
      >
        <GameDetais
          event={event}
          parentEvent={game}
          leader={leader}
          isMember={isMember}
        />
      </LinearGradient>
    </View>
  );
};

export default GameCard;
