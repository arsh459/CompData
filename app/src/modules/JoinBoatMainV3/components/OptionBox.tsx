import clsx from "clsx";
import ImageWithURL from "@components/ImageWithURL";
import { Text, TouchableOpacity, View } from "react-native";

export type optionType = { key: string; text: string; icon?: string };

interface Props {
  option: optionType;
  onPress: () => void;
  isSelected?: boolean;
  verticle?: boolean;
  children?: React.ReactNode;
  reverse?: boolean;
}

const OptionBox: React.FC<Props> = ({
  option,
  onPress,
  isSelected,
  verticle,
  children,
  reverse,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        isSelected ? "bg-white" : "bg-[#343150]",
        "rounded-2xl flex flex-row items-center p-4",
        verticle ? "w-full h-full" : "w-full"
      )}
    >
      <View
        className={clsx(
          "flex-1 flex items-center",
          reverse
            ? "flex-row-reverse"
            : verticle
            ? "w-full h-full flex-col-reverse aspect-square justify-end"
            : "flex-row justify-between"
        )}
      >
        <Text
          className={clsx(
            "flex-1 font-popL capitalize",
            verticle
              ? "text-sm iphoneX:text-base text-center mt-3"
              : "text-lg iphoneX:text-xl",
            isSelected ? "text-black" : "text-white"
          )}
        >
          {option.text}
        </Text>
        <View className="w-3 aspect-square" />
        {option.icon ? (
          <ImageWithURL
            source={{ uri: option.icon }}
            className={clsx(
              verticle ? "w-3/5" : "w-9 iphoneX:w-10",
              "aspect-square"
            )}
            resizeMode="contain"
          />
        ) : null}
      </View>
      {verticle ? null : children}
    </TouchableOpacity>
  );
};

export default OptionBox;
