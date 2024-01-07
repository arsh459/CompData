// import { Link } from "@mui/material";
// import { format } from "date-fns";
import { usePlayers } from "@hooks/players/usePlayers";
// import UserImage from "@templates/listing/Header/UserImage";
import Player from "./Player";

interface Props {
  gameId: string;
}

const PlayersTemplate: React.FC<Props> = ({ gameId }) => {
  const { rankMembers } = usePlayers(gameId);
  return (
    <div className="py-8 px-2">
      <div className="flex pb-4">
        <p className="text-2xl font-bold">Players in game</p>
      </div>

      <div className="flex flex-wrap">
        {rankMembers.map((item) => {
          return (
            <div
              key={item.uid}
              className="w-full md:w-1/2 lg:w-1/3 p-4 shadow-sm mb-4 border rounded-md"
            >
              <Player rank={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayersTemplate;
