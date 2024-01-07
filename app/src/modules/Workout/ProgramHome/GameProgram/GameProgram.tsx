import { downIconWhite } from "@constants/imageKitURL";
import { dateObject, SelectedType } from "@hooks/program/useProgramTasks";
import { useEffect, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SelectMonthModal from "./SelectMonthModal";
import DaysScroll from "./DaysScroll";
// import LevelWise from "./LevelWise";
import { useUserContext } from "@providers/user/UserProvider";
import { useGameContext } from "@providers/game/GameProvider";

interface Props {
  selectedLevel: number;
  setLevel: (newLevel: number) => void;
  selectedDay?: dateObject;
  setDay: (val: dateObject) => void;
  browseBy: SelectedType;
  setBrowseBy: (val: SelectedType) => void;
}
const GameProgram: React.FC<Props> = ({
  browseBy,
  setBrowseBy,
  selectedDay,
  setDay,
  selectedLevel,
  setLevel,
}) => {
  const { user } = useUserContext();
  const { monthParams } = useGameContext();
  const [isOpen, setIsOpen] = useState(false);

  const [selectedMonth, setMonth] = useState<string>("");

  useEffect(() => {
    setMonth(
      monthParams?.nowObj?.monthName
        ? monthParams.nowObj.monthName
        : monthParams?.defaultObj
        ? monthParams.defaultObj.monthName
        : ""
    );
  }, [monthParams]);

  return (
    <View className="flex flex-1 pb-3">
      {browseBy === "yourProgram" && monthParams?.rangeDate ? (
        <LinearGradient colors={["#100F1A", "#100F1A"]}>
          <Pressable
            onPress={() => setIsOpen(true)}
            className=" m-4 px-4 py-1.5 text-lg rounded-lg bg-[#FFFFFF26] flex flex-row justify-between items-center"
          >
            <Text
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
              className="text-white text-base "
            >
              {selectedMonth ? selectedMonth : "Select Month"}
            </Text>

            <Image
              source={{
                uri: downIconWhite,
              }}
              className="w-4 h-4"
              resizeMode="contain"
            />
          </Pressable>
          <SelectMonthModal
            daysArray={monthParams.rangeDate}
            selectedMonth={selectedMonth}
            setMonth={setMonth}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <DaysScroll
            daysArray={monthParams.rangeDate}
            nowObj={monthParams?.nowObj}
            selectedDay={selectedDay?.formattedDate}
            setDay={setDay}
            dayPointObj={user?.dayPointObj}
            selectedMonth={selectedMonth}
            setMonth={setMonth}
          />
        </LinearGradient>
      ) : browseBy === "all" ? (
        <LinearGradient colors={["#E6F1FA", "#E7F1FD"]} className=" py-2 mb-2">
          {/* <LevelWise selectedLevel={selectedLevel} setLevel={setLevel} /> */}
        </LinearGradient>
      ) : null}
    </View>
  );
};
export default GameProgram;
