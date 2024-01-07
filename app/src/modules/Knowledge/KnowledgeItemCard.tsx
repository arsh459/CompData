import { readTimeIconGreen13 } from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import { PostOrPage } from "@tryghost/content-api";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { ImageBackground } from "react-native";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface Props {
  item: PostOrPage;
  height: number;
}
// export const KnowledgeItemCard_MaxHeight = 197;
const KnowledgeItemCard: React.FC<Props> = ({ item, height }) => {
  const navigation = useNavigation();
  const imgUri = item.feature_image
    ? (item.feature_image as string)
    : undefined;

  return (
    <TouchableOpacity
      onPress={() => {
        weEventTrack("Knowledge_clickBlog", {});
        navigation.navigate("BlogScreen", {
          name: item.title ? item.title : item.slug,
          source: `https://www.socialboat.live/blog/post/${item.slug}?noHeader=true`,
        });
      }}
      style={{ height: height }}
      className=" px-4 flex flex-row items-center overflow-hidden"
    >
      {/* <View className="w-1/4 aspect-square bg-[#100F1A] rounded-lg">
        <Image
          source={{
            uri: item.feature_image
              ? item.feature_image
              : "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component_6_57EhzLjTF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675241713238",
          }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      <View className="flex-1 ml-4">
        <View className="flex flex-row items-center">
          <Image
            source={{
              uri: item.primary_author?.profile_image
                ? item.primary_author.profile_image
                : "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component_6_57EhzLjTF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675241713238",
            }}
            className="w-5 aspect-square bg-[#100F1A] rounded-full"
            resizeMode="contain"
          />
          <Text className="text-white/50 text-xs ml-2">
            {item.primary_author?.name ? item.primary_author.name : "UNKNOWN"}
          </Text>
        </View>
        <Text className="text-white text-base leading-4 my-2">
          {item.title ? item.title : "UNKNOWN"}
        </Text>
        <View className="flex flex-row items-center">
          {item.reading_time ? (
            <View className="flex flex-row items-center">
              <View className="w-3.5 aspect-square mr-2">
                <SvgIcons iconType="book" color="#FFFFFF99" />
              </View>
              <Text className="text-white/50 text-xs">{`${item.reading_time} mins Read`}</Text>
            </View>
          ) : null}
          {item.reading_time && item.published_at ? (
            <Text className="text-white/50 text-xs">
              {"   "}&#x2022;{"    "}
            </Text>
          ) : null}
          {item.published_at ? (
            <Text className="text-white/50 text-xs">
              {format(
                item.published_at ? new Date(item.published_at) : new Date(),
                "do,MMM,yy"
              )}
            </Text>
          ) : null}
        </View>
      </View> */}
      <ImageBackground
        source={{
          uri: imgUri,
          height: 100,
        }}
        resizeMethod="scale"
        className="flex-1  aspect-video rounded-2xl overflow-hidden  bg-black"
      >
        <View className="flex-1 flex justify-between ">
          <View className=" flex flex-row items-center justify-between m-4">
            <View className="flex flex-row items-center w-fit  bg-[#343150B2] self-start rounded-lg p-1">
              <Image
                source={{
                  uri: item.primary_author?.profile_image
                    ? item.primary_author.profile_image
                    : "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component_6_57EhzLjTF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675241713238",
                }}
                className="w-5 aspect-square  rounded-full"
                resizeMode="contain"
              />
              <Text
                className="text-white text-xs ml-2 pr-1"
                style={{ fontFamily: "Nunito-Medium" }}
              >
                {item.primary_author?.name
                  ? item.primary_author.name
                  : "UNKNOWN"}
              </Text>
            </View>
            <View
              // colors={["#34315033", "#34315033"]}
              className=" rounded-full bg-[#343150B2]  w-fit   self-end px-4 py-1.5"
            >
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: readTimeIconGreen13 }}
                  className="w-3 aspect-square "
                  resizeMode="contain"
                />
                <Text
                  className=" w-fit text-center text-white text-xs  pl-1 "
                  style={{ fontFamily: "Nunito-Bold" }}
                >
                  {`${item.reading_time} min`}
                </Text>
              </View>
            </View>
          </View>
          <View className="w-full bg-[#343150]   px-5 py-3 ">
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              className="text-xs text-[#FFFFFFCC] text-left  iphoneX:text-sm   "
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              {item.title}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default KnowledgeItemCard;
