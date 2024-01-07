import { View, Text } from "react-native";

import clsx from "clsx";
import UserImage from "@components/UserImage";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
interface Props {
  media?: CloudinaryMedia | AWSMedia;
  createdByString: string;
  primaryText?: string;
  secondaryText?: string;
  primarySubText?: string;
  goalOrEquipment?: string;
}
const CreatedByCoach: React.FC<Props> = ({
  createdByString,
  media,
  primaryText,
  secondaryText,
  primarySubText,
  goalOrEquipment,
}) => {
  return (
    <View className="bg-[#343150] p-4 mx-4 rounded-2xl">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <View
            className={clsx(
              "w-8 aspect-square bg-[#FF5970] p-px rounded-full mr-4"
            )}
          >
            <UserImage image={media} width="w-full" height="h-full" />
          </View>
          <Text className="text-[#E2E2E2] text-xs iphoneX:text-sm font-sans">
            {createdByString}
          </Text>
        </View>
        <Text className="text-[#21A5FF] text-xs  font-sans">
          {primarySubText}
        </Text>
      </View>
      {primaryText ? (
        <Text className="text-[#A0A0A0] text-xs  font-sans pt-3">
          {primaryText}
        </Text>
      ) : null}

      {secondaryText ? (
        <Text className="text-[#E2E2E2] text-sm font-sans pt-4 pb-2.5">
          <Text className="font-bold">
            {goalOrEquipment ? goalOrEquipment : "Goal: "}
          </Text>
          {secondaryText}
        </Text>
      ) : null}
    </View>
  );
};

export default CreatedByCoach;
