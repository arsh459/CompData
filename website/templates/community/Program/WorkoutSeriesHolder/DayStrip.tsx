import { days } from "./constants";
import DateElement from "./DateElement";

interface Props {
  selected: number;
  onClick: (day: number) => void;
  activeDays: number[];
}

// const getDayInRange = (dayNum: number, currD: number, selected: number) => {
//   if (dayNum >= 6) {
//     return true;
//   } else if (dayNum >= 0 && dayNum < 6 && currD >= dayNum) {
//     return true;
//   }

//   return false;
// };

const DayStrip: React.FC<Props> = ({ selected, onClick, activeDays }) => {
  return (
    <div className="flex justify-around w-full items-center ">
      {days.map((item) => {
        // console.log(
        //   "getDayInRange(dayNumber, item.dN)",
        //   "dn",
        //   item.dN,
        //   "dayNum",
        //   dayNumber,
        //   getDayInRange(dayNumber, item.dN, selected)
        // );
        return (
          <div key={item.key} className="flex-none">
            <DateElement
              item={item}
              onClick={onClick}
              font={"bold"}
              selected={selected === item.dN}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DayStrip;
