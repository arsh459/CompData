import { View, Text, TouchableOpacity } from "react-native";
import clsx from "clsx";
import { PostFiltersTypes } from "@hooks/postsV3/usePosts";
import { Dispatch, SetStateAction } from "react";

const chips: PostFiltersTypes[] = ["Highlights", "My Post", "All posts"];

interface Props {
  selectedChips: PostFiltersTypes;
  onSelect: Dispatch<SetStateAction<PostFiltersTypes>>;
}
const FeedChips: React.FC<Props> = ({ onSelect, selectedChips }) => {
  return (
    <View className="flex flex-row justify-between p-4">
      {chips.map((item) => {
        return (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            key={item}
            className={clsx(
              selectedChips === item ? "bg-[#5D588C]" : "bg-[#343150]",
              " rounded-lg py-2  w-[30%]"
            )}
          >
            <Text
              className="text-xs text-center text-white"
              style={{ fontFamily: "Nunito-Medium" }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default FeedChips;
