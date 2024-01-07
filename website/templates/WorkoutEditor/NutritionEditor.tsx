import Script from "next/script";
import { useState } from "react";
import Loading from "@components/loading/Loading";
// import { saveNewNutrition } from "@models/Workouts/createUtils";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { useNewWorkout } from "@hooks/workouts/useNewWorkout";
// import { Workout } from "@models/Workouts/Workout";
// import { workoutEditorKeys } from "./WorkoutEditorHolder";
// import WorkoutForm from "./WorkoutForm";
// import NutritionForm from "./NutritionForm";
import { nutritionEditorKeys } from "./NutritionEditorHolder";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";
import { useNewNutrition } from "@hooks/workouts/useNewNutrition";

interface Props {
  selectedPlan?: NutritionPlan;
  selectedFormValue: nutritionEditorKeys;
  seriesId: string;
  onBack: () => void;
  onNavOut: () => void;
  seriesKey?: string;
  initDay: number;
  onNext: (
    cur: nutritionEditorKeys,
    value: string | CloudinaryMedia | undefined | boolean | number
  ) => void;
  uid: string;
}

// export type editorQueryKeys = "section" | "eventId" | "leaderKey" | "action";

const NutritionEditor: React.FC<Props> = ({
  selectedFormValue,
  // setForm,
  selectedPlan,
  uid,
  onNext,
  //   mode,
  seriesId,
  onBack,
  onNavOut,
  seriesKey,
  initDay,
}) => {
  const {
    newNutrition,
    // onMediaDelete,
    // onUpdateName,
    // onMediaUpload,
    // onUpdateDescription,
    // isFreeUpdate,
    // onCalorieUpdate,
    // onDayUpdate,
    // onIngredientsNeeded,
    // onKeyChange,
  } = useNewNutrition(uid, selectedPlan ? true : false, selectedPlan, initDay);

  // const onSaveNutrition = async () => {
  //   if (newNutrition) {
  //     setLoading(true);

  //     await saveNewNutrition(seriesId, newNutrition);
  //     onNavOut();

  //     //   onNext(, newSeries.cost);
  //   }
  // };

  // console.log("newWorkout", newWorkout);

  // const { teamEvent } = useEditEventExists(remoteEvent?.id, user?.uid);

  const [loading] = useState<boolean>(false);

  return (
    <div className="h-full w-full py-8 px-4">
      <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      />
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : newNutrition && seriesKey ? (
        <div className="flex justify-center items-center w-full h-full">
          {/* <NutritionForm
            currentPlan={newNutrition}
            currentVisible={selectedFormValue}
            onBack={onBack}
            onUpdateName={onUpdateName}
            onUpdateDescription={onUpdateDescription}
            onFreeUpdate={isFreeUpdate}
            onMediaDelete={onMediaDelete}
            onIngredientsNeeded={onIngredientsNeeded}
            onMediaUpload={onMediaUpload}
            onNext={onNext}
            onSave={onSaveNutrition}
            onCalorieUpdate={onCalorieUpdate}
            onDayUpdate={onDayUpdate}
            seriesId={seriesId}
            onKeyChange={onKeyChange}
            seriesKey={seriesKey}
            // seriesId={newSeries.id}
          /> */}
        </div>
      ) : null}
    </div>
  );
};

export default NutritionEditor;
