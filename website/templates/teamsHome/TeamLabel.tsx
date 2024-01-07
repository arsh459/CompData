import {
  CHALLENGE_ONE,
  FAT_BURNER_CHALLENGE,
  FAT_BURNER_GAME,
  TEAM_ALPHABET_GAME,
  STUDENT_OLYMPICS,
  WFH_CHALLENGE,
  WOMENS_GAME,
  HEADSTART_GAME,
  BURPEE_GAME,
  GURGAON_FIT,
} from "@constants/gameStats";

interface Props {
  gameId: string;
}

const TeamLabel: React.FC<Props> = ({ gameId }) => {
  return (
    <div>
      <div>
        <p className="text-base font-mont text-gray-700">
          {gameId === FAT_BURNER_GAME
            ? "The Infinity Wars"
            : gameId === WFH_CHALLENGE
            ? "WFH Challenge"
            : gameId === CHALLENGE_ONE
            ? "5k Calories Challenge"
            : gameId === FAT_BURNER_CHALLENGE
            ? "Fat Burner Challenge"
            : gameId === WOMENS_GAME
            ? "The SuperWoman Game"
            : gameId === TEAM_ALPHABET_GAME
            ? "Fittest Startup Game"
            : gameId === STUDENT_OLYMPICS
            ? "Student Olympics"
            : gameId === HEADSTART_GAME
            ? "Headstart Game"
            : gameId === BURPEE_GAME
            ? "Burpee Game"
            : gameId === GURGAON_FIT
            ? "GURGAON_FIT"
            : ""}
        </p>
      </div>
    </div>
  );
};

export default TeamLabel;
