import { View, FlatList, Text, Pressable } from "react-native";
import { useTestimonialsAndVideoTestimonials } from "@hooks/testimonials/useTestimonialsAndVideoTestimonials";
import { Testimonial } from "@models/Testimonial/interface";
import MediaCard from "@components/MediaCard";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const VideoTestimonials = () => {
  const { videoTestimonials } = useTestimonialsAndVideoTestimonials();

  const renderItem = ({ item }: { item: Testimonial }) => {
    const onPress = () => {
      weEventTrack("home_clickTestimonial", {});
    };
    return (
      <View className="h-40 aspect-video rounded-xl overflow-hidden bg-black">
        <Pressable onPress={onPress}>
          <MediaCard media={item.video} fluid={true} />
        </Pressable>
      </View>
    );
  };

  const keyExtractor = (item: Testimonial) => item.id;

  return (
    <>
      <Text
        className="text-[#F1F1F1] capitalize text-lg iphoneX:text-xl p-4"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        Success Stories
      </Text>

      <FlatList
        data={videoTestimonials}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={<View className="w-4 aspect-square" />}
        ListFooterComponent={<View className="w-4 aspect-square" />}
        ItemSeparatorComponent={() => <View className="w-4 aspect-square" />}
      />
    </>
  );
};

export default VideoTestimonials;
