import Script from "next/script";
import { useState } from "react";
import Loading from "@components/loading/Loading";
import { saveNewLive } from "@models/Workouts/createUtils";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { useNewWorkout } from "@hooks/workouts/useNewWorkout";
// import { Workout } from "@models/Workouts/Workout";
// import { workoutEditorKeys } from "./WorkoutEditorHolder";
// import WorkoutForm from "./WorkoutForm";
import { useNewLive } from "@hooks/workouts/useNewLive";
import { LiveClass } from "@models/Workouts/LiveClass";
import LiveForm from "./LiveForm";
import { liveEditorKeys } from "./LiveEditorHolder";

interface Props {
  selectedLive?: LiveClass;
  selectedFormValue: liveEditorKeys;
  seriesId: string;
  onBack: () => void;
  onNavOut: () => void;
  seriesKey?: string;
  // initDay: number;
  onNext: (
    cur: liveEditorKeys,
    value: string | undefined | boolean | number | string[] | number[],
    media?: CloudinaryMedia
  ) => void;
  uid: string;
}

// export type editorQueryKeys = "section" | "eventId" | "leaderKey" | "action";

const LiveEditor: React.FC<Props> = ({
  selectedFormValue,
  // setForm,
  selectedLive,
  uid,
  onNext,
  //   mode,
  seriesId,
  onBack,
  onNavOut,
  seriesKey,
  // initDay,
}) => {
  const {
    newLive,
    onMediaDelete,
    onUpdateName,
    onMediaUpload,
    onUpdateDescription,
    isFreeUpdate,
    onCalorieUpdate,
    onDurationUpdate,
    onLinkUpdate,
    onKeyChange,
    onSlotUpdate,
    onSlotsAdd,
    onSlotsDelete,
    onDaysUpdate,
    onSlotSet,
    // onDaysRemove,
  } = useNewLive(uid, selectedLive ? true : false, selectedLive);

  const onSaveNutrition = async () => {
    if (newLive) {
      setLoading(true);

      await saveNewLive(seriesId, newLive);
      onNavOut();

      //   onNext(, newSeries.cost);
    }
  };

  // console.log("newWorkout", newWorkout);

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
      ) : newLive && seriesKey ? (
        <div className="flex justify-center items-center w-full h-full">
          <LiveForm
            currentPlan={newLive}
            currentVisible={selectedFormValue}
            onBack={onBack}
            onUpdateName={onUpdateName}
            onUpdateDescription={onUpdateDescription}
            onFreeUpdate={isFreeUpdate}
            onMediaDelete={onMediaDelete}
            onLinkUpdate={onLinkUpdate}
            onMediaUpload={onMediaUpload}
            onNext={onNext}
            onSave={onSaveNutrition}
            onDaysUpdate={onDaysUpdate}
            onSlotSet={onSlotSet}
            onCalorieUpdate={onCalorieUpdate}
            onDurationUpdate={onDurationUpdate}
            seriesId={seriesId}
            onKeyChange={onKeyChange}
            seriesKey={seriesKey}
            onSlotsAdd={onSlotsAdd}
            onSlotsDelete={onSlotsDelete}
            onSlotUpdate={onSlotUpdate}
            // onDaysRemove={onDaysRemove}
            // seriesId={newSeries.id}
          />
        </div>
      ) : null}
    </div>
  );
};

export default LiveEditor;
