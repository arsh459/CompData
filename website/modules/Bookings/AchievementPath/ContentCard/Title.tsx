import { AchievementPathDataItem } from "../utils/interface";

interface Props {
  title: Partial<AchievementPathDataItem>;
  itemsLength: number;
  isMongthDone: boolean;
  dark?: boolean;
}

const Title: React.FC<Props> = ({ title, itemsLength, isMongthDone, dark }) => {
  const doneColor = dark ? "#51FF8C" : "#1FAF20";

  return (
    <div className="flex flex-row justify-evenly items-center px-4 py-2">
      {title.icon ? (
        <div
          style={{
            width: itemsLength ? "20%" : "35%",
            padding: itemsLength ? 16 : 0,
            backgroundColor:
              title.status === "DONE"
                ? `${doneColor}33`
                : dark
                ? "#56508F"
                : "#6D55D126",
            borderColor: title.status === "DONE" ? doneColor : "transparent",
          }}
          className="aspect-1 border rounded-full"
        >
          <img
            src={title.icon}
            alt={title.icon}
            className="w-full h-full object-contain"
          />
        </div>
      ) : null}
      {title.text ? (
        <p
          style={{
            fontFamily: "Nunito-Bold",
            flex: title.icon ? (itemsLength ? 0.85 : 0.65) : 1,
            fontSize: itemsLength && !title.icon ? 18 : 24,
            textAlign: title.icon ? "start" : "center",
            color: isMongthDone ? doneColor : dark ? "#CCC0FF" : "#8A6FFF",
          }}
        >
          {title.text}
        </p>
      ) : null}
    </div>
  );
};

export default Title;
