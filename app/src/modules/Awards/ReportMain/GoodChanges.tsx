import ImageWithURL from "@components/ImageWithURL";
import ViewSelectorV4 from "@components/ViewSelector/V4";
import { Achiever } from "@models/Awards/interface";
import { useState } from "react";
import { View, Text } from "react-native";
import { handleReportResponse } from "./utils";

export interface Props {
  awardReport?: Achiever;
}

const GoodChanges: React.FC<Props> = ({ awardReport }) => {
  const [selectedView, setSelectedView] = useState<
    "Weight" | "Energy" | "Mood"
  >("Weight");

  const { text, icon, unit, value } = handleReportResponse(
    selectedView,
    0,
    0,
    0
  );

  return (
    <View className="bg-[#434066] rounded-xl aspect-[2]">
      <ViewSelectorV4
        view1="Weight"
        view2="Energy"
        view3="Mood"
        currView={selectedView}
        onView1={() => setSelectedView("Weight")}
        onView2={() => setSelectedView("Energy")}
        onView3={() => setSelectedView("Mood")}
        margin="m-0"
        bgColor="#5D588C"
        selectedColor="#8079BC"
      />
      <View className="flex-1 flex flex-row justify-evenly items-center p-4">
        <Text
          className="flex-1 text-white text-2xl"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {text}
          <Text className="text-[#51FF8C]">
            {" "}
            {value}
            {""}
            {unit}
          </Text>
        </Text>
        <View className="w-4 aspect-square" />
        <ImageWithURL
          source={{
            uri: icon,
          }}
          className="h-4/5 aspect-square"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default GoodChanges;
