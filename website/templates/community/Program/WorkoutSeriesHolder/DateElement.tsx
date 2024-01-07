import { dayObj } from "./constants";
import clsx from "clsx";

interface Props {
  item: dayObj;
  onClick: (day: number) => void;
  selected: boolean;
  font: "light" | "bold";
}

const DateElement: React.FC<Props> = ({ font, item, onClick, selected }) => {
  return (
    <div
      onClick={() => onClick(item.dN)}
      //   key={item.key}
      className={clsx(
        "px-2 py-1 rounded-full cursor-pointer",
        selected ? "bg-orange-500 text-white" : ""
      )}
    >
      <p
        className={clsx(
          "text-sm",
          selected ? "text-white" : "text-gray-500",
          font === "light" ? "font-light " : "font-semibold"
        )}
      >
        {item.text}
      </p>
    </div>
  );
};

export default DateElement;
