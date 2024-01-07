import { Text, Pressable } from "react-native";

import clsx from "clsx";
import ImageWithURL from "@components/ImageWithURL";
import {
  rightTickRedBgWhiteTickIcon,
  unTickIcon,
} from "@constants/imageKitURL";
interface Props {
  selected: boolean;
  text?: string;
  onSelect: () => void;
}
const SelectBox: React.FC<Props> = ({ onSelect, selected, text }) => {
  const url = selected ? rightTickRedBgWhiteTickIcon : unTickIcon;
  return (
    <Pressable
      onPress={onSelect}
      className={clsx(
        "w-[45%] rounded-2xl flex items-center p-4 justify-end aspect-[138/135] ",
        selected ? "bg-white" : "bg-[#343150]"
      )}
    >
      <Text
        className={clsx(
          " text-3xl justify-self-center pb-6",
          selected ? "text-[#232136]" : "text-white "
        )}
      >
        {text}
      </Text>
      <ImageWithURL source={{ uri: url }} className="w-[20%] aspect-square " />
    </Pressable>
  );
};

export default SelectBox;
