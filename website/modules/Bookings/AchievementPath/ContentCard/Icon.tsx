import clsx from "clsx";
import { AchievementPathData } from "../utils/interface";

interface Props {
  item: AchievementPathData;
  itemsLength: number;
  dark?: boolean;
}

const Icon: React.FC<Props> = ({ item, itemsLength, dark }) => {
  const doneColor = dark ? "#51FF8C" : "#1FAF20";

  return (
    <div className="flex-1 flex flex-row flex-wrap justify-center mx-4 my-2">
      {item.items?.map((each, index) => (
        <div
          key={`each-${index}`}
          className={clsx(
            "w-1/4 aspect-1 p-2",
            itemsLength > 2
              ? index % 2 === 0
                ? "-translate-y-2"
                : "translate-y-2"
              : ""
          )}
        >
          <div
            key={`each-${index}`}
            className="w-full h-full border rounded-full p-4"
            style={{
              backgroundColor:
                each.status === "DONE" // && dark
                  ? `${doneColor}33`
                  : dark
                  ? "#56508F"
                  : "#6D55D126",
              borderColor: each.status === "DONE" ? doneColor : "transparent",
            }}
          >
            <img
              src={each.icon}
              alt={each.icon}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Icon;
