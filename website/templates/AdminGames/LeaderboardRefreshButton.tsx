import Button from "@components/button";
import axios from "axios";
import { useState } from "react";

// import { adminGamesQuery } from "./useAdminGames";

interface Props {
  gameId: string;
}

const LeaderboardRefreshButton: React.FC<Props> = ({ gameId }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdateLeaderboard = async () => {
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
    <div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Button onClick={onUpdateLeaderboard} appearance="contained">
          Update Leaderboard
        </Button>
      )}
    </div>
  );
};

export default LeaderboardRefreshButton;
