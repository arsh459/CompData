import { View, Text } from "react-native";
import ImageWithURL from "@components/ImageWithURL";
import { noSlotImage } from "@constants/imageKitURL";

export const newSlotBookMessage = `For 3 monthly and annual plans, we offer 1 doctor consultation every three months. If you want to schedule additional consultations, you can pay INR 700 per session.`;

interface Props {
  heading: string;
}

const NoSlot: React.FC<Props> = ({ heading }) => {
  return (
    <View className="flex-1 flex items-center justify-center">
      <ImageWithURL
        source={{ uri: noSlotImage }}
        className="w-1/3 aspect-square"
        resizeMode="contain"
      />
      <Text
        className="text-white/50 text-xl pt-4"
        style={{ fontFamily: "Nunito-SemiBold" }}
      >
        {heading}
      </Text>
    </View>
  );
};

export default NoSlot;
