import { View, useWindowDimensions } from "react-native";

import GradientText from "@components/GradientText";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "@components/Swiper";
import ChampCard from "./ChampCard";
import {
  championOBfirst,
  championOBSecond,
  championOBThird,
} from "@constants/imageKitURL";
import GetStarted from "@modules/JoinBoatMainV2/Components/GetStarted";

interface Props {
  onGetStarted: () => void;
}

const SwipeList: React.FC<Props> = ({ onGetStarted }) => {
  const { width, height } = useWindowDimensions();

  return (
    <View
      className="flex flex-1  justify-center  bg-[#100F1A]"
      style={{ height }}
    >
      <View className="pb-4">
        <GradientText
          text={"Join the Championship"}
          colors={["#D2B35E", "#FFE9AC", "#CBAA52"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          textStyle={{
            fontFamily: "BaiJamjuree-SemiBold",
            fontSize: 28,
            textAlign: "center",
          }}
        />
      </View>
      <LinearGradient
        colors={["#FFE49F", "#CEB062"]}
        className="my-6 mx-4 p-4 rounded-3xl "
      >
        <Swiper
          pagination={true}
          dotWidth={width * 0.15}
          dotHeight={width * 0.02}
          activeDotWidth={width * 0.1}
          dotColor="#5A4D2C"
          alignItems="stretch"
          slideWidth={width - 64}
        >
          <ChampCard
            imgUrl={championOBfirst}
            text="Create a Team and Workout with Friends everyday."
          />

          <ChampCard
            imgUrl={championOBSecond}
            text="Your Top 20 Workouts of your team will be chosen ."
          />
          <ChampCard
            imgUrl={championOBThird}
            text="Get a Team Rank 1 and win the championship with rewards worth INR 50,000"
          />
        </Swiper>
      </LinearGradient>

      <GetStarted
        // onGetStarted={() => navigation.navigate("WelcomeTeamScreen")}
        onGetStarted={onGetStarted}
        text="Get Started"
        bgColor="#FDE2A1"
      />
    </View>
  );
};

export default SwipeList;
