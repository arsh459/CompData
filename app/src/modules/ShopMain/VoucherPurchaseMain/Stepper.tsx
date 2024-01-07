import { View, Text } from "react-native";

import clsx from "clsx";
export type redeemedProps = "pending" | "requested" | "redeemed";

interface Props {
  text?: string;
  isRedeemed?: redeemedProps;
  textStyle?: string;
  ringColor?: string;
  isBottom?: boolean;
  transparent?: boolean;
}

const Stepper: React.FC<Props> = ({
  transparent,
  text,
  isRedeemed,
  textStyle,
  ringColor,
  isBottom,
}) => {
  return (
    <View
      className={clsx(
        "flex items-center flex-row z-10",
        transparent && "opacity-0"
      )}
    >
      <View className="w-1/12 min-w-[16px]">
        <View
          className="aspect-square w-full rounded-full border-2 p-0.5"
          style={{
            borderColor:
              isBottom ||
              isRedeemed === "redeemed" ||
              isRedeemed !== "requested"
                ? "#31FFB5"
                : "#BABABA",
          }}
        >
          {isBottom ||
          isRedeemed === "requested" ||
          isRedeemed === "redeemed" ? (
            <View
              className="aspect-square w-full rounded-full "
              style={{
                // backgroundColor: ringColor ? ringColor : "#BABABA",
                backgroundColor: isBottom ? "#31FFB5" : "#BABABA",
              }}
            />
          ) : null}
        </View>
      </View>

      <Text
        className={clsx(
          "ml-2",
          textStyle ? textStyle : "text-xs iphoneX:text-sm "
        )}
        style={{
          fontFamily: "BaiJamjuree-SemiBold",
          color: isRedeemed === "redeemed" ? "#31FFB5" : "#BABABA",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default Stepper;
