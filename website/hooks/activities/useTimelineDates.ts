import { format } from "date-fns";
import { useEffect, useState } from "react";

const now = Date.now();
export interface dtRange {
  start: number;
  end: number;
  dateBucket: string;
}

export const useTimelineDates = () => {
  const [numDates, setNumDates] = useState<number>(5);
  const [rangeStart, setRangeStart] = useState<number>(0);
  const [rangeEnd, setRangeEnd] = useState<number>(0);
  const [dtArray, setDtArray] = useState<dtRange[]>([]);

  useEffect(() => {
    const activityArray: dtRange[] = [];
    let rangeSt: number = 0;
    let rangeEd: number = 0;
    for (let i: number = 0; i < numDates; i++) {
      const nowUnix = now - i * 24 * 60 * 60 * 1000;

      const nowDateObj = new Date(nowUnix);
      const nowStartUnix = nowDateObj.setHours(23, 59, 59);

      const nowEndUnix = nowStartUnix - 24 * 60 * 60 * 1000;

      activityArray.push({
        end: nowStartUnix,
        start: nowEndUnix + 1000,
        dateBucket: format(new Date(nowStartUnix), "dd/MM/yyyy"),
      });

      if (i === 0) {
        rangeEd = nowStartUnix;
      }

      if (i === numDates - 1) {
        rangeSt = nowEndUnix;
      }
    }

    setDtArray(activityArray);
    setRangeStart(rangeSt);
    setRangeEnd(rangeEd);
  }, [numDates]);

  const onNext = () => setNumDates((prev) => prev + 5);

  return {
    numDates,
    dtArray,
    onNext,
    rangeStart,
    rangeEnd,
  };
};
