import HamMenuIcon from "@components/SvgIcons/HamMenuIcon";
import { useUserJourney } from "@hooks/journey/useUserJourney";
import Header from "@modules/Header";
import { useUserContext } from "@providers/user/UserProvider";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import AddCta from "./AddCta";
import Timeline from "./Timeline";
import Loading from "@components/loading/Loading";
import { useNavigation } from "@react-navigation/native";
import TransformationView from "@modules/JoinBoatMainV2/Components/ResolutionDetail/TransformationView";
import {
  getEvolutionColor,
  getEvolutionDuration,
} from "@constants/Avatar/utils";

const Journey = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const { user } = useUserContext();
  const { journey, loading } = useUserJourney(user?.uid);
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-[#100F1A]">
      <Header
        headerColor="#100F1A"
        tone="dark"
        title="My Journey"
        optionNode={
          <TouchableOpacity
            className="w-5 iphoneX:w-6 aspect-square flex items-center justify-center"
            onPress={() => navigation.navigate("ChangeDetail")}
          >
            <HamMenuIcon color="#fff" />
          </TouchableOpacity>
        }
      />
      <LinearGradient
        colors={["#100F1A00", "#859EFF80", "#C285FF"]}
        className="flex-1"
      >
        {loading ? (
          <>
            <View className="flex-1 flex justify-center items-center">
              <Loading width="w-16" height="h-16" />
            </View>
            <View style={{ height: tabBarHeight }} />
          </>
        ) : (
          <>
            <ScrollView bounces={false} className="flex-1">
              <TransformationView
                heading="My 2023 resolution"
                user={user}
                bgColor="bg-white/20"
                margin="m-5"
              >
                {user?.difficulty ? (
                  <View className="rounded-xl overflow-hidden mt-4 flex flex-row justify-between items-center px-8 mb-8">
                    <Text
                      className="text-sm iphoneX:text-base"
                      style={{
                        color: getEvolutionColor(user.difficulty),
                        fontFamily: "BaiJamjuree-SemiBold",
                      }}
                    >
                      {`Level : ${user.difficulty}`}
                    </Text>
                    <Text
                      className="text-sm iphoneX:text-base"
                      style={{
                        color: getEvolutionColor(user.difficulty),
                        fontFamily: "BaiJamjuree-SemiBold",
                      }}
                    >
                      {`Duration : ${getEvolutionDuration(
                        user.difficulty
                      )} Months`}
                    </Text>
                  </View>
                ) : null}
              </TransformationView>
              {journey.length ? (
                <Timeline journey={journey} />
              ) : (
                <View className="flex-1">
                  <Text className=" text-center text-white text-xl py-3 font-sans font-medium">
                    Add a new photo to start your {"\n"} transformation journey
                  </Text>
                  <Text
                    className="text-center text-white text-base "
                    style={{ fontFamily: "BaiJamjuree-Medium" }}
                  >
                    Note : Your photos will be private
                  </Text>
                </View>
              )}
            </ScrollView>

            {journey.length ? null : (
              <View className="w-full py-4 flex justify-center items-center">
                <AddCta onPress={() => navigation.navigate("NewJourney")} />
              </View>
            )}

            <View style={{ height: tabBarHeight }} />
          </>
        )}
      </LinearGradient>
    </View>
  );
};

export default Journey;
