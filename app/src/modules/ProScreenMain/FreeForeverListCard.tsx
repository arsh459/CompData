import { View, Text } from "react-native";

import clsx from "clsx";

interface Props {
  text?: string;
  hideBorder?: boolean;
}
const FreeForeverListCard: React.FC<Props> = ({ text, hideBorder }) => {
  return (
    <View className={clsx("", hideBorder && "mb-2")}>
      <View className={clsx(" py-2.5 flex flex-row  justify-between ")}>
        <Text className="flex-1 px-2 text-xs iphoneX:text-sm  text-white/70 font-popR">
          {text}
        </Text>
        <View className="flex items-center justify-end  pr-2">
          {/* <CheckIcon className="w-5  aspect-[10/7]" /> */}

          <Text className="pl-1 text-xs iphoneX:text-sm  text-white/70 font-popR">
            Yes
          </Text>
        </View>
      </View>
      {hideBorder ? null : <View className="h-px bg-white/20 flex-1 " />}
    </View>
  );
};

export default FreeForeverListCard;
