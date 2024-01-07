import UserImage from "@components/UserImage";
import { useUserContext } from "@providers/user/UserProvider";
import clsx from "clsx";
import { Image, Pressable, Text, View } from "react-native";

const StepComponentWidth = 50;
const StepSeparatorWidth = 176;
const StepSeparatorHeight = 14;
export const ITEM_WIDTH = StepComponentWidth + StepSeparatorWidth;

const color = (isDone?: boolean, isUnlocked?: boolean) =>
  isDone ? "#1DAC4D" : isUnlocked ? "#FFFFFF" : "#708EAF";

interface StepComponentProps {
  text: number;
  currentlyAtStep?: boolean;
  isDone?: boolean;
  isLast?: boolean;
  isUnlocked?: boolean;
  isSelected?: boolean;
  onPress: () => void;
  tooltipContent?: { title?: string; subTitle: string };
}

const StepComponentV2: React.FC<StepComponentProps> = ({
  text,
  isDone,
  isLast,
  isUnlocked,
  isSelected,
  currentlyAtStep,
  onPress,
  tooltipContent,
}) => {
  const backgroundColor = color(isDone, isUnlocked);

  return (
    <View className="relative z-10 mb-2">
      <Pressable
        onPress={onPress}
        style={{ transform: [{ scale: isSelected ? 1.2 : 1 }] }}
      >
        <View
          style={{ backgroundColor, width: StepComponentWidth }}
          className="aspect-square flex justify-center items-center rounded-full"
        >
          <Text
            className={clsx(
              "text-xl iphoneX:text-2xl ",
              backgroundColor === "#FFFFFF" ? "text-[#484848]" : "text-white"
            )}
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {text}
          </Text>
        </View>
      </Pressable>
      <StepSeparator done={isDone} last={isLast} isUnlocked={isUnlocked} />
      {!isSelected && currentlyAtStep ? (
        <View className="absolute bottom-full pb-3">
          <StepUserToolTip backgroundColor={backgroundColor} />
        </View>
      ) : null}
      {isSelected ? (
        <View className="absolute -left-16 bottom-full pb-3">
          <StepToolTip
            tooltipContent={tooltipContent}
            backgroundColor={backgroundColor}
          />
        </View>
      ) : null}
    </View>
  );
};

export default StepComponentV2;

interface StepSeparatorProps {
  done?: boolean;
  last?: boolean;
  isUnlocked?: boolean;
}

export const StepSeparator: React.FC<StepSeparatorProps> = ({
  done,
  last,
  isUnlocked,
}) => {
  return last ? (
    <View style={{ height: StepSeparatorHeight }} />
  ) : (
    <Image
      style={{
        width: StepSeparatorWidth,
        height: StepSeparatorHeight,
        backgroundColor: "#000",
        transform: [
          { translateY: -(StepComponentWidth / 2 + StepSeparatorHeight / 2) },
        ],
        left: StepComponentWidth / 2,
        zIndex: -10,
      }}
      source={{
        uri: done
          ? "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component_86_zCYuI-Jq7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671116895538"
          : isUnlocked
          ? undefined
          : "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component_86__1__gi-QYj2P5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671116895577",
      }}
    />
  );
};

interface StepUserToolTipProps {
  backgroundColor: string;
}

const StepUserToolTip: React.FC<StepUserToolTipProps> = ({
  backgroundColor,
}) => {
  const { user } = useUserContext();

  return (
    <View className="flex justify-center items-center">
      <View style={{ backgroundColor }} className="rounded-full p-2">
        <UserImage
          image={user?.profileImage}
          name={user?.name}
          width="w-8"
          height="h-8"
        />
      </View>
      <View
        className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[16px] -mt-1.5"
        style={{
          borderTopColor: backgroundColor,
        }}
      />
    </View>
  );
};

interface StepToolTipProps {
  tooltipContent?: { title?: string; subTitle: string };
  backgroundColor: string;
}

const StepToolTip: React.FC<StepToolTipProps> = ({
  tooltipContent,
  backgroundColor,
}) => {
  const textColor =
    backgroundColor === "#FFFFFF" ? "text-[#484848]" : "text-white";
  return (
    <View className="w-40 flex justify-center items-center">
      <View style={{ backgroundColor }} className="rounded-lg px-4 py-2">
        {tooltipContent?.title ? (
          <Text
            className={clsx(" text-center", textColor)}
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {tooltipContent?.title}
          </Text>
        ) : null}
        {tooltipContent?.subTitle ? (
          <Text
            className={clsx(" text-center", textColor)}
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            {tooltipContent?.subTitle}
          </Text>
        ) : null}
      </View>
      <View
        className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8"
        style={{
          borderTopColor: backgroundColor,
        }}
      />
    </View>
  );
};
