import MediaTile from "@components/MediaCard/MediaTile";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { getHeight } from "@utils/media/mediaDimensions";
import { useState } from "react";
import ArrowSolidIcon from "@components/SvgIcons/ArrowSolidIcon";
import UseModal from "@components/UseModal";
import MediaCard from "@components/MediaCard";
import CloseIcon from "@components/SvgIcons/CloseIcon";
import Loading from "@components/loading/Loading";

const ListHeader = () => {
  const { width } = useWindowDimensions();
  const { badge } = useSignleBadgeContext();
  const decorWidth = width * 0.3;
  const [playTrailer, setPlayTrailer] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <>
      <View
        pointerEvents="none"
        className="w-full aspect-[375/201] relative z-0"
      >
        <MediaTile
          fluid={true}
          media={badge?.bgImageFemale}
          fluidResizeMode="cover"
        />
        <LinearGradient
          className="absolute bottom-0 left-0 right-0 h-1/2"
          colors={["#23213600", "#232136"]}
        />
      </View>

      <View className="p-4 -mt-8">
        <View className="flex-1 flex flex-row justify-between items-center pb-4">
          {badge?.courseDecorImage ? (
            <View
              style={{
                width: decorWidth,
                height: getHeight(badge.courseDecorImage, decorWidth),
              }}
            >
              <MediaTile media={badge.courseDecorImage} fluid={true} />
            </View>
          ) : null}
          {badge?.badgeBGImage?.resource_type === "video" ? (
            <TouchableOpacity
              onPress={() => setPlayTrailer(true)}
              className="bg-white rounded-lg flex flex-row items-center px-4 py-1.5"
            >
              <View className="w-3 aspect-square mr-1">
                <ArrowSolidIcon color="#000000" />
              </View>
              <Text className="text-sm" style={{ fontFamily: "Nunito-Medium" }}>
                Play Trailer
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
        <Text className="text-sm text-white/80">{badge?.description}</Text>
      </View>

      <View className="p-4">
        <Text
          className="text-base text-white"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          What all will be in the course
        </Text>
        <Text className="text-sm text-white/80 pt-1">
          Following is a sample plan. Your daily workouts will be customised to
          your cycle and goal.
        </Text>
      </View>

      <UseModal
        visible={playTrailer}
        onClose={() => setPlayTrailer(false)}
        width="w-full"
        height="h-full"
        tone="dark"
        blurAmount={20}
        fallbackColor="#13121EE5"
      >
        <View className="w-full h-full flex justify-center items-center pb-12">
          <TouchableOpacity
            onPress={() => setPlayTrailer(false)}
            className="self-end w-4 aspect-square m-4"
          >
            <CloseIcon />
          </TouchableOpacity>
          <MediaCard
            thumbnail={badge?.bgImageFemale}
            playbackId={badge?.playbackId}
            autoplay={true}
            forcePause={!playTrailer}
            media={badge?.badgeBGImage}
            setIsLoaded={setIsLoaded}
          />
          {isLoaded ? null : (
            <View className="absolute left-0 right-0 top-0 bottom-0 z-10 bg-[#232136] flex justify-center items-center">
              <Loading width="w-12" height="h-12" />
            </View>
          )}
        </View>
      </UseModal>
    </>
  );
};

export default ListHeader;
