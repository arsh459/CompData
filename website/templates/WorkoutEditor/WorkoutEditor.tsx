import Script from "next/script";
import { useState } from "react";
import Loading from "@components/loading/Loading";
import { saveNewWorkout } from "@models/Workouts/createUtils";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { useNewWorkout } from "@hooks/workouts/useNewWorkout";
import { Workout } from "@models/Workouts/Workout";
import { workoutEditorKeys } from "./WorkoutEditorHolder";
import WorkoutForm from "./WorkoutForm";

interface Props {
  selectedWorkout?: Workout;
  selectedFormValue: workoutEditorKeys;
  seriesId: string;
  initDay: number;
  onBack: () => void;
  onNavOut: () => void;
  seriesKey?: string;
  onNext: (
    cur: workoutEditorKeys,
    value: string | CloudinaryMedia | undefined | boolean | number
  ) => void;
  uid: string;
}

export type editorQueryKeys = "section" | "eventId" | "leaderKey" | "action";

const WorkoutEditor: React.FC<Props> = ({
  selectedFormValue,
  initDay,
  selectedWorkout,
  uid,
  onNext,
  //   mode,
  seriesId,
  onBack,
  onNavOut,
  seriesKey,
}) => {
  const {
    newWorkout,
    onMediaDelete,
    onUpdateName,
    onMediaUpload,
    onUpdateDescription,
    isFreeUpdate,
    onCalorieUpdate,
    onDayUpdate,
    onEquipmentNeeded,
    onKeyChange,
  } = useNewWorkout(
    uid,
    selectedWorkout ? true : false,
    selectedWorkout,
    initDay
  );

  const onSaveWorkout = async () => {
    if (newWorkout) {
      setLoading(true);

      await saveNewWorkout(seriesId, newWorkout);
      onNavOut();

      //   onNext(, newSeries.cost);
    }
  };

  console.log("newWorkout", newWorkout, seriesKey);

  // const { teamEvent } = useEditEventExists(remoteEvent?.id, user?.uid);

  const [loading, setLoading] = useState<boolean>(false);

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
      ) : newWorkout && seriesKey ? (
        <div className="flex justify-center items-center w-full h-full">
          <WorkoutForm
            currentWorkout={newWorkout}
            currentVisible={selectedFormValue}
            onBack={onBack}
            onUpdateName={onUpdateName}
            onUpdateDescription={onUpdateDescription}
            onFreeUpdate={isFreeUpdate}
            onMediaDelete={onMediaDelete}
            onEquipmentNeeded={onEquipmentNeeded}
            onMediaUpload={onMediaUpload}
            onNext={onNext}
            onSave={onSaveWorkout}
            onCalorieUpdate={onCalorieUpdate}
            onDayUpdate={onDayUpdate}
            seriesId={seriesId}
            onKeyChange={onKeyChange}
            seriesKey={seriesKey}
            // seriesId={newSeries.id}
          />
        </div>
      ) : null}
    </div>
  );
};

export default WorkoutEditor;
