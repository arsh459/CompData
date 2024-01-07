import { BodyTypesId } from "@constants/Avatar/utils";
import { View, Text, Image } from "react-native";
import { BodyTypeData } from "../../../../constants/Avatar/BodyTypeData";

interface Props {
  bodyTypeId: BodyTypesId;
  gender: "male" | "female";
}

const ShowBodyType: React.FC<Props> = ({ bodyTypeId, gender }) => {
  const obj = BodyTypeData[bodyTypeId];

  return (
    <View className="w-[45%] flex justify-center items-center">
      <Image
        source={{
          uri: obj.image[gender],
        }}
        className="w-full max-h-[200px] aspect-[200/250]"
        resizeMode="contain"
      />
      <View className="h-12 flex justify-center items-center">
        <Text
          numberOfLines={2}
          className="text-white text-center text-base"
          style={{
            fontFamily: "BaiJamjuree-SemiBold",
          }}
        >
          {obj.name}
        </Text>
      </View>
    </View>
  );
};

export default ShowBodyType;
