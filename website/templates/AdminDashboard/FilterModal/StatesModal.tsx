import { adminDashboardQuery } from "@hooks/dashboard/useAdminDashboard";
import { getQueryParamsForAdminDashboard } from "@hooks/drawer/utils";
// import { useActiveGames } from "@hooks/games/useActiveGames";
// import clsx from "clsx";

import { useRouter } from "next/router";
// import { format } from "date-fns";
// import { useEffect, useState } from "react";
import { reviewStates, reviewStatus } from "@models/Activities/Activity";
import clsx from "clsx";

interface Props {
  q?: adminDashboardQuery;
  state: string;
  onClose: () => void;
  onStateChangeOverride?: (id: reviewStatus) => void;
}

const StatesModal: React.FC<Props> = ({
  q,
  onClose,
  state,
  onStateChangeOverride,
}) => {
  const router = useRouter();

  const onStateChange = (id: reviewStatus) => {
    if (onStateChangeOverride) {
      onStateChangeOverride(id);
    } else if (q) {
      q.state = id;
      router.push(getQueryParamsForAdminDashboard(q), undefined, {
        shallow: true,
      });
    }

    onClose();
  };
  return (
    <div>
      {reviewStates.map((item) => {
        return (
          <div
            onClick={() => onStateChange(item)}
            key={item}
            className="py-1 cursor-pointer"
          >
            <p
              className={clsx(
                state === item ? "font-bold" : "font-light",
                "cursor-pointer text-lg text-center"
              )}
            >
              {item}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatesModal;
