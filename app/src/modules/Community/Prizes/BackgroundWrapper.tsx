import { frequencyTypes } from "@models/Prizes/Prizes";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";

interface Props {
  children: React.ReactNode;
  prizesFor: frequencyTypes;
  setPrizesFor: (val: frequencyTypes) => void;
}

const BackgroundWrapper: React.FC<Props> = ({
  prizesFor,
  setPrizesFor,
  children,
}) => {
  return (
    <View className="flex-1">
      <View
        className={clsx(
          "flex flex-row iphoneX:text-xl font-extrabold border-t border-white",
          prizesFor === "daily"
            ? "bg-[#8673CE]"
            : prizesFor === "weekly"
            ? "bg-[#699FD0]"
            : prizesFor === "monthly"
            ? "bg-[#FF9F75]"
            : ""
        )}
      >
        <View
          className={clsx(
            "w-1/3 bg-white",
            prizesFor === "weekly" ? "rounded-br-xl" : ""
          )}
        >
          <Pressable
            className={clsx(
              "w-full py-2",
              prizesFor === "daily" && "bg-[#8673CE] rounded-tr-xl"
            )}
            onPress={() => setPrizesFor("daily")}
          >
            <Text
              className={clsx(
                "text-center font-bold",
                prizesFor === "daily" ? "text-white" : "text-[#788289]"
              )}
            >
              Daily
            </Text>
          </Pressable>
        </View>
        <View
          className={clsx(
            "w-1/3 bg-white",
            prizesFor === "daily"
              ? "rounded-bl-xl"
              : prizesFor === "monthly"
              ? "rounded-br-xl"
              : ""
          )}
        >
          <Pressable
            className={clsx(
              "w-full py-2",
              prizesFor === "weekly" && "bg-[#699FD0] rounded-t-xl"
            )}
            onPress={() => setPrizesFor("weekly")}
          >
            <Text
              className={clsx(
                "text-center font-bold",
                prizesFor === "weekly" ? "text-white" : "text-[#788289]"
              )}
            >
              Round
            </Text>
          </Pressable>
        </View>
        <View
          className={clsx(
            "w-1/3 bg-white",
            prizesFor === "weekly" ? "rounded-bl-xl" : ""
          )}
        >
          <Pressable
            className={clsx(
              "w-full py-2",
              prizesFor === "monthly" && "bg-[#FF9F75] rounded-tl-xl"
            )}
            onPress={() => setPrizesFor("monthly")}
          >
            <Text
              className={clsx(
                "text-center font-bold",
                prizesFor === "monthly" ? "text-white" : "text-[#788289]"
              )}
            >
              Game
            </Text>
          </Pressable>
        </View>
      </View>
      <LinearGradient
        colors={
          prizesFor === "daily"
            ? ["#8673CE", "#6D9DC7"]
            : prizesFor === "weekly"
            ? ["#699FD0", "#5EABC1"]
            : prizesFor === "monthly"
            ? ["#FF9F75", "#F66E97"]
            : ["transparent", "transparent"]
        }
        className="flex-1 p-2"
      >
        {children}
      </LinearGradient>
    </View>
  );
};

export default BackgroundWrapper;
