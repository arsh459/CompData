import SocialBoat from "@components/SocialBoat";
import { Image, Text, View } from "react-native";

interface Props {
  castId: string;
  size: number;
}

const QRCode: React.FC<Props> = ({ castId, size }) => {
  return (
    <>
      <View className="absolute top-0 left-0 right-0 h-1/4 flex justify-center items-center">
        <SocialBoat
          iconColor="#7D91C3"
          iconClass="w-8 aspect-square"
          textColor="#7D91C3"
          textClass="text-4xl"
        />
      </View>
      <View className="absolute bottom-0 left-0 right-0 h-1/3 flex justify-center items-center">
        <Text
          className="text-white text-center text-3xl"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          Scan the code From
          {"\n"}
          Your Phone To Activate
        </Text>
      </View>
      <View className="w-full h-full flex justify-center items-center">
        <Image
          source={{
            uri: `http://api.qrserver.com/v1/create-qr-code/?data=${castId}!&size=${size}x${size}&bgcolor=100F1A&color=FFF`,
          }}
          style={{ width: size, height: size }}
        />
      </View>
    </>
  );
};

export default QRCode;
