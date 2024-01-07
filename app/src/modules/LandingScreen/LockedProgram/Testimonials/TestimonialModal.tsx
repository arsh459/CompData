import CloseBtn from "@components/Buttons/CloseBtn";
import UseModal from "@components/UseModal";
import UserImage from "@components/UserImage";
import { Testimonial } from "@models/Testimonial/interface";
import { SafeAreaView, Text, View } from "react-native";

interface Props {
  testimonial?: Testimonial;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}
const TestimonialModal: React.FC<Props> = ({
  testimonial,
  isOpen,
  setIsOpen,
}) => {
  return (
    <UseModal
      visible={isOpen}
      onClose={() => setIsOpen(false)}
      width="w-full"
      height="h-full"
      bgColor="bg-black"
      tone="dark"
    >
      <SafeAreaView className="flex-1 flex flex-col justify-center">
        <View className="self-end m-4">
          <CloseBtn onClose={() => setIsOpen(false)} />
        </View>
        <View className="px-6 py-4 border-y border-white flex flex-col bg-[#AFAFAF]/20 backdrop-blur-[80px]">
          <View className="flex flex-row items-center ">
            <UserImage
              height="h-8 iphoneX:h-12"
              width="w-8 iphoneX:w-12"
              image={testimonial?.media}
              name={testimonial?.name}
            />
            <Text className="text-white ml-5 flex-1 font-bold text-lg iphoneX:text-2xl">
              {testimonial?.name}
            </Text>
          </View>
          <Text className="text-white font-medium iphoneX:text-lg py-2">
            {testimonial?.achievement}
          </Text>
          <Text className="text-white text-sm font-light iphoneX:text-lg">
            {testimonial?.quote}
          </Text>
        </View>
      </SafeAreaView>
    </UseModal>
  );
};

export default TestimonialModal;
