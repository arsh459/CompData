import { oneDayMS } from "@models/slots/utils";
import DateModal from "@templates/Recommendations/DateModal";
import { useCalendar } from "@templates/Recommendations/hooks/useCalendar";
import { format } from "date-fns";
import DailyCard from "./DailyCard";
import { useDailyGoals } from "./hooks/useDailyGoals";
import { useDailySteps } from "./hooks/useDailySteps";

interface Props {
  uid: string;
  tz: string;
}

const nowDate = new Date();
const now = new Date(
  nowDate.getFullYear(),
  nowDate.getMonth(),
  nowDate.getDate(),
  0,
  0,
  0,
  0
).getTime();
const now_7 = now - 7 * 24 * 60 * 60 * 1000;

const getDates = (start: number, end: number) => {
  const dates: string[] = [];
  let stUnix = start;
  let i: number = 0;

  while (stUnix < end) {
    stUnix = start + i * oneDayMS;
    dates.push(format(new Date(stUnix), "yyyy-MM-dd"));

    i++;
  }

  return dates;
};

const PastProgress: React.FC<Props> = ({ uid, tz }) => {
  const { st, en, q } = useCalendar(now_7, now);

  const { savedDailyGoals } = useDailyGoals(uid, st - oneDayMS, en + oneDayMS);
  const { savedDailySteps } = useDailySteps(uid, st - oneDayMS, en + oneDayMS);

  const dts = getDates(st - oneDayMS, en + oneDayMS);
  // console.log(savedDailyGoals, dts);

  return (
    <div className="p-4 border">
      <div>
        <DateModal q={q} />
      </div>

      <div className="flex flex-wrap pt-8">
        {dts.map((item) => {
          const goalObj = savedDailyGoals[item];
          const stepObj = savedDailySteps[item];
          return (
            <div key={item}>
              <DailyCard
                goalObj={goalObj}
                stepObj={stepObj}
                uid={uid}
                date={item}
                tz={tz}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PastProgress;
