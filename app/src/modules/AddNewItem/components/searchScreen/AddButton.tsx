import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import clsx from "clsx";
import { View, Text } from "react-native";
import StarIcon from "../icons/StarIcon";

interface Props {
  onPress: () => void;
  cta: string;
  showIcon?: boolean;
  paddingClassName?: string;
  showUpperTitle?: boolean;
  upperTitle?: string;
  disable?: boolean;
}

const AddButton: React.FC<Props> = ({
  onPress,
  cta,
  showIcon = true,
  showUpperTitle,
  upperTitle,
  paddingClassName,
  disable,
}) => {
  return (
    <View
      className={clsx(
        "p-5 py-6 bg-[#232136]",
        paddingClassName ? paddingClassName : ""
      )}
    >
      {showUpperTitle ? (
        <View className="">
          <Text
            className="text-center text-white/50 text-xs pb-2"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            {upperTitle}
          </Text>
        </View>
      ) : (
        <></>
      )}

      <StartButton
        title="Add My Item"
        bgColor={disable ? "bg-[#6D55D166]" : "bg-[#6D55D1]"}
        textColor={disable ? "text-[#ffffff66]" : "text-[#fff]"}
        roundedStr="rounded-2xl"
        fontFamily="Nunito-SemiBold"
        textStyle="py-3 text-center text-base font-semibold "
        onPress={onPress}
      >
        <View className="flex flex-row  items-center justify-center">
          {showIcon ? (
            <View className="w-4 h-4">
              <StarIcon color={disable ? "#51FF8C33" : "#51FF8C"} />
            </View>
          ) : null}

          <View className={clsx(showIcon ? "ml-2" : "")}>
            <Text
              style={{
                fontFamily: "Nunito-SemiBold",
              }}
              className={clsx(
                disable ? "text-[#ffffff66]" : "text-[#fff]",
                "py-4 text-center text-base font-semibold",
                "whitespace-nowrap"
              )}
            >
              {cta}
            </Text>
          </View>
        </View>
      </StartButton>
    </View>
  );
};

export default AddButton;
