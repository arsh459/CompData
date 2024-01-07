import Confetti from "@components/Confetti";
import Timeline from "./Timeline";
import Goals from "./Goals";
import Title from "./Title";
import Icon from "./Icon";
import { View } from "react-native";
import { AchievementPathData } from "../utils/interface";

interface Props {
  item: AchievementPathData;
  scollEnded?: boolean;
  isLast?: boolean;
  dark?: boolean;
}

const ContentCard: React.FC<Props> = ({ item, scollEnded, isLast, dark }) => {
  const itemsLength = item.items?.length || 0;
  // console.log("timeline", item.timeline);

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
    <View
      className="relative z-0 rounded-3xl py-4 border"
      style={{
        borderColor: isMongthDone ? doneColor : "transparent",
        backgroundColor: remoteColor,
      }}
    >
      {itemsLength && !item.title?.icon ? (
        <Icon item={item} itemsLength={itemsLength} dark={dark} />
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

      {scollEnded && isLast ? <Confetti /> : null}
    </View>
  );
};

export default ContentCard;
