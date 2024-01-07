// import Header from "../Header";
// import { useAdminGames } from "./useAdminGames";

import { useBadges } from "@hooks/badges/useBadges";
import { Link } from "@mui/material";

// import GameBadges from "./GameBadges";

interface Props {
  gameId: string;
}

const BadgesList: React.FC<Props> = ({ gameId }) => {
  const { badges } = useBadges(gameId);

  return (
    <div className="p-4 flex flex-wrap">
      {badges.map((item) => {
        return (
          <div
            key={item.id}
            className="p-4 text-gray-700 min-w-[300px] border shadow-sm"
          >
            <Link href={`/admin/games/${gameId}/${item.id}`}>
              <div>
                <p className="text-lg">Name: {item.name}</p>
                <p className="text-base">Name: {item.badgeId}</p>
                <p className="text-sm font-semibold text-gray-700">
                  Priority: {item.priority}
                </p>
                <p className="text-sm">Rank str: {item.rankStart}</p>
                <p className="text-sm">Rank end: {item.rankEnd}</p>
                <p className="text-red-500 text-sm">
                  Frequency: {item.frequency}
                </p>
              </div>
            </Link>
            <div className="pt-2">
              <Link href={`/admin/games/${gameId}/${item.id}/winners`}>
                <p className="text-lg underline">Edit Winners</p>
              </Link>
              <Link href={`/admin/games/${gameId}/${item.id}/duplicate`}>
                <p className="text-lg underline">Duplicate</p>
              </Link>

              <Link
                href={`/admin/creators?gameId=${gameId}&badgeId=${item.id}`}
              >
                <p className="text-lg underline">Edit creator details</p>
              </Link>

              <Link href={`/admin/games/${gameId}/${item.id}/schedule`}>
                <p className="text-lg text-green-500 font-medium underline">
                  Task Schedule
                </p>
              </Link>

              <Link href={`/admin/games/${gameId}/${item.id}/faq`}>
                <p className="text-lg text-blue-500 font-medium underline">
                  FAQ
                </p>
              </Link>

              <Link href={`/admin/games/${gameId}/${item.id}/reviews`}>
                <p className="text-lg text-blue-500 font-medium underline">
                  Reviews
                </p>
              </Link>

              <Link href={`/admin/games/${gameId}/${item.id}/delete`}>
                <p className="text-sm pt-4 text-red-500 underline">Delete</p>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BadgesList;
