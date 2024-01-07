import { useVideoKey } from "@hooks/editEvent/useVideoKey";
import { generateEventKey } from "@models/Event/createUtils";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Workout } from "@models/Workouts/Workout";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
import CollectPrice from "@templates/editEvent/Form/CollectPrice";
import TextEntry from "@templates/editEvent/Form/TextEntry";
import CheckboxEntry from "./CheckboxEntry";
import { workoutEditorKeys } from "./WorkoutEditorHolder";

interface Props {
  currentVisible: workoutEditorKeys;
  currentWorkout: Workout;
  onUpdateName: (newName: string) => void;
  onUpdateDescription: (newDesc: string) => void;
  onEquipmentNeeded: (newEquip: string) => void;
  onFreeUpdate: (isFree: boolean) => void;
  onMediaUpload: (newMedia: CloudinaryMedia | AWSMedia) => void;
  onMediaDelete: () => void;
  onNext: (
    currVis: workoutEditorKeys,
    value: string | CloudinaryMedia | undefined | boolean | number
  ) => void;
  onCalorieUpdate: (calories: number) => void;
  onDayUpdate: (day: number) => void;
  //   seriesId: string;
  //   toCopyEvent: EventInterface | undefined;
  //   uid: string;
  //   setToCopyEvent: Dispatch<SetStateAction<EventInterface | undefined>>;
  onBack?: () => void;
  onSave: () => void;
  seriesId: string;
  onKeyChange: (newKey: string) => void;
  seriesKey: string;

  //   onSave: (members: { [memberId: string]: boolean }) => void;
}

const WorkoutForm: React.FC<Props> = ({
  currentVisible,
  currentWorkout,
  seriesId,
  onFreeUpdate,
  onCalorieUpdate,
  onDayUpdate,
  onEquipmentNeeded,
  seriesKey,
  //   toCopyEvent,
  //   setToCopyEvent,
  //   seriesId,
  onBack,
  onUpdateName,
  onUpdateDescription,
  //   onCostUpdate,
  onMediaUpload,
  onMediaDelete,
  onNext,
  onSave,
  onKeyChange,
  //   onSave,
}) => {
  //   const { toCopyEvent, setToCopyEvent } = useEventTopCopy(localUser.uid);

  const { keyValid } = useVideoKey(
    currentWorkout.videoKey,
    currentWorkout.id,
    seriesId
  );

  const onNoKey = () => {
    if (currentWorkout.name && !currentWorkout.videoKey) {
      onKeyChange(generateEventKey(currentWorkout.name));
    }

    onNext("name", currentWorkout?.name);
  };

  return (
    <>
      <div className="flex justify-center w-full ">
        <div className="">
          {currentVisible === "name" ? (
            <TextEntry
              inputMode="text"
              heading="Name of workout/exercise?"
              placeholder="Type here"
              helperText={`*EMOM workout, Tabata day etc.`}
              value={currentWorkout?.name}
              onChangeText={onUpdateName}
              buttonText="Next"
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              onButtonPress={onNoKey}
            />
          ) : currentVisible === "description" ? (
            <TextEntry
              inputMode="text"
              heading="Brief decription about the workout"
              placeholder="Type here"
              helperText={`*You can specify reps, intensity in or tips here`}
              value={currentWorkout?.description}
              onChangeText={onUpdateDescription}
              buttonText="Next"
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              multiline={true}
              onButtonPress={() =>
                onNext("description", currentWorkout?.description)
              }
            />
          ) : currentVisible === "media" ? (
            <>
              {/* <CloudinaryWidget
                media={[currentWorkout?.media]}
                heading="Add Workout video"
                helperText="This will be the exercise video"
                onUpload={onMediaUpload}
                onDelete={onMediaDelete}
                onNext={() => onNext("media", currentWorkout?.media)}
                backButtonText="Back"
                backButtonPress={onBack}
                maxFiles={1}
                multiple={false}
              /> */}
            </>
          ) : currentVisible === "isFree" ? (
            <CheckboxEntry
              //   inputMode="text"
              heading="Is this a Free video?"
              //   placeholder="Type here"
              label="is Free"
              helperText={`*Free videos can be a good way for people to try your plan`}
              value={currentWorkout?.isFree}
              onChangeValue={onFreeUpdate}
              buttonText="Next"
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              //   multiline={true}
              onButtonPress={() => onNext("isFree", currentWorkout?.isFree)}
            />
          ) : currentVisible === "equipmentNeeded" ? (
            <TextEntry
              inputMode="text"
              heading="What equipment will you need?"
              placeholder="Type here"
              helperText={`*Example - Yoga mat, dumbles, skipping rope.`}
              value={
                currentWorkout?.equipmentNeeded
                  ? currentWorkout?.equipmentNeeded
                  : ""
              }
              onChangeText={onEquipmentNeeded}
              buttonText="Next"
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              multiline={true}
              onButtonPress={() =>
                onNext("equipmentNeeded", currentWorkout?.equipmentNeeded)
              }
            />
          ) : currentVisible === "calories" ? (
            <CollectPrice
              heading="How many calories will one burn?"
              placeholder="Type here"
              helperText={`A brief estimate. This will be updated in users progress`}
              // currency="₹"
              onCurrencyChange={() => {}}
              suffix=""
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              value={currentWorkout?.calories ? currentWorkout?.calories : 0}
              onValueChange={onCalorieUpdate}
              buttonText="Next"
              onButtonPress={() => onNext("calories", currentWorkout?.calories)}
            />
          ) : currentVisible === "videoKey" ? (
            <TextEntry
              inputMode="text"
              heading="Your desired URL?"
              placeholder="Type here"
              helperText={
                keyValid
                  ? `https://socialboat.live/workout/${seriesKey}/${currentWorkout.videoKey}`
                  : "This URL is already in use. Please try something else"
              }
              value={currentWorkout.videoKey}
              warning={!keyValid}
              onChangeText={onKeyChange}
              buttonText="Next"
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              onButtonPress={() => {
                if (keyValid) {
                  onNext(
                    "videoKey",
                    currentWorkout.videoKey ? currentWorkout.videoKey : ""
                  );
                }
              }}
            />
          ) : currentVisible === "day" ? (
            <CollectPrice
              heading="Which day is the workout for?"
              placeholder="Type here"
              helperText={`We will group your activities for the day.`}
              currency="Day"
              onCurrencyChange={() => {}}
              suffix=""
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              value={currentWorkout?.day ? currentWorkout?.day : 0}
              onValueChange={onDayUpdate}
              buttonText="Save and Next"
              onButtonPress={onSave}
            />
          ) : null}
        </div>
        <div className="" />
      </div>
      <div></div>
    </>
  );
};

export default WorkoutForm;

// Take event name
// Add event description
// Add event media
// Add event cost
// Done
