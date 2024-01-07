import { Pressable, ScrollView, Text, View } from "react-native";
import {
  backward10Sec,
  forward10Sec,
  getPositionFormat,
  mute1,
  pause,
  play,
  unmute1,
} from "@modules/ReelViewMain/utils";
import MediaTile from "@components/MediaCard/MediaTile";
import UseModal from "@components/UseModal";
import Header from "@modules/Header";
import CTA from "./CTA";
import { LinearGradient } from "expo-linear-gradient";
import UserImage from "@components/UserImage";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { usePlayback } from "./usePlayback";
import { useState } from "react";
import Loading from "@components/loading/Loading";
import ImageWithURL from "@components/ImageWithURL";
import { DownIcon, UpIcon } from "@constants/imageKitURL";
import { TouchableOpacity } from "react-native";
import clsx from "clsx";
import ShareCta from "./ShareCta";

interface Props {
  taskId?: string;
  media?: CloudinaryMedia | AWSMedia;
  thumbnail?: CloudinaryMedia | AWSMedia;
  name?: string;
  description?: string;
  hideOverlays?: boolean;
  creatorId?: string;
  playbackId?: string;
  deeplink?: string;
}

const ReelViewMain: React.FC<Props> = ({
  taskId,
  media,
  name,
  hideOverlays,
  thumbnail,
  creatorId,
  playbackId,
  description,
  deeplink,
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [toggleText, setToggle] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  const iconUri = toggleText ? UpIcon : DownIcon;
  const { user } = useUserV2(creatorId);
  const {
    targetRef,
    showOverlay,
    isPaused,
    isMuted,
    playbackDur,
    handlePlaybackStatus,
    handlePressStart,
    handlePressEnd,
    onPlayPause,
    onBackward,
    onForward,
    onMuteUnmute,
    onBack,
  } = usePlayback();

  return (
    <>
      {hideOverlays ? null : (
        <Header
          back={true}
          onBack={onBack}
          tone="dark"
          headerColor="#232136"
          headerType="transparent"
          optionNode={
            media?.duration ? (
              <View className="bg-[#5D588CB2] rounded-lg px-4 py-2">
                <Text className="text-white">
                  {getPositionFormat(media.duration * 1000 - playbackDur)}
                </Text>
              </View>
            ) : undefined
          }
          setHeaderHeight={setHeaderHeight}
        />
      )}
      <View className="bg-[#232136] flex-1 flex justify-center items-center relative z-0">
        <MediaTile
          media={media}
          poster={thumbnail}
          fluid={true}
          // autoplay={true}
          playbackId={playbackId}
          fluidResizeMode="cover"
          paused={true}
          handlePlaybackStatus={handlePlaybackStatus}
          shouldPlay={true}
          targetRef={targetRef}
          isMuted={isMuted}
          setIsLoaded={setIsLoaded}
        />
        {!isLoaded || playbackDur === 0 ? (
          <View className="absolute left-0 right-0 top-0 bottom-0 z-10 flex justify-center items-center">
            <Loading />
          </View>
        ) : (
          <>
            {isPaused ? (
              <View className="absolute left-0 right-0 top-0 bottom-0 z-0 flex justify-center items-center">
                <CTA onPress={onPlayPause} icon={play} />
              </View>
            ) : (
              <Pressable
                onPressIn={handlePressStart}
                onPressOut={handlePressEnd}
                className="absolute left-0 right-0 top-0 bottom-0 z-10"
              />
            )}
            {hideOverlays ? null : (
              <>
                <View
                  className="absolute left-0 right-0 flex items-end bottom-0 z-10"
                  style={{ top: headerHeight || 40 }}
                >
                  <CTA
                    onPress={onMuteUnmute}
                    icon={isMuted ? mute1 : unmute1}
                    width={80}
                    containerStyleTw="border-none"
                  />
                </View>
                <LinearGradient
                  colors={["#5D588C00", "#5D588CCC"]}
                  className={clsx(
                    "absolute left-0  right-0 bottom-0 z-10 p-4 end",
                    toggleText && description && description?.length > 10
                      ? "h-1/2 pb-10"
                      : "h-1/4 "
                  )}
                >
                  <View className=" flex flex-row justify-between mb-6">
                    <View />
                    <ShareCta
                      view="ReelView"
                      taskId={taskId}
                      thumbnail={thumbnail}
                      name={name}
                      description={description}
                      deeplink={deeplink}
                    />
                  </View>
                  <View className="flex-1  relative z-0">
                    <View className=" flex flex-row">
                      <View className="flex-1">
                        <View className="flex flex-row items-center">
                          <UserImage
                            image={user?.profileImage}
                            width="w-5"
                            height="h-5"
                          />
                          <Text className="text-white text-12 ml-2">
                            {user?.name}
                          </Text>
                        </View>
                        <View className="w-1 aspect-square" />

                        <Text
                          numberOfLines={2}
                          className=" text-white text-xl "
                          style={{ fontFamily: "Nunito-Bold" }}
                        >
                          {name}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => setToggle((p) => !p)}
                        className=""
                      >
                        <ImageWithURL
                          source={{ uri: iconUri }}
                          resizeMode="contain"
                          className="w-7 aspect-square"
                        />
                      </TouchableOpacity>
                    </View>
                    <View className="w-2 aspect-square" />
                    <ScrollView
                      bounces={false}
                      // style={{ paddingBottom: headerHeight || 40 }}
                    >
                      {toggleText ? (
                        <View className="">
                          <Text
                            className=" text-white text-xs "
                            style={{
                              fontFamily: "Nunito-Regular",
                              lineHeight: 14,
                            }}
                          >
                            {description}
                          </Text>
                        </View>
                      ) : null}
                    </ScrollView>
                  </View>
                </LinearGradient>
              </>
            )}
          </>
        )}
      </View>
      <UseModal
        visible={showOverlay && !isPaused && isLoaded}
        onClose={() => {}}
        width="w-full"
        height="h-full"
        tone="dark"
        hasHeader={true}
      >
        <View className="w-full h-full flex justify-center items-center relative z-0">
          <View className="flex flex-row">
            <CTA onPress={onBackward} icon={backward10Sec} />
            <View className="px-2">
              <CTA onPress={onPlayPause} icon={pause} />
            </View>
            <CTA onPress={onForward} icon={forward10Sec} />
          </View>
        </View>
      </UseModal>
    </>
  );
};

export default ReelViewMain;
