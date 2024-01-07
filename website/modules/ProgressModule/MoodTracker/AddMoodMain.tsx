import { UserInterface } from "@models/User/User";
import ProgressHeader from "@modules/ProgressModule/Components/ProgressHeader";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { useTodayDate } from "@hooks/myProgram/useTodayDate";
import useLatestProgressByType from "@hooks/progress/useLatestProgressByType";
import MoodEmojiToAdd from "./MoodEmojiToAdd";
import { saveToFirebase } from "../utils/chartUtils";
interface Props {
  remoteUser: UserInterface | undefined;
}
const AddMoodMain: React.FC<Props> = ({ remoteUser }) => {
  const router = useRouter();
  const { todayUnix } = useTodayDate();
  const { data } = useLatestProgressByType(
    "mood",
    "dailyMood",
    remoteUser?.uid
  );
  const onBack = () => {
    router.back();
  };
  const handleMoodSelect = (mood: number) => {
    setSelectedMood(mood);
  };
  const [selectDate, setSelectDate] = useState<Date>(new Date());

  const initialMood = data?.mood ? data.mood : 0;

  const [selectedMood, setSelectedMood] = useState(initialMood);

  const handleSaveDetails = async () => {
    if (remoteUser?.uid) {
      await saveToFirebase(
        "mood",
        "dailyMood",
        selectedMood,
        remoteUser.uid,
        selectDate
      );
    }
    onBack();
  };

  return (
    <div className="w-screen h-screen relative z-0">
      <div className="fixed inset-0 bg-[#F6F6F6] -z-10" />
      <div className="w-full max-w-screen-lg h-full mx-auto ">
        <ProgressHeader
          onBack={onBack}
          text={`${remoteUser?.name}'s Weight Journey `}
        />
        <div className="w-full h-2/5 flex-col justify-between max-w-md mx-auto relative z-0">
          <MoodEmojiToAdd
            handleMoodSelect={handleMoodSelect}
            selectedMood={selectedMood}
          />
          <div className="h-full py-20 flex flex-col justify-statr">
            <p className="text-[#7C3D5E] text-base font-nunitoSB t">Add Date</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                renderInput={(props) => <TextField {...props} />}
                maxDate={new Date(todayUnix)}
                value={selectDate}
                onChange={(newValue) => {
                  newValue && setSelectDate(newValue);
                }}
                OpenPickerButtonProps={{ sx: { color: "#FFBFDF" } }}
                InputProps={{ sx: { color: "#FFBFDF" } }}
                className="DateOfStartProgram "
              />
            </LocalizationProvider>
          </div>
          <div className="sticky bottom-10 w-full max-w-md mx-auto">
            <button
              className={clsx(
                "rounded-2xl  w-full  px-4 py-3 text-[#232136] font-popR text-base iphoneX:text-xl text-center",
                "bg-[#FFBFDF] text-black/70"
              )}
              onClick={handleSaveDetails}
            >
              Save Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMoodMain;
