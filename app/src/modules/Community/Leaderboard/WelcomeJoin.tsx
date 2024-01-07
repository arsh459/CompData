import GradientText from "@components/GradientText";
import MediaTile from "@components/MediaCard/MediaTile";
import { welcomeChampionWomenBgImg } from "@constants/imageKitURL";
import { iPhoneX } from "@constants/screen";
import { useGameContext } from "@providers/game/GameProvider";
import { useSprintDetailContext } from "@providers/SprintDetail/SprintDetailProvider";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, useWindowDimensions, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  welcomeHeight?: number;
}

const WelcomeJoin: React.FC<Props> = ({ welcomeHeight }) => {
  const { sprintDetail } = useSprintDetailContext();
  const { height, width } = useWindowDimensions();
  const { params } = useGameContext();
  const { top } = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#29210A", "#14131E"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{
        height: welcomeHeight ? welcomeHeight : height,
        paddingTop: top + 16,
      }}
      className="relative z-0 px-4"
    >
      <Image
        source={{
          uri: "https://ik.imagekit.io/socialboat/1_state__1__pgoCzcDT1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670322947573",
        }}
        className="absolute left-0 right-0 top-0 bottom-0"
        resizeMode="cover"
      />
      <LinearGradient
        colors={["#FDD8661A", "#CEA0191A"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        className="w-full h-full flex rounded-t-3xl px-4 pt-5"
      >
        <Text
          className="text-[#FFE9AC] text-xl iphoneX:text-2xl"
          style={{
            fontFamily: "BaiJamjuree-SemiBold",
            textAlign: "center",
          }}
        >
          Welcome to
        </Text>
        {params?.currentSprint?.name ? (
          <GradientText
            text={`${params?.currentSprint?.name}\nChampionship`}
            colors={["#D2B35E", "#FFE9AC", "#CBAA52"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            textStyle={{
              fontFamily: "BaiJamjuree-Bold",
              fontSize: width > iPhoneX ? 28 : 24,
              textAlign: "center",
            }}
          />
        ) : null}
        <Text
          className="text-[#FFF7CA] text-xs pt-4 text-center px-4 mx-auto"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          {sprintDetail?.description}
        </Text>
        <Text
          className="text-[#FFF7CA] pt-4 text-sm text-center"
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          Ending on{" "}
          {params?.currentSprint?.endString
            ? params?.currentSprint?.endString
            : "TBD"}
        </Text>
        <View className="flex-1 flex justify-end items-center overflow-hidden">
          {sprintDetail?.mainImage ? (
            <View className="w-full aspect-[0.7]" style={{ maxHeight: "100%" }}>
              <MediaTile
                fluid={true}
                media={sprintDetail?.mainImage}
                fluidResizeMode="cover"
              />
            </View>
          ) : (
            <Image
              source={{ uri: welcomeChampionWomenBgImg }}
              className="w-full aspect-[0.7]"
              style={{ maxHeight: "100%" }}
              resizeMode="cover"
            />
          )}
        </View>
      </LinearGradient>
    </LinearGradient>
  );
};

export default WelcomeJoin;
