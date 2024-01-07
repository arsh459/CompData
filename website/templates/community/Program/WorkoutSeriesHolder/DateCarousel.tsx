// import { dayString } from "./constants";
import DayStrip from "./DayStrip";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

interface Props {
  selected: number;
  onClick: (day: number) => void;
  onNextDay: () => void;
  onPrevDay: () => void;
  activeDays: number[];

  // onWeekChange: (nW: number) => void;
}

const DateCarousel: React.FC<Props> = ({
  selected,
  onClick,
  activeDays,
  onNextDay,
  onPrevDay,
}) => {
  return (
    <div className="flex items-center justify-between px-2">
      <ChevronLeftIcon className="w-8 h-8" onClick={onPrevDay} />
      <DayStrip activeDays={activeDays} selected={selected} onClick={onClick} />
      <ChevronRightIcon className="w-8 h-8" onClick={onNextDay} />
    </div>
  );
};

export default DateCarousel;
