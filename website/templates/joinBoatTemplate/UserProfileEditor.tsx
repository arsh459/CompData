// import { formLabelValues } from "@components/drawers/constants";
// import { useUserKey } from "@hooks/user/useUserKey";
import Script from "next/script";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import {
//   removeCoverMedia,
//   removeProfileImage,
//   updateCoverMedia,
//   updateProfileImage,
// } from "@models/User/updateUtils";
// import { updateEventStringValue } from "@models/Event/createUtils";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import {
  fitnessGoalObj,
  FitnessGoalSelect,
  genderType,
  UserInterface,
} from "@models/User/User";
// import { generateFormattedKey } from "@models/User/userKey";
// import BreadCrumps from "@templates/editEvent/Form/BreadCrumps/BreadCrumps";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
import CollectPrice from "@templates/editEvent/Form/CollectPrice";
// import SocialLinkInput from "@templates/editEvent/Form/SocialMedia/SocialLinkInput";
import TextEntry from "@templates/editEvent/Form/TextEntry";
import { editUserProfileSections } from "@templates/EditUserProfile/EditUserProfile";
import BMI from "./BMI";
// import {
//   getCrumpHeading,
//   getNavLevel,
//   isProfileLive,
// } from "@templates/editEvent/Form/utils";
// import Welcome from "@templates/editEvent/Form/Welcome";
// import { useCallback } from "react";
import { onboardUserSections } from "./JoinBoatTemplate";
import RadioInput, { SelectItem } from "./RadioInput";
import TakeHeightWidget from "./TakeHeightWidget";

const genderItems: SelectItem[] = [
  {
    heading: "Female",
    text: "",
    key: "female",
    img: "",
  },
  {
    heading: "Male",
    text: "",
    key: "male",
    img: "",
  },
  {
    heading: "Not Specified",
    text: "",
    key: "notSpecified",
    img: "",
  },
];

interface Props {
  currentVisible: onboardUserSections | editUserProfileSections;
  localUser: UserInterface;
  onUpdate: (
    cur: onboardUserSections | editUserProfileSections,
    value: string | fitnessGoalObj | undefined | genderType | number
  ) => void;
  onBack?: () => void;
  onSaveAndNext: (
    cur: onboardUserSections | editUserProfileSections,
    value: string | fitnessGoalObj | undefined | genderType | number
  ) => void;
  onNext: (
    cur: onboardUserSections | editUserProfileSections,
    override?: onboardUserSections | editUserProfileSections
  ) => void;
  onUpdateHeight: (ht: number, inch: number) => void;
  uploadProfileImg: (newFile: CloudinaryMedia) => void;
  removeProfileImg: () => void;
}

const UserProfileEditor: React.FC<Props> = ({
  currentVisible,
  localUser,
  onUpdate,
  onNext,
  onSaveAndNext,
  onUpdateHeight,
  onBack,
  uploadProfileImg,
  removeProfileImg,
}) => {
  return (
    <div>
      <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      />
      <div className="">
        {currentVisible === "name" ? (
          <TextEntry
            inputMode="text"
            heading="What's your name?"
            placeholder="Type here"
            helperText={`*This will be your brand identity`}
            value={localUser?.name}
            onChangeText={(newVal: string) => onUpdate("name", newVal)}
            buttonText="Save and Next"
            onButtonPress={() => onSaveAndNext("name", localUser?.name)}
          />
        ) : currentVisible === "instagramHandle" ? (
          <div className="px-8 max-w-lg">
            <TextEntry
              inputMode="text"
              heading="What's your Insta handle?"
              placeholder="Type here"
              helperText={`*We will tag rewards and invite you to our award show`}
              value={localUser?.instagramHandle}
              leftButtonText="Skip"
              leftButtonOnPress={() => onNext("instagramHandle")}
              onChangeText={(newVal: string) =>
                onUpdate("instagramHandle", newVal)
              }
              buttonText="Save and Next"
              onButtonPress={() =>
                onSaveAndNext("instagramHandle", localUser?.instagramHandle)
              }
            />
          </div>
        ) : currentVisible === "picture" ? (
          <>
            {/* <CloudinaryWidget
              heading="Add a profile image"
              helperText="This image would be visible on your every event"
              onUpload={uploadProfileImg}
              onDelete={removeProfileImg}
              media={localUser.profileImage ? [localUser.profileImage] : []}
              onNext={() => onSaveAndNext("picture", "img")}
              maxFiles={1}
              multiple={false}
              backButtonText="Back"
              backButtonPress={onBack}
            /> */}
          </>
        ) : currentVisible === "height" ? (
          <div className="max-w-lg px-8">
            <TakeHeightWidget
              heading="What's your height?"
              helperText="This will be to estimate your calorie burn"
              onUpdateHeight={onUpdateHeight}
              value={localUser.height}
              // onValueChange={(newVal: number) => onUpdate("height", newVal)}
              buttonText="Save and Next"
              onButtonPress={() => onSaveAndNext("height", localUser.height)}
              leftButtonText="Skip"
              leftButtonOnPress={() => onNext("height")}
            />
          </div>
        ) : currentVisible === "weight" ? (
          <div className="max-w-lg px-8">
            <CollectPrice
              heading="What's your weight?"
              placeholder="Type here"
              helperText={`This information will be private to you`}
              currency="Kg:"
              onCurrencyChange={() => {}}
              suffix=""
              value={localUser.weight ? localUser.weight : 0}
              onValueChange={(newVal: number) => onUpdate("weight", newVal)}
              buttonText="Save and Next"
              onButtonPress={() => onSaveAndNext("weight", localUser.weight)}
            />
          </div>
        ) : currentVisible === "age" ? (
          <div className="max-w-lg px-8">
            <CollectPrice
              heading="What's your age?"
              placeholder="Type here"
              helperText={`This information will be private to you`}
              currency="Yrs:"
              onCurrencyChange={() => {}}
              suffix=""
              value={localUser.age ? localUser.age : 0}
              onValueChange={(newVal: number) => onUpdate("age", newVal)}
              buttonText="Save and Next"
              onButtonPress={() => onSaveAndNext("age", localUser.age)}
            />
          </div>
        ) : currentVisible === "fitnessGoalText" ? (
          <div className="px-8 max-w-lg">
            <TextEntry
              inputMode="text"
              heading="Any other fitness goal?"
              placeholder="Type here"
              helperText={`Your coach will use this information to guide and design your program`}
              value={localUser.fitnessGoalText}
              onChangeText={(newVal: string) =>
                onUpdate("fitnessGoalText", newVal)
              }
              buttonText="Save and Next"
              multiline={true}
              leftButtonText="Skip"
              leftButtonOnPress={() => onNext("fitnessGoalText")}
              onButtonPress={() =>
                onSaveAndNext("fitnessGoalText", localUser.fitnessGoalText)
              }
            />
          </div>
        ) : currentVisible === "gender" ? (
          <div className="px-8 max-w-lg">
            <RadioInput
              heading="Select your gender"
              helperText="This will be to estimate your calorie burn"
              value={localUser.gender}
              items={genderItems}
              onValueChange={(newVal: string) => onUpdate("gender", newVal)}
              buttonText="Save and Next"
              onButtonPress={() => onSaveAndNext("gender", localUser.gender)}
              leftButtonText="Skip"
              leftButtonOnPress={() => onNext("gender")}
            />
          </div>
        ) : currentVisible === "fitnessGoals" ? (
          <div className="px-8 max-w-lg">
            <RadioInput
              heading="Select all that are applicable"
              helperText="This will help the coach personalise your program"
              values={localUser.fitnessGoals as { [key: string]: boolean }}
              items={FitnessGoalSelect}
              onValueChange={(newVal: string) =>
                onUpdate("fitnessGoals", newVal)
              }
              buttonText="Save and Next"
              leftButtonText="Skip"
              leftButtonOnPress={() => onNext("fitnessGoals")}
              onButtonPress={() =>
                onSaveAndNext("fitnessGoals", localUser.fitnessGoals)
              }
              // leftButtonText="Skip"
              // leftButtonOnPress={() => onNext("fitnessGoals")}
            />
          </div>
        ) : currentVisible === "bmi" ? (
          <div className="px-8 max-w-lg">
            <BMI
              weight={localUser.weight}
              height={localUser.height}
              buttonText={
                localUser.weight ? "Add fitness goals" : "health assessment"
              }
              leftButtonText="Skip"
              leftButtonOnPress={() => onNext("bmi")}
              onButtonPress={() => onNext("bmi")}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserProfileEditor;
