import MediaCard from "@components/MediaCard";
import { Testimonial } from "@models/Testimonial/interface";
import Header from "@modules/Header";
import { useTestimonialsContext } from "@providers/testimonials/TestimonialsProvider";
import { View, Text, ScrollView } from "react-native";
import OtherTestimonialCard from "./OtherTestimonialCard";
import { useInteractionContext } from "@providers/InteractionProvider/InteractionProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const otherColors = ["#B094FF38", "#71BAFF38", "#FD7AFF38"];

interface Props {
  testimonial?: Testimonial;
}

const TestimonialMain: React.FC<Props> = ({ testimonial }) => {
  const { testimonials } = useTestimonialsContext();
  const { interactionStatus } = useInteractionContext();

  const { top } = useSafeAreaInsets();

  return (
    <>
      <Header back={true} headerType="transparent" tone="dark" />
      <View style={{ paddingTop: top }} className="flex-1 bg-[#232136]">
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          className="flex-1 bg-[#232136]"
        >
          <View className="w-full aspect-video">
            <MediaCard
              media={testimonial?.video || testimonial?.image}
              thumbnail={testimonial?.thumbnail}
              // autoplay={true}
              fluid={true}
            />
          </View>

          <View className="p-5">
            {testimonial?.shortAchievement ? (
              <Text
                className="text-[28px] text-white my-3"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                "{testimonial?.shortAchievement}"
              </Text>
            ) : null}
            <Text className="text-sm text-white/80 font-light">
              {testimonial?.quote}
            </Text>
          </View>

          {interactionStatus && testimonials.length ? (
            <View className="p-4">
              <Text
                className="text-[#F1F1F1] capitalize text-lg iphoneX:text-xl"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                Other Testimonials
              </Text>

              {testimonials.map((each, index) => (
                <OtherTestimonialCard
                  key={each.id}
                  testimonial={each}
                  cardColor={otherColors[index % otherColors.length]}
                />
              ))}
            </View>
          ) : null}
        </ScrollView>
      </View>
    </>
  );
};

export default TestimonialMain;
