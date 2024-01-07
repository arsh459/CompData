import Timeline from "./Timeline";
import Icon from "./Icon";
import Title from "./Title";
import Goals from "./Goals";
import { AchievementPathData } from "../utils/interface";

interface Props {
  item: AchievementPathData;
  dark?: boolean;
}

const ContentCard: React.FC<Props> = ({ item, dark }) => {
  const itemsLength = item.items?.length || 0;

  const hasPendingGoal = item.items?.findIndex(
    (each) => !each.status || each.status === "PENDING"
  );

  const isMongthDone =
    (itemsLength && hasPendingGoal && hasPendingGoal === -1) ||
    item.title?.status === "DONE"
      ? true
      : false;

  const remoteColor = isMongthDone ? "#2C4D47" : dark ? "#343150" : "#F3E8FF";
  const doneColor = dark ? "#51FF8C" : "#1FAF20";

  return item.timeline ? (
    <Timeline timeline={item.timeline} dark={dark} />
  ) : (
    <div
      className="relative z-0 rounded-3xl border py-4"
      style={{
        borderColor: isMongthDone ? doneColor : "transparent",
        backgroundColor: remoteColor,
      }}
    >
      {itemsLength && !item.title?.icon ? (
        <>
          <Icon item={item} itemsLength={itemsLength} dark={dark} />

          <div className="w-full h-px bg-[#2626261A] my-2" />
        </>
      ) : null}

      {item.title ? (
        <Title
          title={item.title}
          itemsLength={itemsLength}
          isMongthDone={isMongthDone}
          dark={dark}
        />
      ) : null}

      <Goals item={item} dark={dark} />
    </div>
  );
};

export default ContentCard;
