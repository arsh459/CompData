import { adminDashboardQuery } from "@hooks/dashboard/useAdminDashboard";
import { getQueryParamsForAdminDashboard } from "@hooks/drawer/utils";
import { useActiveGames } from "@hooks/games/useActiveGames";
import clsx from "clsx";
import { useRouter } from "next/router";

interface Props {
  q: adminDashboardQuery;
  onClose: () => void;
}

const GameModal: React.FC<Props> = ({ q, onClose }) => {
  const { games } = useActiveGames();
  const router = useRouter();

  const onGameChance = (id: string) => {
    q.game = id;
    router.push(getQueryParamsForAdminDashboard(q), undefined, {
      shallow: true,
    });

    onClose();
  };
  return (
    <div>
      {games.map((item) => {
        return (
          <div
            onClick={() => onGameChance(item.id)}
            key={item.id}
            className="py-1 cursor-pointer"
          >
            <p
              className={clsx(
                q.game === item.id ? "font-bold" : "font-light",
                "cursor-pointer text-lg text-center"
              )}
            >
              {item.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default GameModal;
