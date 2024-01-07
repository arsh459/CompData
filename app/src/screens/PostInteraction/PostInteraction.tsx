import SocialBoat from "@components/SocialBoat";
import SpreadColorBall from "@components/SpreadColorBall";
import {
  useNavigation,
  // useRoute,
  // CommonActions,
} from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Header from "@modules/Header";
// import { UserProvider } from "@providers/user/UserProvider";
import { useForcePortrait } from "@hooks/orientation/useForcePortrait";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { WorkoutParams } from "@screens/Workout";

const iconURL =
  "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Group_702_rHM2Hlti4.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663935982139";

export interface PostInteractionProps {
  // badgeId: string;
}

const PostInteraction = () => {
  // const params = useRoute();
  // const { badgeId } = params.params as PostInteractionProps;
  //   const route = useRoute();
  useScreenTrack();
  const navigation = useNavigation();

  const goToCommunity = () => {
    const routesMounted = navigation.getState().routes;

    let toNavParams: WorkoutParams | undefined;
    for (const route of routesMounted) {
      if (route.name === "Workout" && route.params) {
        toNavParams = route.params as WorkoutParams;
        break;
      }
    }

    if (toNavParams) {
      navigation.navigate("Workout", toNavParams);
    } else {
      navigation.navigate("Home");
    }

    //  navigation.dispatch((state) => {
    //   const isWorkoutPresent = state.routes.filter((r) => r.name === "Workout");
    //   if (isWorkoutPresent.length) {
    //     const updatedRoutes = state.routes.map((item) => {});
    //   }
    //   // routes.push({
    //   //   key: `${navTo}-${Math.round(Math.random() * 1000)}`,
    //   //   name: navTo,
    //   // });

    //   // return CommonActions.reset({
    //   //   ...state,
    //   //   routes,
    //   //   index: routes.length - 1,
    //   // });
    // });

    // if (badgeId) {
    //   navigation.navigate("Workout", {
    //     badgeId,
    //   });
    // } else {
    //   navigation.navigate("Home");
    // }

    // navigation.goBack();
  };

  useForcePortrait();
  // useUnlockAsync();

  return (
    <>
      <View className="flex-1 bg-black">
        <View className=" absolute aspect-square bg-black top-0 left-0 right-0 bottom-0">
          <SpreadColorBall color1={"#51FF8C"} color2="#100F1A" opacity={1} />
        </View>
        <View className="flex-1 h-full justify-between">
          <View>
            <Header
              back={false}
              orientation={"portrait"}
              // onBack={onBack}
              backIcon="arrow"
              headerColor="transparent"
              tone="dark"
              titleNode={<SocialBoat textColor="#FFFFFF" />}
              centerTitle={true}
            />
          </View>
          <View className="p-4 flex-grow pt-40  flex justify-start">
            <View className="flex justify-center items-center pb-4">
              <Image
                source={{ uri: iconURL }}
                className="h-28 w-28 object-fill"
              />
            </View>
            <Text
              style={{ fontFamily: "BaiJamjuree-Bold" }}
              className="text-white text-4xl text-center"
            >
              Great Job!
            </Text>
            <Text
              style={{ fontFamily: "BaiJamjuree-Medium" }}
              className="text-white text-center text-sm px-4"
            >
              You have completed the task. You can see the FPs for your task in
              your plan.
            </Text>
          </View>
          <View className="flex flex-row justify-center items-center pb-14">
            <TouchableOpacity onPress={goToCommunity}>
              <View className="bg-[#51FF8C] rounded-md">
                <Text
                  style={{ fontFamily: "BaiJamjuree-Bold" }}
                  className="font-bold text-lg text-center w-40 py-2"
                >
                  Done
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default PostInteraction;
