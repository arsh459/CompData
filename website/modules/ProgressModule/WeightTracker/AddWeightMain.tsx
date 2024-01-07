import { UserInterface } from "@models/User/User";
import ProgressHeader from "@modules/ProgressModule/Components/ProgressHeader";
import { TextField } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useTodayDate } from "@hooks/myProgram/useTodayDate";
import { updateUserWeight } from "./utils";
import { format } from "date-fns";
import { saveToFirebase } from "../utils/chartUtils";
import { useUserV2 } from "@hooks/auth/useUserV2";

interface Props {
  remoteUser: UserInterface | undefined;
}

const AddWeightMain: React.FC<Props> = ({ remoteUser }) => {
  const { user } = useUserV2(remoteUser?.uid);

  const router = useRouter();
  const { todayUnix } = useTodayDate();
  const [selectDate, setSelectDate] = useState<Date>(new Date());
  const onBack = () => {
    router.back();
  };
  const initialWeight = user?.weight ? user.weight : 0;

  console.log("user", user?.weight);
  const [currentWeight, setCurrentWeight] = useState<number>(initialWeight);

  useEffect(() => {
    setCurrentWeight(user?.weight ? user.weight : 0);
  }, [user?.weight]);

  const onChangeWeight = (newValue: string) => {
    if (parseFloat(newValue)) {
      setCurrentWeight(parseFloat(newValue));
    }
  };

  const handleSaveDetails = async () => {
    const isSame =
      format(new Date(selectDate), "yy-MM-dd") ===
      format(new Date(), "yy-MM-dd");

    // console.log("isSame", isSame, currentWeight);

    // await addWeightToPreviousDay(user?.uid, user?.weight);
    if (user?.uid) {
      await saveToFirebase(
        "weight",
        "dailyWeight",
        currentWeight,
        user.uid,
        selectDate
      );

      // if todays weight
      currentWeight &&
        //   initialWeight !== currentWeight &&
        isSame &&
        (await updateUserWeight(user.uid, currentWeight));
    }

    // onBack();
  };
  return (
    <div className="w-screen h-screen relative z-0">
      <div className="fixed inset-0 bg-[#F6F6F6] -z-10" />
      <div className="w-full max-w-screen-lg h-full mx-auto ">
        <ProgressHeader
          onBack={onBack}
          text={`${user?.name}'s Weight Journey `}
        />
        <div className="w-full h-2/5 flex-col justify-between max-w-md mx-auto relative z-0">
          <TextField
            style={{ width: "100%" }}
            InputProps={{
              style: { borderRadius: "12px", backgroundColor: "#FFF5FA" },
            }}
            placeholder={"Add weight in kgs"}
            label="Weight"
            onChange={(e) => onChangeWeight(e.target.value)}
            type="number"
            // value={text || ""}
            value={currentWeight.toString()}
          />
          {/* <SetWeightV2
            initialValue={remoteUser?.weight ? remoteUser.weight : 0}
            onNumberFieldsUpdate={(val: number) => console.log({ val })}
            target="weight"
            selected={currentWeight}
            setSelected={(val: number) => setCurrentWeight(val)}
          /> */}
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
              Save Weight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWeightMain;
