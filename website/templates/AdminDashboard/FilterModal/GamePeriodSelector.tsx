import { useCommunityEvent } from "@hooks/community/useCommunityEvent";
import { adminDashboardQuery } from "@hooks/dashboard/useAdminDashboard";
import { getQueryParamsForAdminDashboard } from "@hooks/drawer/utils";

// import { useActiveGames } from "@hooks/games/useActiveGames";
import { RoundObject, SprintObject } from "@models/Event/Event";
import clsx from "clsx";
import { useRouter } from "next/router";
import { getRoundStartTimeForId, getSprintStartTimeForId } from "./dateUtils";

interface Props {
  q: adminDashboardQuery;
  type: "round" | "season";
  onClose: () => void;
}

const GamePeriodSelector: React.FC<Props> = ({ q, onClose, type }) => {
  //   const { games } = useActiveGames();
  const { selectedEvent } = useCommunityEvent(q.game);

  const router = useRouter();

  const onPeriodChange = (el: SprintObject | RoundObject) => {
    if (type === "round") {
      q.round = el.id;
      q.season = "";

      if (selectedEvent?.configuration) {
        const rs = getRoundStartTimeForId(
          selectedEvent?.configuration?.starts,
          selectedEvent?.configuration?.rounds,
          el.id
        );

        q.dS = `${rs}`;
        q.dE = `${rs + el.length * 24 * 60 * 60 * 1000}`;
      }
    } else {
      q.season = el.id;
      q.round = "";

      if (selectedEvent?.configuration) {
        const ss = getSprintStartTimeForId(
          selectedEvent?.configuration?.starts,
          selectedEvent?.configuration?.sprints,
          el.id
        );

        q.dS = `${ss}`;
        q.dE = `${ss + el.length * 24 * 60 * 60 * 1000}`;
      }
    }

    // q.game = id;
    router.push(getQueryParamsForAdminDashboard(q), undefined, {
      shallow: true,
    });

    onClose();
  };
  return (
    <div>
      {[
        ...(selectedEvent?.configuration?.rounds && type === "round"
          ? selectedEvent?.configuration?.rounds
          : []),
        ...(selectedEvent?.configuration?.sprints && type === "season"
          ? selectedEvent?.configuration?.sprints
          : []),
      ].map((item) => {
        return (
          <div
            onClick={() => onPeriodChange(item)}
            key={item.id}
            className="py-1 cursor-pointer"
          >
            <p
              className={clsx(
                q.season === item.id || q.round === item.id
                  ? "font-bold"
                  : "font-light",
                "cursor-pointer text-lg text-center"
              )}
            >
              {item.id} | {item.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default GamePeriodSelector;
