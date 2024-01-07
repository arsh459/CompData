import { adminDashboardQuery } from "@hooks/dashboard/useAdminDashboard";
import { getQueryParamsForAdminDashboard } from "@hooks/drawer/utils";

import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { DateRange, Range } from "react-date-range";

import format from "date-fns/format";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface Props {
  q: adminDashboardQuery;
  //   onClose: () => void;
}

const now = new Date();

const DatesModal: React.FC<Props> = ({ q }) => {
  // const [values, setValues] = useState<[Date | null, Date | null]>([now, now]);
  const router = useRouter();
  const onDatesChance = (newVal: [Date | null, Date | null]) => {
    q.dS = newVal[0] ? `${newVal[0].getTime()}` : "";
    q.dE = newVal[1] ? `${newVal[1].getTime()}` : "";

    if (q.dS && q.dS === q.dE) {
      q.dE = "";
    }

    if (newVal[0] || newVal[1]) {
      q.round = "";
      q.season = "";
    }

    router.push(getQueryParamsForAdminDashboard(q), undefined, {
      shallow: true,
    });
  };
  const [range, setRange] = useState<Range[]>([]);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    setRange([
      {
        startDate: q.dS ? new Date(parseInt(q.dS)) : now,
        endDate: q.dE
          ? new Date(parseInt(q.dE))
          : q.dS
          ? new Date(parseInt(q.dS))
          : now,
        key: "selection",
      },
    ]);
  }, [q.dS, q.dE]);

  const startValue = range[0]?.startDate
    ? format(range[0].startDate, "dd/MM/yyyy")
    : null;
  const endValue = range[0]?.endDate
    ? format(range[0].endDate, "dd/MM/yyyy")
    : null;
  const inputValue =
    endValue !== startValue ? `${startValue} to ${endValue}` : `${startValue}`;
  return (
    <div className="calendarWrap">
      {range ? (
        <>
          <input
            value={inputValue}
            readOnly
            className="inputBox px-2"
            onClick={() => setOpen((open) => !open)}
          />

          <div>
            {open && (
              <DateRange
                onChange={(item) =>
                  onDatesChance([
                    item.selection.startDate ? item.selection.startDate : null,
                    item.selection.endDate ? item.selection.endDate : null,
                  ])
                }
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                // retainEndDateOnFirstSelection={true}
                ranges={range}
                months={1}
                direction="horizontal"
                className="calendarElement"
              />
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DatesModal;
