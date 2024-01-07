import BackBtn from "@components/Buttons/BackBtn";
import MediaCard from "@components/MediaCard";
import Swiper from "@components/Swiper";
import UseModal from "@components/UseModal";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  media: (CloudinaryMedia | AWSMedia)[];
}

const PrivateMediaSwiper: React.FC<Props> = ({ isOpen, onClose, media }) => {
  const [isPaused, setIsPaused] = useState<boolean>(true);

  return (
    <UseModal
      visible={isOpen}
      onClose={onClose}
      width="w-full"
      height="h-full"
      bgColor="bg-black"
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 relative z-0 flex flex-row items-center justify-center">
          {isPaused ? (
            <>
              <LinearGradient
                colors={["#000000", "transparent"]}
                className="absolute top-0 left-0 right-0 h-1/5 z-10 p-4"
                pointerEvents="none"
              />
              <View className="absolute top-0 left-0 z-10 p-4">
                <BackBtn onBack={onClose} classStr="w-8 h-8" color="#FFFFFF" />
              </View>
            </>
          ) : null}
          {media.length ? (
            <Swiper
              pagination={isPaused}
              dotColor={"#FFFFFF"}
              dotWidth={25}
              dotHeight={10}
              activeDotWidth={10}
              paginationPosition="absolute left-0 right-0 bottom-0 z-10 h-1/5 flex justify-end"
              paginationGradient={true}
              paginationGradientArr={["transparent", "#000000"]}
            >
              {media.map((each) => (
                <MediaCard
                  key={each.id}
                  media={each}
                  setIsPaused={(val) => setIsPaused(val)}
                />
              ))}
            </Swiper>
          ) : (
            <View className="w-full h-full flex justify-center items-center">
              <Text className="text-white text-xl iphoneX:text-3xl font-bold">
                No Media Found
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </UseModal>
  );
};

export default PrivateMediaSwiper;
