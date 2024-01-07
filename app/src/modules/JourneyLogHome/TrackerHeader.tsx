import { View, Text } from "react-native";

import Header from "@modules/Header";
import ImageWithURL from "@components/ImageWithURL";
interface Props {
  icon: string;
  text: string;
}
const TrackerHeader: React.FC<Props> = ({ icon, text }) => {
  return (
    <>
      <Header headerColor="#232136" tone="dark" back={true} />
      <View className="flex flex-row items-center px-4 pt-4">
        {icon ? (
          <ImageWithURL source={{ uri: icon }} className="w-6 aspect-square" />
        ) : null}

        <Text
          className="pl-2.5 text-xl iphoneX:text-2xl text-white"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          {text}
        </Text>
      </View>
    </>
  );
};

export default TrackerHeader;
