import ImageWithURL from "@components/ImageWithURL";
import { View, Text } from "react-native";

interface Props {
  heading: string;
  rightText: string;
}

const SubHeading: React.FC<Props> = ({ heading, rightText }) => {
  return (
    <View className="flex flex-row justify-between">
      <Text
        className="text-white text-xl"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {heading}
      </Text>
      {rightText ? (
        <View className="flex flex-row items-center ">
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/Component%20167_j0zoGOJ2O.png?updatedAt=1695619245294",
            }}
            className="w-3 aspect-square"
          />
          <Text
            className="text-white/50 pl-2 text-base"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {rightText}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default SubHeading;
