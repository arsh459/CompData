import { View, Text, Pressable, Image } from "react-native";
interface Props {
  //   children?: React.ReactNode;
  //   text?: string;
  bgFirstBtn?: string;
  bgSecondBtn?: string;
  textFirstBtn?: string;
  textBgFirstBtn?: string;
  textSecondBtn?: string;
  textBgSecondBtn?: string;
  imgFirstBtn?: string;
  imgSecondBtn?: string;
  leftLink?: () => void;
  rightLink?: () => void;
}
const BottomButtons: React.FC<Props> = ({
  bgFirstBtn,
  bgSecondBtn,
  textFirstBtn,
  textSecondBtn,
  textBgFirstBtn,
  textBgSecondBtn,
  imgFirstBtn,
  imgSecondBtn,
  leftLink,
  rightLink,
}) => {
  return (
    <View className="flex flex-row">
      <Pressable onPress={leftLink} className="flex-1">
        <View
          className="flex flex-row py-4 px-4 items-center  rounded-xl cursor-pointer flex-1 justify-center mr-2 iphoneX:mr-4"
          style={{
            backgroundColor: bgFirstBtn ? bgFirstBtn : "#777777",
          }}
        >
          <Image
            source={{
              uri: imgFirstBtn
                ? imgFirstBtn
                : "https://ik.imagekit.io/socialboat/Vector__4__fkwNJ5P1a.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656571784836",
            }}
            className="w-5 h-5"
            resizeMode="contain"
          />
          <Text
            className="pl-2 text-xs iphoneX:text-lg "
            style={{ color: textBgFirstBtn ? textBgFirstBtn : "#D6D6D6" }}
          >
            {textFirstBtn ? textFirstBtn : "Leaderboard"}
          </Text>
        </View>
      </Pressable>
      <Pressable onPress={rightLink} className="flex-1">
        <View
          className="flex flex-row py-4 px-4 bg-white items-center rounded-xl cursor-pointer flex-1 justify-center"
          style={{
            backgroundColor: bgSecondBtn ? bgSecondBtn : "#FFF",
          }}
        >
          <Image
            source={{
              uri: imgSecondBtn
                ? imgSecondBtn
                : "https://ik.imagekit.io/socialboat/Polygon_1_mU_LKHS73.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656571784792",
            }}
            className="w-5 h-5"
            resizeMode="contain"
          />
          <Text
            className="pl-2 whitespace-nowrap text-xs iphoneX:text-lg"
            style={{
              color: textBgSecondBtn ? textBgSecondBtn : "#0085E0",
            }}
          >
            {textSecondBtn ? textSecondBtn : "Start Game"}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default BottomButtons;
