import {
  View,
  Text,
  Image,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { unknownFemaleBgImg, unknownMaleBgImg } from "@constants/imageKitURL";
import MediaTile from "@components/MediaCard/MediaTile";
import clsx from "clsx";
// import { badgeTypes } from "@models/Prizes/Prizes";
import { useBadgeWinnersContext } from "@providers/badges/badgeWinners/badgeWinnersProvider";
import { UserInterface } from "@models/User/User";
import { useNavigation } from "@react-navigation/native";
interface Props {
  // badgeType?: badgeTypes;
  // badgeId?: string;
}
const UsersScroll: React.FC<Props> = ({}) => {
  const { width } = useWindowDimensions();
  const { users, onNext } = useBadgeWinnersContext();

  const navigation = useNavigation();

  const renderItem = ({
    item,
    index,
  }: {
    item: UserInterface;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("User", { userId: item.uid })}
      >
        <View
          className={clsx(
            "rounded-lg overflow-hidden flex relative",
            index !== users.length - 1 && "mr-5"
          )}
          style={{
            height: width * 0.32,
            aspectRatio: 88 / 125,
          }}
        >
          <View className="flex-1">
            {item.profileImage ? (
              <MediaTile
                fluid={true}
                media={item.profileImage}
                fluidResizeMode="cover"
              />
            ) : item?.gender == "female" ? (
              <Image
                source={{
                  uri: unknownFemaleBgImg,
                }}
                className="w-full h-full"
                resizeMode="contain"
              />
            ) : (
              <Image
                source={{
                  uri: unknownMaleBgImg,
                }}
                className="w-full h-full"
                resizeMode="contain"
              />
            )}
          </View>
          <Text
            numberOfLines={1}
            style={{ fontFamily: "BaiJamjuree-Medium" }}
            className={clsx(
              "text-white rounded-b-lg p-1 text-[11px] text-center bg-[#40405C]",
              !item.profileImage && "absolute left-0 right-0 bottom-0"
            )}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {users.length ? <View className="h-4" /> : null}
      {users.length === 1 ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("User", { userId: users[0].uid })}
        >
          <View className="flex flex-row justify-around mr-5">
            <View
              className="rounded-lg overflow-hidden flex relative"
              style={{
                height: width * 0.32,
                aspectRatio: 88 / 125,
              }}
            >
              {users[0]?.profileImage ? (
                <MediaTile
                  fluid={true}
                  media={users[0]?.profileImage}
                  fluidResizeMode="cover"
                />
              ) : users[0]?.gender == "female" ? (
                <Image
                  source={{
                    uri: unknownFemaleBgImg,
                  }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={{
                    uri: unknownMaleBgImg,
                  }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              )}
            </View>
            <View className="w-5" />
            <View className="flex-1 items-center justify-center">
              <Text
                style={{ fontFamily: "BaiJamjuree-Medium" }}
                className="text-white text-center text-lg iphoneX:text-[22px]   "
              >
                {users[0]?.name}
              </Text>

              <Text
                style={{ fontFamily: "BaiJamjuree-Bold" }}
                className="text-white text-center text-base iphoneX:text-xl mt-1"
              >
                {users[0]?.totalFitPointsV2} FPs
                {users[0]?.userLevelV2 ? `· Lvl ${users[0]?.userLevelV2}` : ""}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <FlatList
          data={users}
          horizontal={true}
          scrollEnabled={true}
          className="flex-1"
          bounces={false}
          onEndReached={onNext}
          keyExtractor={(item) => item.uid}
          renderItem={renderItem}
        />
      )}
    </>
  );
};

export default UsersScroll;
