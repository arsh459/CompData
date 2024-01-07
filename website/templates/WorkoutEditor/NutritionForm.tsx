import { useNutritionKey } from "@hooks/editEvent/useNutritionKey";
import { generateEventKey } from "@models/Event/createUtils";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";
import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
import CollectPrice from "@templates/editEvent/Form/CollectPrice";
import TextEntry from "@templates/editEvent/Form/TextEntry";
import CheckboxEntry from "./CheckboxEntry";
import { nutritionEditorKeys } from "./NutritionEditorHolder";

interface Props {
  currentVisible: nutritionEditorKeys;
  currentPlan: NutritionPlan;
  onUpdateName: (newName: string) => void;
  onUpdateDescription: (newDesc: string) => void;
  onIngredientsNeeded: (newEquip: string) => void;
  onFreeUpdate: (isFree: boolean) => void;
  onMediaUpload: (newMedia: CloudinaryMedia | AWSMedia) => void;
  onMediaDelete: () => void;
  onNext: (
    currentVisible: nutritionEditorKeys,
    value: string | CloudinaryMedia | undefined | boolean | number
  ) => void;
  onCalorieUpdate: (calories: number) => void;
  onDayUpdate: (day: number) => void;
  onBack?: () => void;
  onSave: () => void;
  seriesId: string;
  onKeyChange: (newKey: string) => void;
  seriesKey: string;
}

const NutritionForm: React.FC<Props> = ({
  currentVisible,
  currentPlan,
  seriesId,
  onFreeUpdate,
  onCalorieUpdate,
  onDayUpdate,
  onIngredientsNeeded,
  seriesKey,
  onBack,
  onUpdateName,
  onUpdateDescription,
  onMediaUpload,
  onMediaDelete,
  onNext,
  onSave,
  onKeyChange,
}) => {
  const { keyValid } = useNutritionKey(
    currentPlan.planKey,
    currentPlan.id,
    seriesId
  );

  // console.log("keyValid", keyValid);

  const onNoKey = () => {
    if (currentPlan.name && !currentPlan.planKey) {
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
              heading="Heading for Day's plan?"
              placeholder="Type here"
              helperText={`*Today's 500cal lunch`}
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
              heading="Brief decription or steps one should follow"
              placeholder="Type here"
              helperText={`*Explain the steps to make the dish or what should one do`}
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
            <CloudinaryWidget
              media={[currentPlan?.media]}
              heading="Add a video/image"
              helperText="In this you can explain or just add an image of the meal"
              onUpload={onMediaUpload}
              onDelete={onMediaDelete}
              onNext={() => onNext("media", currentPlan?.media)}
              backButtonText="Back"
              backButtonPress={onBack}
              maxFiles={1}
              multiple={false}
            />
          ) : currentVisible === "isFree" ? (
            <CheckboxEntry
              heading="Is this plan free?"
              label="is Free"
              helperText={`*Free videos can be a good way for people to try your plan`}
              value={currentPlan?.isFree}
              onChangeValue={onFreeUpdate}
              buttonText="Next"
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              onButtonPress={() => onNext("isFree", currentPlan?.isFree)}
            />
          ) : currentVisible === "ingredients" ? (
            <TextEntry
              inputMode="text"
              heading="What ingredients will you need?"
              placeholder="Type here"
              helperText={`*Example - 200gm rice, Soy sauce, almonds`}
              value={currentPlan?.ingredients ? currentPlan?.ingredients : ""}
              onChangeText={onIngredientsNeeded}
              buttonText="Next"
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              multiline={true}
              onButtonPress={() =>
                onNext("ingredients", currentPlan?.ingredients)
              }
            />
          ) : currentVisible === "calories" ? (
            <CollectPrice
              heading="How many calories will one consume?"
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
          ) : currentVisible === "planKey" ? (
            <TextEntry
              inputMode="text"
              heading="Your desired URL?"
              placeholder="Type here"
              helperText={
                keyValid
                  ? `https://socialboat.live/workout/${seriesKey}/nutrition/${currentPlan.planKey}`
                  : "This URL is already in use. Please try something else"
              }
              value={currentPlan.planKey}
              warning={!keyValid}
              onChangeText={onKeyChange}
              buttonText="Next"
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              onButtonPress={() => {
                if (keyValid) {
                  onNext(
                    "planKey",
                    currentPlan.planKey ? currentPlan.planKey : ""
                  );
                }
              }}
            />
          ) : currentVisible === "day" ? (
            <CollectPrice
              heading="Which day is the meal for?"
              placeholder="Type here"
              helperText={`We will group your activities for the day.`}
              currency="Day"
              onCurrencyChange={() => {}}
              suffix=""
              leftButtonText="Back"
              leftButtonOnPress={onBack}
              value={currentPlan?.day ? currentPlan?.day : 0}
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

export default NutritionForm;

// Take event name
// Add event description
// Add event media
// Add event cost
// Done
