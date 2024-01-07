// import { formLabelValues } from "@components/drawers/constants";
// import { EventInterface } from "@models/Event/Event";
import { useSeriesKey } from "@hooks/editEvent/useSeriesKey";
import { generateEventKey } from "@models/Event/createUtils";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { WorkoutSeries } from "@models/Workouts/Series";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
import CollectPrice from "@templates/editEvent/Form/CollectPrice";
// import AddMembers from "@templates/editEvent/Form/MemberAdder/AddMembers";
import TextEntry from "@templates/editEvent/Form/TextEntry";
// import SeriesHome from "./Home";
import { seriesEditorKeys } from "./SeriesSelector";
// import { SetStateAction, Dispatch } from "react";
// import { seriesEditorKeys } from "./SeriesEditor";

interface Props {
  currentVisible: seriesEditorKeys;
  currentSeries: WorkoutSeries;
  onUpdateName: (newName: string) => void;
  onUpdateDescription: (newDesc: string) => void;
  onCostUpdate: (newCost: number) => void;
  onMediaUpload: (newMedia: CloudinaryMedia) => void;
  onMediaDelete: () => void;
  onNext: (
    currVis: seriesEditorKeys,
    value: string | CloudinaryMedia | undefined
  ) => void;
  seriesId: string;
  seriesKey: string;
  //   toCopyEvent: EventInterface | undefined;
  //   uid: string;
  //   setToCopyEvent: Dispatch<SetStateAction<EventInterface | undefined>>;
  onBack?: () => void;
  onSave: () => void;

  onEquipmentNeeded: (newName: string) => void;
  onKeyChange: (newName: string) => void;
  onGoalUpdate: (newName: string) => void;
  onGoodFor: (newName: string) => void;

  //   onSave: (members: { [memberId: string]: boolean }) => void;
}

const SeriesForm: React.FC<Props> = ({
  currentVisible,
  currentSeries,
  //   toCopyEvent,
  //   setToCopyEvent,
  seriesId,
  onBack,
  onUpdateName,
  onUpdateDescription,
  onCostUpdate,
  onMediaUpload,
  onMediaDelete,
  onNext,
  onSave,
  onGoodFor,
  onEquipmentNeeded,
  onGoalUpdate,
  onKeyChange,
  seriesKey,
  //   onSave,
}) => {
  //   const { toCopyEvent, setToCopyEvent } = useEventTopCopy(localUser.uid);

  const { keyValid } = useSeriesKey(seriesKey, seriesId);
  const onNoKey = () => {
    if (currentSeries.name && !currentSeries.seriesKey) {
      onKeyChange(generateEventKey(currentSeries.name));
    }

    onNext("name", currentSeries?.name);
  };

  return (
    <div className="">
      {currentVisible === "name" ? (
        <TextEntry
          inputMode="text"
          heading="What's your workout series called?"
          placeholder="Type here"
          helperText={`*Example - Lose 3kg in 3 weeks`}
          value={currentSeries?.name}
          onChangeText={onUpdateName}
          buttonText="Next"
          leftButtonText="Back"
          leftButtonOnPress={onBack}
          onButtonPress={onNoKey}
        />
      ) : currentVisible === "description" ? (
        <TextEntry
          inputMode="text"
          heading="Briefly descibe your program"
          placeholder="Type here"
          helperText={`*Explain what is special and unique to these workouts`}
          value={currentSeries?.description}
          onChangeText={onUpdateDescription}
          buttonText="Next"
          leftButtonText="Back"
          leftButtonOnPress={onBack}
          multiline={true}
          onButtonPress={() =>
            onNext("description", currentSeries?.description)
          }
        />
      ) : currentVisible === "seriesThumbnail" ? (
        <>
          {/* <CloudinaryWidget
            media={[currentSeries?.thumbnail]}
            heading="Add Series cover image"
            helperText="This will be your thumbail"
            onUpload={onMediaUpload}
            onDelete={onMediaDelete}
            onNext={() => onNext("seriesThumbnail", currentSeries?.thumbnail)}
            backButtonText="Back"
            backButtonPress={onBack}
            maxFiles={1}
            multiple={false}
          /> */}
        </>
      ) : currentVisible === "goodFor" ? (
        <TextEntry
          inputMode="text"
          heading="What is the series good for?"
          placeholder="Type here"
          helperText={`*Examole - Fully body endurance, Functional strength, flexibility`}
          value={currentSeries?.goodFor ? currentSeries?.goodFor : ""}
          onChangeText={onGoodFor}
          buttonText="Next"
          leftButtonText="Back"
          leftButtonOnPress={onBack}
          multiline={true}
          onButtonPress={() => onNext("goodFor", currentSeries?.goodFor)}
        />
      ) : currentVisible === "equipmentNeeded" ? (
        <TextEntry
          inputMode="text"
          heading="What equipment will you need?"
          placeholder="Type here"
          helperText={`*Example - Yoga mat, dumbles, skipping rope.`}
          value={
            currentSeries?.equipmentNeeded ? currentSeries?.equipmentNeeded : ""
          }
          onChangeText={onEquipmentNeeded}
          buttonText="Next"
          leftButtonText="Back"
          leftButtonOnPress={onBack}
          multiline={true}
          onButtonPress={() =>
            onNext("equipmentNeeded", currentSeries?.equipmentNeeded)
          }
        />
      ) : currentVisible === "workoutGoal" ? (
        <TextEntry
          inputMode="text"
          heading="What will you achieve?"
          placeholder="Type here"
          helperText={`*Example - You will lose 3 kgs in 30 days.`}
          value={currentSeries?.workoutGoal ? currentSeries?.workoutGoal : ""}
          onChangeText={onGoalUpdate}
          buttonText="Next"
          leftButtonText="Back"
          leftButtonOnPress={onBack}
          multiline={true}
          onButtonPress={() =>
            onNext("workoutGoal", currentSeries?.workoutGoal)
          }
        />
      ) : currentVisible === "seriesKey" ? (
        <TextEntry
          inputMode="text"
          heading="Your desired URL?"
          placeholder="Type here"
          helperText={
            keyValid
              ? `https://socialboat.live/workout/${seriesKey}`
              : "This URL is already in use. Please try something else"
          }
          value={seriesKey}
          warning={!keyValid}
          onChangeText={onKeyChange}
          buttonText="Save and Next"
          leftButtonText="Back"
          leftButtonOnPress={onBack}
          onButtonPress={() => {
            if (keyValid) {
              onNext("seriesKey", seriesKey ? seriesKey : "");
            }
          }}
        />
      ) : currentVisible === "cost" ? (
        <CollectPrice
          heading="What's the cost?"
          placeholder="Type here"
          helperText={``}
          currency="₹"
          onCurrencyChange={() => {}}
          suffix=""
          leftButtonText="Back"
          leftButtonOnPress={onBack}
          value={currentSeries?.cost ? currentSeries?.cost : 0}
          onValueChange={onCostUpdate}
          buttonText="Save and Next"
          onButtonPress={onSave}
        />
      ) : null}
    </div>
  );
};

export default SeriesForm;

// Take event name
// Add event description
// Add event media
// Add event cost
// Done
