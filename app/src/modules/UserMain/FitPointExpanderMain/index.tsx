import { View } from "react-native";
import { useState } from "react";
import ExpanderHeader from "./ExpanderHeader";
import { useUserContext } from "@providers/user/UserProvider";
import Header from "@modules/Header";
import { getUserTotalFP } from "@modules/HomeScreen/utills/getUserTotalFP";
import ViewSelectorGeneric from "@components/ViewSelector/Generic/ViewSelectorGeneric";
import SepratorFpSection from "./SepratorFpSection";
import FpSectionListCard from "./FpSectionListCard";
import { returnTaskIcon } from "./utils";
import AllFitpoints from "./AllFitpoints";
import NutritionsFp from "./NutritionsFp";
import StepsFp from "./StepsFp";
import WorkoutsFp from "./WorkoutsFp";
import PurchasesFp from "./PurchasesFp";
import { pastActivityInterface } from "./hooks/useEarnedTaskSectionsAlgolia";
import { useActivitySync } from "./hooks/useActivitySync";
import Loading from "@components/loading/Loading";

export type selectedFpSectionType =
  | "All Fitpoints"
  | "Workouts"
  | "Nutrition"
  | "Steps"
  | "Purchases";

const FitPointExpanderMain = () => {
  const { user } = useUserContext();
  const [selectedView, setSelectedView] =
    useState<selectedFpSectionType>("All Fitpoints");

  const { loading } = useActivitySync();

  const views = [
    {
      label: "All Fitpoints",
      onPress: () => setSelectedView("All Fitpoints"),
    },
    {
      label: "Workouts",
      onPress: () => setSelectedView("Workouts"),
    },
    {
      label: "Nutrition",
      onPress: () => setSelectedView("Nutrition"),
    },
    {
      label: "Steps",
      onPress: () => setSelectedView("Steps"),
    },
    {
      label: "Purchases",
      onPress: () => setSelectedView("Purchases"),
    },
  ];

  return (
    <>
      <Header back={true} tone="dark" headerType="transparent" />
      <View className="bg-[#232136] flex-1">
        <ExpanderHeader
          fpStr={`${getUserTotalFP(user?.fpCredit, user?.fpDebit)} FP`}
        />
        {loading ? (
          <View className="flex justify-center items-center flex-1">
            <Loading fill="#ff735c" width="w-16" height="h-16" />
          </View>
        ) : (
          <>
            <ViewSelectorGeneric views={views} currView={selectedView} />
            {selectedView === "All Fitpoints" ? (
              <AllFitpoints />
            ) : selectedView === "Workouts" ? (
              <WorkoutsFp />
            ) : selectedView === "Nutrition" ? (
              <NutritionsFp />
            ) : selectedView === "Steps" ? (
              <StepsFp />
            ) : selectedView === "Purchases" ? (
              <PurchasesFp />
            ) : null}
          </>
        )}
      </View>
    </>
  );
};

export default FitPointExpanderMain;

export const renderSectionHeaderFpHome = ({
  section: { title },
}: {
  section: { title: string; data: pastActivityInterface[] };
}) => {
  return <SepratorFpSection text={title} />;
};

export const renderItemFpHome = ({ item }: { item: pastActivityInterface }) => {
  const icon = returnTaskIcon(item?.taskType);
  // console.log(item.name, item.attemptedDate);

  return <FpSectionListCard icon={icon} item={item} />;
};
