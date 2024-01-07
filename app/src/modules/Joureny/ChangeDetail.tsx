import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import DetailModalCard from "./DetailModalCard";
import {
  energyLevelIcon,
  heightScaleIcon,
  weightDesiredMeterIcon,
  weightMeterIcon,
} from "@constants/imageKitURL";
import Header from "@modules/Header";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@routes/MainStack";
import { useUserContext } from "@providers/user/UserProvider";
import { getHeight } from "@modules/JoinBoatMainV3/components/utils2";
import CloseBtn from "@components/Buttons/CloseBtn";
import { sectionTypes } from "@modules/JoinBoatMainV3/hooks/useSection";

const ChangeDetail = () => {
  const { user } = useUserContext();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = (section: sectionTypes) => {
    navigation.push("JoinBoat", { section, backOnDone: true });
  };

  return (
    <View className="flex-1 bg-[#100F1A]">
      <Header
        headerColor="transparent"
        tone="dark"
        titleNode={
          <Text
            className="text-white text-xl iphoneX:text-2xl"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Change Details
          </Text>
        }
        optionNode={
          <CloseBtn onClose={() => navigation.goBack()} color="#FFFFFF" />
        }
      />
      <LinearGradient
        colors={["#100F1A00", "#859EFF80", "#C285FF"]}
        className="flex-1 flex flex-row flex-wrap justify-center py-8"
      >
        <DetailModalCard
          icon={weightMeterIcon}
          text={user?.weight ? `${user.weight}kg` : "-"}
          subText="Current Weight"
          handlePress={() => handlePress("weight")}
        />
        <DetailModalCard
          icon={weightDesiredMeterIcon}
          text={user?.desiredWeight ? `${user.desiredWeight}kg` : "-"}
          subText="Desired Weight"
          handlePress={() => handlePress("desiredWeight")}
        />
        <DetailModalCard
          icon={heightScaleIcon}
          text={user?.height ? getHeight(user.height) : "-"}
          subText="Current Height"
          handlePress={() => handlePress("height")}
        />
        <DetailModalCard
          icon={energyLevelIcon}
          text={user?.workoutFrequency ? user.workoutFrequency : "-"}
          subText="Current Intensity"
          handlePress={() => handlePress("workoutFrequency")}
        />
      </LinearGradient>
    </View>
  );
};

export default ChangeDetail;
