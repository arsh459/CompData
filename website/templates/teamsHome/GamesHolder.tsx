import { useActiveGames } from "@hooks/games/useActiveGames";
import GamesCard from "./GameCard/GameCard";

interface Props {}

const GamesHolder: React.FC<Props> = ({}) => {
  const { games } = useActiveGames();
  // console.log("games", games);
  return (
    <div className="px-4 pt-4">
      {games.map((item) => {
        return (
          <div key={item.id} className="pb-4">
            <GamesCard event={item} showMembers={true} />
          </div>
        );
      })}
    </div>
  );
};

export default GamesHolder;
