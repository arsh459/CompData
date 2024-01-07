import { View } from "react-native";
import FreeForeverListCard from "./FreeForeverListCard";

const FreeForeverList = () => {
  return (
    <View className="bg-white/10  p-4 py-2 rounded-3xl ">
      {freeForever?.map((item, idx) => {
        return (
          <FreeForeverListCard
            text={item}
            key={item}
            hideBorder={freeForever.length - 1 === idx}
          />
        );
      })}
    </View>
  );
};

export default FreeForeverList;

const freeForever = [
  "Weekly Challenges",
  "Period Tracker",
  "500+ Recipes & Diet tips",
  "Rewards to achieve",
  "250+ expert tips & Blogs",
  "Sleep Tracker",
  "Exclusive AMA’s & sessions with Experts",
];
