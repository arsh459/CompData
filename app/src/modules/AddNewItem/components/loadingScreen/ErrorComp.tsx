import ImageWithURL from "@components/ImageWithURL";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";

interface Props {
  onPressButton?: () => void;
  title?: string;
}
const ErrorComp: React.FC<Props> = ({ onPressButton, title }) => {
  const navigation = useNavigation();

  function onPress() {
    navigation.dispatch((state) => {
      let routes = state.routes;
      routes = routes.filter(
        (r) =>
          r.name !== "AddNewItemLoadingScreen" && r.name !== "AddNewItemScreen"
      );

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  }

  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-24 aspect-square">
        <ImageWithURL
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Frame%201000001344_PnBR316uss.png?updatedAt=1698324619777",
          }}
          resizeMode="contain"
          className="w-full "
        />
      </View>
      <Text
        className="text-[#FF556C] text-xl mt-7"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        We could not find your meal
      </Text>

      <View className="p-4 py-6 absolute bottom-0 right-0 left-0 bg-[#232136]">
        <StartButton
          title="Retry"
          bgColor="bg-[#6D55D1]"
          textColor="text-[#fff]"
          roundedStr="rounded-2xl"
          fontFamily="Nunito-Bold"
          textStyle="py-3 text-center text-base  font-bold "
          onPress={onPressButton ? onPressButton : onPress}
        />
      </View>
    </View>
  );
};

export default ErrorComp;
