import Script from "next/script";
import { useState } from "react";
import Loading from "@components/loading/Loading";
import { useNewSeries } from "@hooks/workouts/useNewSeries";
import SeriesForm from "./SeriesForm";
import { saveNewSeries } from "@models/Workouts/createUtils";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { WorkoutSeries } from "@models/Workouts/Series";
import { seriesEditorKeys } from "./SeriesSelector";
import SeriesHome from "./Home";

interface Props {
  selectedSeries?: WorkoutSeries;
  selectedFormValue: seriesEditorKeys;
  uid: string;
  mode: "edit" | "new";
  onBack: () => void;
  onNext: (
    cur: seriesEditorKeys,
    value: string | CloudinaryMedia | undefined | number
  ) => void;
  navToSelector: () => void;
  onEditSeries: (series?: WorkoutSeries) => void;
}

export type editorQueryKeys = "section" | "eventId" | "leaderKey" | "action";

const SeriesEditor: React.FC<Props> = ({
  selectedFormValue,
  // setForm,
  selectedSeries,
  uid,
  onNext,
  mode,
  onBack,
  navToSelector,
  onEditSeries,
}) => {
  const {
    newSeries,
    onMediaDelete,
    onMediaUpload,
    onUpdateName,
    onCostUpdate,
    onUpdateDescription,
    onEquipmentNeeded,
    onGoalUpdate,
    onGoodFor,
    onKeyChange,
  } = useNewSeries(uid, mode === "edit", selectedSeries);

  const onSaveSeries = async () => {
    if (newSeries && typeof newSeries.cost === "number") {
      // console.log("newSeries", newSeries);
      await saveNewSeries(newSeries);
      onNext("cost", newSeries.cost);
    }
  };

  // console.log("selectedSeries", selectedSeries);

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
        <div className="flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : newSeries && selectedFormValue !== "home" ? (
        <div className="h-full w-full flex justify-center items-center">
          <SeriesForm
            currentSeries={newSeries}
            currentVisible={selectedFormValue}
            onBack={onBack}
            onUpdateName={onUpdateName}
            onUpdateDescription={onUpdateDescription}
            onCostUpdate={onCostUpdate}
            onMediaDelete={onMediaDelete}
            onMediaUpload={onMediaUpload}
            onNext={onNext}
            onSave={onSaveSeries}
            onEquipmentNeeded={onEquipmentNeeded}
            onGoalUpdate={onGoalUpdate}
            onGoodFor={onGoodFor}
            onKeyChange={onKeyChange}
            seriesKey={newSeries.seriesKey}
            seriesId={newSeries.id}
          />
        </div>
      ) : newSeries && selectedFormValue === "home" ? (
        <SeriesHome
          description={newSeries.description}
          thumbnail={newSeries.thumbnail}
          navToSelector={navToSelector}
          onEdit={() => onEditSeries(newSeries)}
          // onEdit={() => {}}
          cost={newSeries?.cost}
          name={newSeries?.name}
          seriesId={newSeries.id}
          seriesKey={newSeries.seriesKey}
        />
      ) : null}
    </div>
  );
};

export default SeriesEditor;
