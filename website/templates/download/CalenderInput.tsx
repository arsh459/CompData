import React, { Dispatch, SetStateAction } from "react";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  range: Range[];
  setRange: Dispatch<SetStateAction<Range[]>>;
}
const CalenderInput: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  range,
  setRange,
}) => {
  return (
    <div>
      {isOpen ? (
        <DateRange
          onChange={(item) => setRange([item.selection])}
          moveRangeOnFirstSelection={false}
          editableDateInputs={true}
          ranges={range}
          months={1}
          direction="horizontal"
          className="calendarElement"
        />
      ) : null}
    </div>
  );
};

export default CalenderInput;
