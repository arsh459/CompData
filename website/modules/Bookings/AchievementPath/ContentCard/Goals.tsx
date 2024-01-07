import DoubleTickIcon from "@components/SvgIcons/DoubleTickIcon";
import { AchievementPathData } from "../utils/interface";

interface Props {
  item: AchievementPathData;
  dark?: boolean;
}

const Goals: React.FC<Props> = ({ item, dark }) => {
  const doneColor = dark ? "#51FF8C" : "#1FAF20";

  return (
    <div className="flex-1 flex flex-row flex-wrap px-4">
      {item.items?.map((each, index) => (
        <div
          key={`each-${index}`}
          className="w-1/2 flex flex-row justify-evenly items-center py-2"
          style={{ paddingRight: index % 2 === 0 ? 8 : 0 }}
        >
          <img
            src={each.icon}
            alt={each.icon}
            className="w-5 aspect-1 object-contain"
          />
          <p
            className="flex-1 text-sm line-clamp-1 mx-1"
            style={{
              fontFamily: "Nunito-Medium",
              color:
                each.status === "DONE"
                  ? doneColor
                  : dark
                  ? "#FFFFFFB3"
                  : "#242424",
            }}
          >
            {each.text}
          </p>
          {each.status === "DONE" ? (
            <div className="w-4 aspect-1">
              <DoubleTickIcon color={doneColor} />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Goals;
