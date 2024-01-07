import { isFuture } from "date-fns";
import PeriodDayWithEdit from "./PeriodDayWithEdit";
import PeriodDayWithoutEdit from "./PeriodDayWithoutEdit";
import { useEffect, useState } from "react";
import { useCurrentPeriodStore } from "./store/periodStore";
import CalenderMounth from "@components/CustomCalender/CalenderMounth";

interface Props {
  isEditable?: boolean;
  uid?: string;
}

const PeriodCalender: React.FC<Props> = ({ isEditable, uid }) => {
  const [currMonth, setCurrMonth] = useState<Date>(new Date());

  const { prepopulateDates, prepopulateUnix } = useCurrentPeriodStore(
    (state) => ({
      prepopulateDates: state.prepolulatePeriodDates,
      prepopulateUnix: state.setUnix,
    })
  );

  useEffect(() => {
    prepopulateUnix(currMonth);

    if (isEditable && uid) {
      prepopulateDates(uid);
    }
  }, [currMonth, isEditable, uid, prepopulateDates, prepopulateUnix]);

  const dateComp = (date: Date) => {
    const isFutureDate = isFuture(date);

    return (
      <div
        className="w-full aspect-[90/80] sm:aspect-[90/60] max-h-[100px] flex flex-col justify-center items-center"
        style={{ opacity: isFutureDate ? 0.5 : 1 }}
      >
        {isEditable ? (
          <PeriodDayWithEdit
            date={date}
            textColor="#535353"
            bgColor="#FFC8E3"
          />
        ) : (
          <PeriodDayWithoutEdit date={date} textColor="#535353" />
        )}
      </div>
    );
  };

  return (
    <CalenderMounth
      dateComp={dateComp}
      curr={currMonth}
      setCurr={setCurrMonth}
      border={isEditable}
      headerColor="#E089B5"
      headerTextColor={isEditable ? "#E089B5" : "#FFFFFF"}
    />
  );
};

export default PeriodCalender;
