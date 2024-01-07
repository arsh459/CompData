import SocialBoatSVG from "@components/SocialBoat/SocialBoatSVG";
import { socialboatLogo } from "@constants/imageKitURL";
import { Cast } from "@models/Cast/Cast";
import { getWidthHeightMedia } from "@utils/media/mediaDimensions";
import { getURLToFetch } from "@utils/media/mediaURL";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useRef, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { intervalToDuration } from "date-fns";

const magicNum = 16;

interface Props {
  cast: Cast;
}

const Stream: React.FC<Props> = ({ cast }) => {
  const dims = useWindowDimensions();
  const videoRef = useRef<Video>(null);
  const [duration, setDuration] = useState<Duration>();

  const { width, height } = getWidthHeightMedia(
    dims.width,
    dims.height,
    cast.taskMedia,
    "portrait"
  );

  const uri: string = cast.taskMedia
    ? getURLToFetch(cast.taskMedia, width, height)
    : socialboatLogo;

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setDuration(intervalToDuration({ start: 0, end: status.positionMillis }));
    }
  };

  const zeroPad = (num: number | undefined) => String(num).padStart(2, "0");

  return (
    <View className="w-full h-full relative z-0">
      {cast.taskMedia ? (
        <Video
          source={{ uri }}
          resizeMode={"contain" as ResizeMode}
          className="w-full h-full"
          ref={videoRef}
          shouldPlay={cast.taskState === "play"}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      ) : null}
      {cast.taskState === "play" ? (
        <>
          <View
            className="absolute left-0 right-0 flex flex-row justify-between items-center"
            style={{
              top: dims.height / magicNum,
              paddingHorizontal: dims.height / magicNum,
            }}
          >
            <View className="w-20 h-20 p-4 border border-[#7D91C3] rounded-full">
              <SocialBoatSVG color="#7D91C3" />
            </View>
            {duration ? (
              <Text
                className="italic text-white text-4xl font-bold"
                style={{ fontFamily: "BaiJamjuree-Bold" }}
              >
                {`${zeroPad(duration.minutes)}:${zeroPad(duration.seconds)}`}
              </Text>
            ) : null}
            <View className="w-20 h-20" />
          </View>
          <View
            className="absolute left-0"
            style={{
              bottom: dims.height / magicNum,
              paddingHorizontal: dims.height / magicNum,
            }}
          >
            <View className="p-4 bg-[#1618263D] border border-[#465373] rounded-2xl backdrop-blur-xl">
              <Text
                className="italic text-white text-4xl font-semibold"
                style={{ fontFamily: "BaiJamjuree-Bold" }}
              >
                {cast.taskName}
              </Text>
              <Text
                className="italic text-white text-2xl font-semibold"
                style={{ fontFamily: "BaiJamjuree-Bold" }}
              >
                20 Reps HardCoded
              </Text>
            </View>
          </View>
        </>
      ) : (
        <View className="absolute left-0 right-0 top-0 bottom-0 bg-[#1618263D] backdrop-blur-xl flex justify-center items-center">
          <Text
            className="italic text-white text-5xl font-semibold"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {cast.taskState === "init"
              ? "Start Game"
              : `Game ${cast.taskState}`}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Stream;
