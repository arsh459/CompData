import ImageWithURL from "@components/ImageWithURL";
import { sakhiIcon } from "@constants/imageKitURL";
import { useUserContext } from "@providers/user/UserProvider";
import clsx from "clsx";
import { View, Text } from "react-native";

interface Props {
  horizontal?: boolean;
}

const SakhiGreet: React.FC<Props> = ({ horizontal }) => {
  const { user } = useUserContext();

  return (
    <View
      className={clsx(
        "flex justify-center items-center",
        horizontal && "flex-row"
      )}
    >
      <ImageWithURL
        source={{ uri: sakhiIcon }}
        className={clsx(horizontal ? "w-1/4" : "w-2/5", "aspect-[1.5]")}
        resizeMode="contain"
      />
      <View className="p-2">
        <Text
          className={clsx(
            "text-white text-center",
            horizontal ? "text-xl" : "text-2xl"
          )}
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Hello, {user?.name || "User"}
        </Text>
        <Text
          className={clsx(
            "text-white text-center",
            horizontal ? "text-xs" : "text-sm"
          )}
          style={{ fontFamily: "Nunito-Regular" }}
        >
          How may i assist you today
        </Text>
      </View>
    </View>
  );
};

export default SakhiGreet;
