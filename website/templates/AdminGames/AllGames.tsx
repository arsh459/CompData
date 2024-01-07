import Button from "@components/button";
import { useActiveGames } from "@hooks/games/useActiveGames";
import { Link } from "@mui/material";
import axios from "axios";
import clsx from "clsx";
import { useState } from "react";

// import { adminGamesQuery } from "./useAdminGames";

interface Props {
  // urlState?: adminGamesQuery;
  // onGameChange: (id: string) => void;
}

const AllGames: React.FC<Props> = ({}) => {
  const { games } = useActiveGames();
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdateLeaderboard = async (gameId: string) => {
    setLoading(true);
    await axios({
      url: "/api/refreshLeaderboard/refreshLeaderboard",
      method: "POST",
      data: {
        gameId,
      },
    });
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 shadow-sm">
      {games.map((item) => {
        // console.log(item.name);
        return (
          <div
            onClick={() => {}}
            key={item.id}
            className={clsx(
              "font-bold",
              "border pb-4",
              // urlState?.gameId === item.id ? "font-bold" : "font-light",
              "cursor-pointer text-lg w-max py-1"
            )}
          >
            <Link href={`/admin/games/${item.id}`}>
              <p>{item.name}</p>
            </Link>

            <Link href={`/admin/games/${item.id}/rewards`}>
              <p className="text-sm text-red-500 underline font-normal">
                Send rewards
              </p>
            </Link>

            <Link href={`/admin/games/${item.id}/wod`}>
              <p className="text-sm text-red-500 underline font-normal">
                Send WOD
              </p>
            </Link>
            <Link href={`/admin/games/${item.id}/benefits`}>
              <p className="text-sm text-red-500 underline font-normal">
                Add benefits
              </p>
            </Link>

            <Link href={`/admin/games/${item.id}/players`}>
              <p className="text-sm text-red-500 underline font-normal">
                Check Players
              </p>
            </Link>

            <Link href={`/admin/games/${item.id}/sprintdetails`}>
              <p className="text-sm text-red-500 underline font-normal">
                Edit Sprint Details
              </p>
            </Link>

            <Link href={`/admin/games/${item.id}/advertisement`}>
              <p className="text-sm text-red-500 underline font-normal">
                Add advertisement
              </p>
            </Link>

            {loading ? (
              <p>Loading</p>
            ) : (
              <Button
                onClick={() => onUpdateLeaderboard(item.id)}
                appearance="contained"
              >
                Update Leaderboard
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AllGames;
