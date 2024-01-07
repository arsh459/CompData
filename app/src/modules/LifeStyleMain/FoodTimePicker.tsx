import { Text, View } from "react-native";

import ImageWithURL from "@components/ImageWithURL";
import clsx from "clsx";
interface Props {
  icon: string;
  text: string;
  timeExist: boolean;
  // onPress: () => void;
  color: string;
  color2?: string;
  time: Date;
  // setTime: React.Dispatch<React.SetStateAction<Date>>;
  // isMultiSelect?: boolean;
  children: React.ReactNode;
}

const FoodTimePicker: React.FC<Props> = ({
  icon,
  text,
  // onPress,
  color,
  // setTime,
  timeExist,
  children,
}) => {
  return (
    <View
      className={clsx(
        "flex flex-row items-center justify-between  mx-4  py-2.5 my-2 rounded-2xl",
        timeExist && "py-0 "
      )}
      style={{ backgroundColor: color || undefined }}
    >
      <View className="flex flex-row  pl-4">
        {icon ? (
          <ImageWithURL source={{ uri: icon }} className="w-8 aspect-square" />
        ) : null}
        <Text
          className={clsx(" text-lg  pl-2", "text-[#232136]")}
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          {text}
        </Text>
      </View>

      <View className="  flex items-center justify-center  ">{children}</View>
    </View>
  );
};

export default FoodTimePicker;
