import {
  dumbbellIcon,
  giftIcon,
  pushupIcon,
  teamIcon,
} from "@constants/imageKitURL";
import { nFormatter } from "@utils/number";
import { Image, Text, View } from "react-native";

interface Props {
  weight?: string;
  workout?: string;
  teams?: string;
  worth?: number;
}

const EventSubBrief: React.FC<Props> = ({ weight, workout, teams, worth }) => {
  return (
    <View className="px-4 py-2 iphoneX:py-4">
      <View className="flex flex-row items-center py-1 iphoneX:py-2">
        <View className="w-8">
          <Image
            source={{ uri: dumbbellIcon }}
            className="w-4 h-4 iphoneX:w-5 iphoneX:h-5"
            resizeMode="contain"
          />
        </View>
        <Text className="text-xs iphoneX:text-base font-bold text-white pl-2">
          {weight}
        </Text>
      </View>
      <View className="flex flex-row items-center py-1 iphoneX:py-2">
        <View className="w-8">
          <Image
            source={{ uri: pushupIcon }}
            className="w-5 iphoneX:w-6 h-3 iphoneX:h-4"
            resizeMode="contain"
          />
        </View>
        <Text className="text-xs iphoneX:text-base font-bold text-white pl-2">
          {workout}
        </Text>
      </View>
      {teams ? (
        <View className="flex flex-row items-center py-1 iphoneX:py-2">
          <View className="w-8">
            <Image
              source={{ uri: teamIcon }}
              className="w-5 iphoneX:w-6 h-3 iphoneX:h-4"
              resizeMode="contain"
            />
          </View>
          <Text className="text-xs iphoneX:text-base font-bold text-white pl-2">
            {teams}
          </Text>
        </View>
      ) : null}
      <View className="flex flex-row items-center py-1 iphoneX:py-2">
        <View className="w-8">
          <Image
            source={{ uri: giftIcon }}
            className="w-4 h-4 iphoneX:w-5 iphoneX:h-5"
            resizeMode="contain"
          />
        </View>
        <Text className="text-xs iphoneX:text-base font-bold text-white pl-2">
          Win rewards Upto {nFormatter(worth ? worth : 0)}
        </Text>
      </View>
    </View>
  );
};

export default EventSubBrief;
