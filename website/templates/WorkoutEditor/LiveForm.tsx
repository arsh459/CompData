import { useLiveKey } from "@hooks/editEvent/useLiveKey";
// import { useNutritionKey } from "@hooks/editEvent/useNutritionKey";
import { generateEventKey } from "@models/Event/createUtils";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { LiveClass } from "@models/Workouts/LiveClass";
// import { NutritionPlan } from "@models/Workouts/NutritionPlan";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
import CollectPrice from "@templates/editEvent/Form/CollectPrice";
// import DateTimeSelector from "@templates/editEvent/Form/DateTimeSelector/DateTimeSelector";
import TextEntry from "@templates/editEvent/Form/TextEntry";
import CheckboxEntry from "./CheckboxEntry";
import DaySelector from "./DaySelector";
// import DaySelector from "./DaySelector";
import { liveEditorKeys } from "./LiveEditorHolder";
import SlotSelector from "./SlotSelector";
// import { nutritionEditorKeys } from "./NutritionEditorHolder";

interface Props {
  currentVisible: liveEditorKeys;
  currentPlan: LiveClass;
  onUpdateName: (newName: string) => void;
  onUpdateDescription: (newDesc: string) => void;
  onLinkUpdate: (newEquip: string) => void;
  onFreeUpdate: (isFree: boolean) => void;
  onMediaUpload: (newMedia: CloudinaryMedia | AWSMedia) => void;
  onMediaDelete: () => void;
  onNext: (
    currentVisible: liveEditorKeys,
    value: string | undefined | boolean | number | string[] | number[],
    media?: CloudinaryMedia
  ) => void;
  onCalorieUpdate: (calories: number) => void;
  onDurationUpdate: (minutes: number) => void;
  onBack?: () => void;
  onSave: () => void;
  seriesId: string;
  onKeyChange: (newKey: string) => void;
  seriesKey: string;
  onSlotsAdd: (newSlot: string) => void;
  onSlotsDelete: (index: number) => void;
  onSlotUpdate: (value: string, index: number) => void;
  onDaysUpdate: (days: number) => void;
  onSlotSet: (newSlots: string[]) => void;
  // onDaysRemove: (days: number) => void;
}

const LiveForm: React.FC<Props> = ({
  currentVisible,
  currentPlan,
  seriesId,
  onFreeUpdate,
  onCalorieUpdate,
  onDurationUpdate,
  onLinkUpdate,
  seriesKey,
  onBack,
  onUpdateName,
  onUpdateDescription,
  onMediaUpload,
  onMediaDelete,
  onNext,
  onSave,
  onKeyChange,
  onSlotsAdd,
  onSlotUpdate,
  onSlotsDelete,
  onDaysUpdate,
  onSlotSet,
}) => {
  const { keyValid } = useLiveKey(
    currentPlan.liveKey,
    currentPlan.id,
    seriesId
  );

  // console.log("keyValid", keyValid);

  const onNoKey = () => {
    if (currentPlan.name && !currentPlan.liveKey) {
      onKeyChange(generateEventKey(currentPlan.name));
    }

    onNext("name", currentPlan?.name);
  };

  return (
    <>
      <div className="flex justify-center w-full ">
        <div className="">
          {currentVisible === "name" ? (
            <TextEntry
              inputMode="text"
              heading="Heading for Day's live?"
              placeholder="Type here"
              helperText={`*Leg buster workout`}
              value={currentPlan?.name}
              onChangeText={onUpdateName}
              buttonText="Next"
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              onButtonPress={onNoKey}
            />
          ) : currentVisible === "description" ? (
            <TextEntry
              inputMode="text"
              heading="Briefly describe what is today's session about"
              placeholder="Type here"
              helperText={`*For example - Today we will focus on legs`}
              value={currentPlan?.description}
              onChangeText={onUpdateDescription}
              buttonText="Next"
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              multiline={true}
              onButtonPress={() =>
                onNext("description", currentPlan?.description)
              }
            />
          ) : currentVisible === "media" ? (
            <>
              {/* <CloudinaryWidget
                media={[currentPlan?.media]}
                heading="Add a cover video/image"
                helperText="This is a placeholder thumbnail for the page people will visit"
                onUpload={onMediaUpload}
                onDelete={onMediaDelete}
                onNext={() => onNext("media", undefined, currentPlan?.media)}
                backButtonText="Back"
                backButtonPress={onBack}
                maxFiles={1}
                multiple={false}
              /> */}
            </>
          ) : currentVisible === "isFree" ? (
            <CheckboxEntry
              heading="Is this a demo class?"
              label="is Free"
              helperText={`*Giving demo classes encourages people to convert`}
              value={currentPlan?.isFree}
              onChangeValue={onFreeUpdate}
              buttonText="Next"
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              onButtonPress={() => onNext("isFree", currentPlan?.isFree)}
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
              value={currentPlan?.calories ? currentPlan?.calories : 0}
              onValueChange={onCalorieUpdate}
              buttonText="Next"
              onButtonPress={() => onNext("calories", currentPlan?.calories)}
            />
          ) : currentVisible === "liveKey" ? (
            <TextEntry
              inputMode="text"
              heading="Your desired URL?"
              placeholder="Type here"
              helperText={
                keyValid
                  ? `https://socialboat.live/workout/${seriesKey}/lives/${currentPlan.liveKey}`
                  : "This URL is already in use. Please try something else"
              }
              value={currentPlan.liveKey}
              warning={!keyValid}
              onChangeText={onKeyChange}
              buttonText="Next"
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              onButtonPress={() => {
                if (keyValid) {
                  onNext(
                    "liveKey",
                    currentPlan.liveKey ? currentPlan.liveKey : ""
                  );
                }
              }}
            />
          ) : currentVisible === "link" ? (
            <TextEntry
              inputMode="text"
              heading="Zoom/Meet Link for people to join?"
              placeholder="Type here"
              helperText={`*Example - DM us on WhatsApp if you want free Zoom`}
              value={currentPlan?.link ? currentPlan?.link : ""}
              onChangeText={onLinkUpdate}
              buttonText="Next"
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              multiline={true}
              onButtonPress={() => onNext("link", currentPlan?.link)}
            />
          ) : currentVisible === "duration" ? (
            <CollectPrice
              heading="How long is the session?"
              placeholder="Type here"
              helperText={``}
              currency="Minutes:"
              onCurrencyChange={() => {}}
              suffix=""
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              value={currentPlan?.duration ? currentPlan?.duration : 0}
              onValueChange={onDurationUpdate}
              buttonText="Save and Next"
              onButtonPress={() => onNext("duration", currentPlan?.duration)}
            />
          ) : currentVisible === "slots" ? (
            <SlotSelector
              heading="What are the time slots?"
              leftButtonText="Add slot"
              onSlotSet={onSlotSet}
              // leftButtonOnPress={() => {}}
              onSlotsAdd={onSlotsAdd}
              onSlotsDelete={onSlotsDelete}
              onSlotUpdate={onSlotUpdate}
              slots={currentPlan.slots ? currentPlan.slots : []}
              buttonText="Save and Next"
              duration={currentPlan?.duration ? currentPlan?.duration : 0}
              onButtonPress={() => onNext("slots", currentPlan.slots)}
              helperText=""
            />
          ) : currentVisible === "days" ? (
            <DaySelector
              heading="Select all applicable days?"
              leftButtonText="Add slot"
              // leftButtonOnPress={() => {}}
              // onSlotsAdd={onSlotsAdd}
              // onSlotsDelete={onSlotsDelete}
              // onSlotUpdate={onSlotUpdate}
              selDays={currentPlan.days ? currentPlan.days : []}
              onDaysUpdate={onDaysUpdate}
              // onDaysRemove={onDaysRemove}
              // slots={currentPlan.slots ? currentPlan.slots : []}
              buttonText="Save and Next"
              onButtonPress={onSave}
              helperText=""
            />
          ) : null}
        </div>
        <div className="" />
      </div>
      <div></div>
    </>
  );
};

export default LiveForm;

// Take event name
// Add event description
// Add event media
// Add event cost
// Done
