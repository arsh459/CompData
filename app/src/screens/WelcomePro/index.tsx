import Confetti from "@components/Confetti";
import ImageWithURL from "@components/ImageWithURL";
import { onSeenWelcomePro } from "@modules/HomeScreen/utills/guidedOnboardUtils";
import { useUserContext } from "@providers/user/UserProvider";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@routes/MainStack";
import { View, Text, TouchableOpacity } from "react-native";

const WelcomePro = () => {
  const { user } = useUserContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPress = () => {
    onSeenWelcomePro(user?.uid, true);

    navigation.dispatch((state) => {
      const routes = state.routes.filter(
        (r) =>
          r.name !== "WelcomePro" &&
          r.name !== "UpgradeScreen" &&
          r.name !== "GetAccessScreen"
      );

      routes.push({
        key: `${"UpgradeScreen"}-${Math.round(Math.random() * 1000)}`,
        name: "UpgradeScreen",
      });

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  };

  return (
    <View className="flex-1 bg-[#232136] relative z-0">
      <ImageWithURL
        source={{
          uri: "https://ik.imagekit.io/socialboat/Frame_1728_Py7K25m0Dt.png?updatedAt=1683983024749",
        }}
        className="absolute left-0 right-0 top-0 bottom-0 -z-10"
      />
      <View className="flex-1 flex justify-center items-center">
        <ImageWithURL
          source={{
            uri: "https://ik.imagekit.io/socialboat/Group_1365_KDWALpY5Jf.png?updatedAt=1683983292160",
          }}
          className="w-4/5 aspect-square"
          resizeMode="contain"
        />
        <Text
          className="w-3/4 text-white text-3xl text-center -mt-10"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Welcome {user?.name || "User"} to the Pro member Club ✨
        </Text>
        <View className="h-40" />
      </View>
      <TouchableOpacity
        onPress={onPress}
        className="m-4 p-4 bg-[#6D55D1] rounded-2xl"
      >
        <Text
          className="text-base text-white text-center"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          View Details
        </Text>
      </TouchableOpacity>
      <Confetti customColor={["#FEEEC3", "#E8CA6F"]} hideDefaultColors={true} />
    </View>
  );
};

export default WelcomePro;
