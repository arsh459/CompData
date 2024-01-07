import Loading from "@components/loading/Loading";
import { useUserConfigTargets } from "@hooks/configs/useUserConfigTargets";
import {
  updateUserConfigFields,
  updateUserConfigRecommendation,
} from "@models/User/updateUtils";
import { UserInterface } from "@models/User/User";
import ProgressHeader from "@modules/ProgressModule/Components/ProgressHeader";
import NutritionTargetListTemplate from "@templates/RewardsTemplate/NutritionTargetListTemplate";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";
import HandleDate from "./HandleDate";
import SectionHeader from "./SectionHeader";
import TargetInputNumber from "./TargetInputNumber";
import TargetInputText from "./TargetInputText";
import axios from "axios";

interface Props {
  remoteUser: UserInterface | undefined;
}

const UserConfigModule: React.FC<Props> = ({ remoteUser }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const onBack = () => {
    router.push(`/admin/patients/${remoteUser?.uid}`);
  };
  const {
    localConfig,
    onBadgeIdUpdate,
    onNumberFieldsUpdate,
    onNutritionBadgeIdUpdate,
    onWorkoutTimeStrUpdate,
    selectDateCSD,
    selectDateNSD,
    selectDateWSD,
    setSelectDateCSD,
    setSelectDateNSD,
    setSelectDateWSD,
  } = useUserConfigTargets(remoteUser);
  const onSave = async () => {
    setLoading(true);
    const obj = {
      uid: remoteUser?.uid || "",
      dailyStepTarget: localConfig?.dailyStepTarget || 0,
      nutritionBadgeId: localConfig?.dietBadgeId || "",
      badgeId: localConfig?.workoutBadgeId || "",
      workoutTimeStr: localConfig?.workoutTimeStr || "",

      recommendationConfig: {
        ...remoteUser?.recommendationConfig,
        workoutTimeStr: localConfig?.workoutTimeStr,
        start: selectDateWSD.getTime(),
        nutritionStart: selectDateNSD.getTime(),
      },
      challengeJoined: selectDateCSD.getTime(),
    };

    if (remoteUser?.uid) {
      await updateUserConfigFields(
        obj.uid,
        obj.dailyStepTarget,
        obj.nutritionBadgeId,
        obj.badgeId
      );
      await updateUserConfigRecommendation(obj.uid, obj.recommendationConfig);
    }

    onBack();
  };
  const router = useRouter();

  const refreshUserProgress = async () => {
    if (remoteUser?.uid) {
      try {
        console.log(
          "url",
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/userProgressReconcile`
        );
        setLoading(true);
        const res = await axios({
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/userProgressReconcile`,
          method: "POST",
          params: { uid: remoteUser?.uid },
          data: { uid: remoteUser?.uid },
        });
        console.log("res", res);

        setLoading(false);
      } catch (error) {
        alert("Request failed");
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-screen h-screen relative z-0">
      <div className="fixed inset-0 bg-[#F6F6F6] -z-10" />
      <div className="w-full max-w-screen-lg h-full mx-auto ">
        <ProgressHeader
          onBack={onBack}
          text={`${remoteUser?.name}'s Profile`}
        />
        {loading ? (
          <div className="pt-8">
            <div className="flex justify-center items-center">
              <Loading fill="#ff735c" width={48} height={48} />
            </div>
          </div>
        ) : (
          <>
            <div className="   overflow-y-scroll">
              <div className="py-4">
                <SectionHeader heading="Controls" />
                <div className="p-4">
                  <div className="pl-0">
                    <p
                      onClick={refreshUserProgress}
                      className="text-green-500 text-sm cursor-pointer underline"
                    >
                      Refresh User Meters
                    </p>
                    <p className="text-xs font-light">
                      Will reconcile user progress
                    </p>
                  </div>
                </div>
              </div>
              <SectionHeader heading="Steps Section" />
              <TargetInputNumber
                currentValue={localConfig?.dailyStepTarget}
                onUpdate={(val) => onNumberFieldsUpdate(val, "dailyStepTarget")}
                heading="Daily Step Target"
              />
              <SectionHeader heading="Diet Section" />
              {/* <TargetInputNumber
            currentValue={localConfig?.dailyKCalTarget}
            onUpdate={(val) => onNumberFieldsUpdate(val, "dailyKCalTarget")}
            heading="Daily Kcal Target"
          /> */}
              {/* <TargetInputNumber
            currentValue={localConfig?.dailyProteinTarget}
            onUpdate={(val) => onNumberFieldsUpdate(val, "dailyProteinTarget")}
            heading="Daily Protein Target"
          />
          <TargetInputNumber
            currentValue={localConfig?.dailyCarbTarget}
            onUpdate={(val) => onNumberFieldsUpdate(val, "dailyCarbTarget")}
            heading="Daily Carb Target"
          />
          <TargetInputNumber
            currentValue={localConfig?.dailyFiberTarget}
            onUpdate={(val) => onNumberFieldsUpdate(val, "dailyFiberTarget")}
            heading="Daily Fibre Target"
          /> */}

              {selectDateNSD ? (
                <>
                  <p className="px-2 text-xs text-black/70 py-4 ">
                    Nutrition Start Date
                  </p>
                  <HandleDate
                    initialValue={selectDateNSD}
                    setSelectDate={setSelectDateNSD}
                  />
                </>
              ) : null}
              <TargetInputText
                currentValue={localConfig?.dietBadgeId}
                onUpdate={(val) => onNutritionBadgeIdUpdate(val)}
                heading="Diet Badge Selector"
              />
              <SectionHeader heading="Workout Section" />
              <div className="flex flex-col">
                {selectDateCSD ? (
                  <>
                    <p className="px-2 text-xs text-black/70 pt-4 ">
                      Challenge Start Date
                    </p>

                    <HandleDate
                      initialValue={selectDateCSD}
                      maxDate={new Date()}
                      setSelectDate={setSelectDateCSD}
                    />
                  </>
                ) : null}
                {selectDateWSD ? (
                  <>
                    <p className="px-2 text-xs text-black/70 pt-4 ">
                      Workout Start Date
                    </p>

                    <HandleDate
                      initialValue={selectDateWSD}
                      setSelectDate={setSelectDateWSD}
                    />
                  </>
                ) : null}
              </div>

              <TargetInputText
                currentValue={localConfig?.workoutTimeStr}
                onUpdate={(val) => onWorkoutTimeStrUpdate(val)}
                heading="Workout time In HH:MM"
              />
              <TargetInputText
                currentValue={localConfig?.dietBadgeId}
                onUpdate={(val) => onBadgeIdUpdate(val)}
                heading="Workout Badge Selector"
              />
            </div>
            <div>
              <NutritionTargetListTemplate uid={remoteUser?.uid} />
            </div>
          </>
        )}
        <div className="sticky bottom-10 w-full max-w-md mx-auto">
          <button
            className={clsx(
              "rounded-2xl  w-full  px-4 py-3 font-popM text-base iphoneX:text-xl text-center",
              " bg-[#FF52A6] text-white"
            )}
            onClick={onSave}
            disabled={loading}
          >
            {loading ? "Saving Details" : "Save Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserConfigModule;
