import { View, Text, TouchableOpacity } from "react-native";
import ImageWithURL from "@components/ImageWithURL";
import { fpIconBlueBadge } from "@constants/imageKitURL";
import { UserRankV2 } from "@models/Rounds/interface";
import UserImage from "@components/UserImage";
import { useNavigation } from "@react-navigation/native";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import FastImage from "react-native-fast-image";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { getDeltaFPs } from "./utils/getDeltaFPs";

const RankCard: React.FC<{
  item: UserRankV2;
  // lvlBreakUp?: LevelInterface;
  isMe?: boolean;
}> = ({ item, isMe }) => {
  const navigation = useNavigation();

  const { todayUnix } = useAuthContext();

  const delta = getDeltaFPs(item, todayUnix);

  const { levelImage } = useUserStore((state) => {
    const lvlString = `${item.lvl}`;

    if (state.levelsCache && state.levelsCache[lvlString]) {
      return {
        levelImage: state.levelsCache[lvlString].earnedImg,
      };
    }
    return {
      levelImage: undefined,
    };
  }, shallow);

  console.log("item", item.rank, item.img);

  return (
    <View className="bg-[#343150]">
      {/* {item.lvlBreakUp ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("LevelDetailScreen", {
              lvlNumber: item.lvlBreakUp.lvlNumber,
            })
          }
          className="w-full flex flex-row justify-between items-center px-8 py-3"
          style={{ backgroundColor: `${lvlBreakUp.textColor || "#FFFFFF"}80` }}
        >
          <View className="w-4 aspect-square rounded-full">
            <MediaTile media={lvlBreakUp.earnedImg} fluid={true} />
          </View>

          <Text
            numberOfLines={1}
            className="flex-1 text-white text-xs px-2"
            style={{
              fontFamily: "Nunito-Bold",
            }}
          >
            {lvlBreakUp.title}
          </Text>

          <ImageWithURL
            source={{ uri: infoBtnRing }}
            className="w-3 aspect-square ml-2"
          />
        </TouchableOpacity>
      ) : ( */}
      <TouchableOpacity
        onPress={() => navigation.navigate("User", { userId: item.uid })}
        className="w-full flex flex-row justify-between items-center p-4"
        style={{ backgroundColor: isMe ? "#6D55D180" : undefined }}
      >
        <Text
          className="text-white text-center text-base pr-4"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          {item.rank}
        </Text>

        <UserImage
          image={item?.img}
          name={item.name}
          width="w-10"
          height="h-10"
        />

        <View className="flex flex-grow items-center flex-row">
          <Text
            numberOfLines={1}
            className=" text-white text-sm px-2"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            {item?.name}
          </Text>
          {levelImage?.url ? (
            <FastImage
              source={{ uri: levelImage?.url }}
              // className="w-4 aspect-square"
              className="h-4 aspect-square"
            />
          ) : null}
        </View>
        <View className="flex items-end">
          <View className=" flex flex-row">
            <ImageWithURL
              source={{ uri: fpIconBlueBadge }}
              className="w-5 aspect-[16/19] mr-2"
            />
            <Text
              className="text-white text-base"
              style={{
                fontFamily: "Nunito-SemiBold",
              }}
            >
              {item.fp || 0}
            </Text>
          </View>
          {delta ? (
            <Text className=" text-[#FFFFFF]/50 text-base">+{delta}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
      {/* )} */}
    </View>
  );
};

export default RankCard;
