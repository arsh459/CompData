import { formLabelValues } from "@components/drawers/constants";
import { EventInterface } from "@models/Event/Event";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
// import CollectPrice from "@templates/editEvent/Form/CollectPrice";
import AddMembers from "@templates/editEvent/Form/MemberAdder/AddMembers";
import TextEntry from "@templates/editEvent/Form/TextEntry";
import { SetStateAction, Dispatch, useCallback } from "react";

interface Props {
  currentVisible: formLabelValues;
  toCopyEvent: EventInterface | undefined;
  uid: string;
  setToCopyEvent: Dispatch<SetStateAction<EventInterface | undefined>>;
  onBack?: () => void;
  onButtonPress: (
    key: formLabelValues,
    value: string | undefined | number | CloudinaryMedia[],
    insta?: string | undefined,
    fb?: string | undefined,
    youtube?: string | undefined,
    linkedIn?: string | undefined,
    external?: string | undefined
  ) => void;
  onSave: (members: { [memberId: string]: boolean }) => void;
}

const EditChallenge: React.FC<Props> = ({
  currentVisible,
  toCopyEvent,
  setToCopyEvent,
  onButtonPress,
  onBack,
  uid,
  onSave,
}) => {
  //   const { toCopyEvent, setToCopyEvent } = useEventTopCopy(localUser.uid);

  const uploadMedia = useCallback(
    async (newFile: CloudinaryMedia) => {
      if (toCopyEvent?.id) {
        setToCopyEvent((prev) => {
          if (prev) {
            return { ...prev, media: [...prev.media, newFile] };
          }
        });
      }
    },
    [toCopyEvent?.id, setToCopyEvent]
  );

  // console.log("");

  const deleteMedia = (toDeleteElement: CloudinaryMedia) => {
    const updatedMedia = toCopyEvent?.media.filter(
      (item) => item.id !== toDeleteElement.id
    );

    if (toCopyEvent?.id && updatedMedia)
      setToCopyEvent((prev) => {
        if (prev) {
          return { ...prev, media: updatedMedia };
        }
      });
  };

  console.log(deleteMedia, uploadMedia);

  return (
    <div className="flex justify-center w-full ">
      <div className="">
        {currentVisible === "name" ? (
          <TextEntry
            inputMode="text"
            heading="What's your program called?"
            placeholder="Type here"
            helperText={`*Example - Lose 3kgs in 30 days`}
            value={toCopyEvent?.name}
            onChangeText={(newVal: string) =>
              setToCopyEvent((prev) => {
                if (prev) {
                  return { ...prev, name: newVal };
                }
              })
            }
            buttonText="Next"
            leftButtonText="Back"
            leftButtonOnPress={onBack}
            onButtonPress={() => onButtonPress("name", toCopyEvent?.name)}
          />
        ) : currentVisible === "description" ? (
          <TextEntry
            inputMode="text"
            heading="Briefly descibe your program"
            placeholder="Type here"
            helperText={`*Good descriptions help you get discovered on Google`}
            value={toCopyEvent?.description}
            onChangeText={(newVal: string) =>
              setToCopyEvent((prev) => {
                if (prev) {
                  return { ...prev, description: newVal };
                }
              })
            }
            buttonText="Next"
            leftButtonText="Back"
            leftButtonOnPress={onBack}
            multiline={true}
            onButtonPress={() =>
              onButtonPress("description", toCopyEvent?.description)
            }
          />
        ) : currentVisible === "media" && toCopyEvent?.media ? (
          <>
            {/* <CloudinaryWidget
              media={toCopyEvent?.media}
              heading="Add media to the page"
              helperText="Please upload at least 1 image"
              onUpload={uploadMedia}
              onDelete={deleteMedia}
              onNext={() => onButtonPress("media", toCopyEvent?.media)}
              backButtonText="Back"
              backButtonPress={onBack}
            /> */}
          </>
        ) : // : currentVisible === "cost" ? (
        //   <CollectPrice
        //     heading="What's the cost?"
        //     placeholder="Type here"
        //     helperText={`Keep the community free, we will let you sell paid content in the community`}
        //     currency="₹"
        //     onCurrencyChange={() => {}}
        //     suffix=""
        //     leftButtonText="Back"
        //     leftButtonOnPress={onBack}
        //     value={toCopyEvent?.cost ? toCopyEvent?.cost : 0}
        //     onValueChange={(newVal: number) =>
        //       setToCopyEvent((prev) => {
        //         if (prev) {
        //           return { ...prev, cost: newVal };
        //         }
        //       })
        //     }
        //     buttonText="Save and Next"
        //     onButtonPress={() => onButtonPress("cost", toCopyEvent?.cost)}
        //   />
        // )

        currentVisible === "add-members" && onBack ? (
          <AddMembers onNext={onSave} communityId={uid} onBack={onBack} />
        ) : null}
      </div>
      <div className="" />
    </div>
  );
};

export default EditChallenge;

// Take event name
// Add event description
// Add event media
// Add event cost
// Done
