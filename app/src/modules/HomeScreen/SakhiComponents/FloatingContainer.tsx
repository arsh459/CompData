import ImageWithURL from "@components/ImageWithURL";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  children: React.ReactNode;
  offsetBottom?: number;
  onHide: () => void;
  cta1Text: string;
  cta1Press: () => void;
  cta2Text: string;
  cta2Press: () => void;
}

const FloatingContainer: React.FC<Props> = ({
  children,
  offsetBottom,
  onHide,
  cta1Text,
  cta1Press,
  cta2Text,
  cta2Press,
}) => {
  return (
    <View
      className="absolute left-0 right-0 bg-white mx-4 rounded-xl"
      style={{ bottom: (offsetBottom || 0) + 20 }}
    >
      <View className="relative w-full p-4">
        {children}
        <View className="w-4 aspect-square" />
        <View className="flex flex-row">
          <View className="flex-1">
            <TouchableOpacity
              onPress={cta1Press}
              className="bg-white border rounded-xl border-[#5E45C8]"
            >
              <Text
                className="text-[#5E45C8] text-center py-1.5"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {cta1Text}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-3 aspect-square" />
          <View className="flex-1">
            <TouchableOpacity
              onPress={cta2Press}
              className="bg-[#654AD1] rounded-xl"
            >
              <Text
                className="text-white text-center py-1.5"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {cta2Text}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-12" />
        </View>
        <View className="absolute bottom-0 left-0 right-0 -z-10">
          <ImageWithURL
            className="w-full aspect-[333/92]"
            source={{
              uri: "https://ik.imagekit.io/socialboat/Group_1605_2_exXTuKjCx.png?updatedAt=1681285249305",
            }}
          />
        </View>
        <View className="absolute -top-10 right-0 ">
          <TouchableOpacity
            onPress={onHide}
            className="bg-white rounded-lg px-4 py-1"
          >
            <Text className="text-sm text-[#6D55D1]">Hide</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FloatingContainer;
