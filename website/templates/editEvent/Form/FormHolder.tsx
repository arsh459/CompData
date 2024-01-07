import { formLabelValues } from "@components/drawers/constants";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { homeDomain } from "@constants/seo";
import { useEventKey } from "@hooks/editEvent/useEventKey";
import { Dispatch, SetStateAction } from "react";
import { eventTypes, LocalCohort, SessionV2 } from "@models/Event/Event";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { generateFormattedKey } from "@models/User/userKey";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";
import { useCallback } from "react";
// import { useCallback } from "react";
import BreadCrumps from "./BreadCrumps/BreadCrumps";
// import CloudinaryWidget from "./CloudinaryWidget";
import CohortForm from "./CohortForm";
import CollectPrice from "./CollectPrice";
import ListItemInput from "./ListItemInput/ListItemInput";
import ProgramSelect from "./ProgramSelect/ProgramSelect";
import SEOFormHolder from "./SEOFormHolder/SEOFormHolder";
import SessionHolder from "./SessionHolder/SessionHolder";
import TextEntry from "./TextEntry";
import URLPreview from "./URLPreview/URLPreview";
import { getCrumpHeading, getNavLevel, isEventLive } from "./utils";
import Welcome from "./Welcome";

interface Props {
  currentVisible: formLabelValues;
  name: string;
  description: string;
  eventId: string;
  courseGoal: string;
  setCourseGoal: (newVal: string) => void;
  programDetails: ListItem[];
  setProgramDetails: (newVal: ListItem[]) => void;
  price: number;
  setName: (newVal: string) => void;
  setEventKey: (newVal: string) => void;
  setDescription: (newVal: string) => void;
  setPrice: (newVal: number) => void;
  onButtonPress: (
    key: formLabelValues,
    value: string | number | ListItem[]
  ) => void;
  media: (CloudinaryMedia | AWSMedia)[];
  setMedia: Dispatch<SetStateAction<(CloudinaryMedia | AWSMedia)[]>>;

  eventKey: string | undefined;
  joinURL: string;
  setJoinURL: (newVal: string) => void;
  setForm: (key: formLabelValues) => void;
  eventDateTimeList: Date[] | null;
  setEventDateTimeList: (newDate: Date[] | null) => void;
  whoIsItFor: ListItem[];
  setWhoIsItFor: (newVal: ListItem[]) => void;
  faq: ListItem[];
  setFAQ: (newVal: ListItem[]) => void;
  cohorts: LocalCohort[];
  uid: string;
  setCohorts: (newVal: LocalCohort[]) => void;
  selectedCohort?: LocalCohort;
  googleTitle: string;
  googleDescription: string;
  setGoogleTitle: (newVal: string) => void;
  setGoogleDescription: (newVal: string) => void;
  googleSEOImg: CloudinaryMedia | AWSMedia | undefined;
  favIconImg: CloudinaryMedia | AWSMedia | undefined;
  thumbnail: CloudinaryMedia | AWSMedia | undefined;
  setThumbnail: (newThumbnail: CloudinaryMedia | AWSMedia | undefined) => void;
  userKey?: string;
  program?: SessionV2[];
  setProgram: (newProgram: SessionV2[]) => void;
  eventType: eventTypes;
  noBreadcrump?: boolean;
  onBack?: () => void;
  // setEventType: (newType: eventTypes) => void;
}

const FormHolder: React.FC<Props> = ({
  currentVisible,
  name,
  description,
  price,
  media,
  setForm,
  eventId,
  setDescription,
  setName,
  setPrice,
  onButtonPress,
  eventKey,
  joinURL,
  setJoinURL,
  userKey,
  eventType,
  noBreadcrump,
  // setEventType,
  // eventDateTimeList,
  // setEventDateTimeList,
  whoIsItFor,
  setWhoIsItFor,
  faq,
  setFAQ,
  courseGoal,
  setCourseGoal,
  programDetails,
  setProgramDetails,
  cohorts,
  uid,
  selectedCohort,
  setEventKey,
  googleTitle,
  googleDescription,
  setGoogleDescription,
  setGoogleTitle,
  googleSEOImg,
  favIconImg,
  program,
  setProgram,
  onBack,
  setMedia,
  thumbnail,
  setThumbnail,
  // addEventMedia,
  // updateEventMedia,
}) => {
  const uploadMedia = useCallback(
    async (newFile: (CloudinaryMedia | AWSMedia)[]) => {
      setMedia((prev) => {
        if (prev) {
          return [...prev, ...newFile];
        }

        return prev;
      });
    },
    [setMedia]
  );

  const deleteMedia = async (toDeleteElement: CloudinaryMedia | AWSMedia) => {
    const updatedMedia = media.filter((item) => item.id !== toDeleteElement.id);

    setMedia(updatedMedia);
  };

  const uploadThumbnail = useCallback(
    async (newFile: (CloudinaryMedia | AWSMedia)[]) => {
      setThumbnail(newFile.length ? newFile[0] : undefined);
    },
    [setThumbnail]
  );

  const deleteThumbnail = async (
    toDeleteElement: CloudinaryMedia | AWSMedia
  ) => {
    setThumbnail(undefined);
  };

  const { keyValid } = useEventKey(eventKey, eventId);

  const onKeyChange = (newText: string) => {
    const newKey = generateFormattedKey(newText);
    setEventKey(newKey);
  };

  // console.log("keyValid", eventKey, keyValid);

  return (
    <div className="justify-around w-full">
      {!noBreadcrump ? (
        <div className="pb-4">
          <BreadCrumps
            breadCrumps={[
              {
                heading: "All events",
                next: true,
                onClick: () => setForm("all-events"),
              },
              {
                heading: name,
                truncate: true,
                next: getCrumpHeading(currentVisible) ? true : false,
                onClick: () => setForm("current-event"),
              },
              getNavLevel(currentVisible),
            ]}
          />
        </div>
      ) : null}
      <div className="">
        {currentVisible === "eventType" ? (
          <ProgramSelect
            heading={"What kind is your program?"}
            helperText=""
            eventType={eventType}
            onSelect={(newValue: eventTypes) =>
              onButtonPress("eventType", newValue)
            }
            buttonText="Save and Next"
            onButtonPress={() => onButtonPress("eventType", "")}
            // leftButtonOnPress={()=>{}}
            // leftButtonText=''
          />
        ) : currentVisible === "name" ? (
          <TextEntry
            inputMode="text"
            heading="What's your event name?"
            placeholder="Type here"
            helperText={`*Example - Madhav's Hiphop class`}
            value={name}
            onChangeText={setName}
            buttonText="Save and Next"
            leftButtonText="Back"
            leftButtonOnPress={onBack}
            onButtonPress={() => onButtonPress("name", name)}
          />
        ) : currentVisible === "eventKey" ? (
          <TextEntry
            inputMode="text"
            heading="Your desired URL?"
            placeholder="Type here"
            helperText={
              keyValid
                ? `*For best SEO, make it readable and easy to understand`
                : "This URL is already in use. Please try something else"
            }
            value={eventKey}
            warning={!keyValid}
            onChangeText={onKeyChange}
            buttonText="Save and Next"
            leftButtonText="Back"
            leftButtonOnPress={onBack}
            onButtonPress={() => {
              if (keyValid) {
                onButtonPress("eventKey", eventKey ? eventKey : "");
              }
            }}
          >
            <div className="flex pb-2">
              <URLPreview
                eventKey={eventKey}
                baseURL={`${homeDomain}/events/`}
              />
            </div>
          </TextEntry>
        ) : currentVisible === "courseGoal" ? (
          <TextEntry
            inputMode="text"
            heading="What goal will a student achieve?"
            placeholder="Type here"
            helperText={`*Example - Run 5k in 20 minutes`}
            value={courseGoal}
            onChangeText={setCourseGoal}
            leftButtonText="Back"
            leftButtonOnPress={onBack}
            buttonText="Save and Next"
            onButtonPress={() => onButtonPress("courseGoal", courseGoal)}
          />
        ) : currentVisible === "description" ? (
          <TextEntry
            inputMode="text"
            heading="Briefly descibe your event"
            placeholder="Type here"
            helperText={`*Good descriptions help you get discovered on Google`}
            value={description}
            onChangeText={setDescription}
            buttonText="Save and Next"
            multiline={true}
            onButtonPress={() => onButtonPress("description", description)}
          />
        ) : currentVisible === "media" ? (
          <>
            <UppyWidgetContainer
              media={media}
              heading="Add media to the page"
              helperText="Please upload at least 1 image"
              onUpload={uploadMedia}
              onDelete={deleteMedia}
              uid={uid}
              onNext={() => onButtonPress("media", "")}
              screenName="admin"
              taskName="admin"
            />
            {/* <CloudinaryWidget
              media={media}
              heading="Add media to the page"
              helperText="Please upload at least 1 image"
              onUpload={uploadMedia}
              onDelete={deleteMedia}
              onNext={() => onButtonPress("media", "")}
            /> */}
          </>
        ) : currentVisible === "thumbnail" ? (
          <>
            <UppyWidgetContainer
              media={[thumbnail]}
              heading="Add thumbnail for video"
              helperText="Please upload only 1 image"
              onUpload={uploadThumbnail}
              onDelete={deleteThumbnail}
              uid={uid}
              onNext={() => onButtonPress("thumbnail", "")}
              screenName="admin"
              taskName="admin"
            />
          </>
        ) : currentVisible === "cost" ? (
          <CollectPrice
            heading="What's the cost?"
            placeholder="Type here"
            helperText={``}
            currency="₹"
            onCurrencyChange={() => {}}
            suffix=""
            value={price}
            onValueChange={setPrice}
            buttonText="Save and Next"
            onButtonPress={() => onButtonPress("cost", price)}
          />
        ) : currentVisible === "current-event" ? (
          <Welcome
            subdomain={userKey}
            live={isEventLive(
              name,
              description,
              price,
              media,
              joinURL,
              eventKey
            )}
            urlPath={`/events/${eventKey}`}
            liveHeading="Your event is live"
            inDraftHeading="Launch your live event now"
            liveHelperText="Share your event & grow your boat"
            inDraftHelperText="You're just a few steps away from launching your event"
            onButtonPress={() => onButtonPress("current-event", "")}
            buttonText="Start now"
            leftButtonText="View live event"
            rightButtonText="Edit event"
          />
        ) : currentVisible === "joinURL" ? (
          <TextEntry
            inputMode="text"
            heading="Add invite for your event"
            placeholder="Paste here"
            helperText={`A join URL for Zoom or GoogleMeet`}
            value={joinURL}
            onChangeText={setJoinURL}
            buttonText="Save and Next"
            multiline={false}
            onButtonPress={() => onButtonPress("joinURL", joinURL)}
          />
        ) : currentVisible === "whoIsItFor" ? (
          <ListItemInput
            buttonText="Save and Next"
            leftButtonText="Add User type"
            uid={uid}
            currentItems={whoIsItFor}
            onChange={setWhoIsItFor}
            sectionHeading="Add Target segment"
            sectionHelper="To find the right folks"
            modalHeading="New Student type"
            onButtonPress={() => onButtonPress("whoIsItFor", whoIsItFor)}
            helperText="Example - People looking to lose weight"
            placeholder="Type here"
            label="Description"
            helperTextHeading="*Example - Beginner, Advanced"
            placeholderHeading="Type here"
            labelHeading="Who is it for?"
            eventId={eventId}
          />
        ) : currentVisible === "faq" ? (
          <ListItemInput
            buttonText="Save and Next"
            uid={uid}
            sectionHeading="Add FAQ"
            sectionHelper="Answer questions people usually ask"
            eventId={eventId}
            leftButtonText="Add FAQ"
            currentItems={faq}
            onChange={setFAQ}
            modalHeading="New FAQ"
            onButtonPress={() => onButtonPress("faq", faq)}
            helperText="Example - No! Anyone can join the course"
            placeholder="Type here"
            label="Answer"
            helperTextHeading="*Example - Is this course for experts?"
            placeholderHeading="Type here"
            labelHeading="Question"
          />
        ) : currentVisible === "program" ? (
          <div>
            <SessionHolder
              leftButtonText="Add Session"
              buttonText="Save and Next"
              eventId={eventId}
              onButtonPress={() => onButtonPress("program", "")}
              sessions={program}
              setProgram={setProgram}
              heading="Add a Program"
              helperText="Create a combination of lives, on demand videos & challenges"
            />
          </div>
        ) : currentVisible === "programDetails" ? (
          <ListItemInput
            buttonText="Save and Next"
            uid={uid}
            eventId={eventId}
            leftButtonText="Add reward"
            sectionHeading="Add prizes / rewards"
            sectionHelper="To explain what will people achieve at end"
            currentItems={programDetails}
            onChange={setProgramDetails}
            modalHeading="New Prize"
            onButtonPress={() =>
              onButtonPress("programDetails", programDetails)
            }
            helperText="Example - This can be a voucher, branded gift or just something people achieve at end."
            placeholder="Type here"
            label="Description"
            helperTextHeading="*Example - HealthKart voucher"
            placeholderHeading="Type here"
            labelHeading="New Prize"
          />
        ) : currentVisible === "cohorts" ||
          currentVisible === "cohortStarts" ||
          currentVisible === "cohortJoinURL" ||
          currentVisible === "cohortSize" ||
          currentVisible === "registerBy" ? (
          <CohortForm
            setForm={setForm}
            currentVisible={currentVisible}
            eventId={eventId}
            cohorts={cohorts}
            uid={uid}
            selectedCohort={selectedCohort}
          />
        ) : currentVisible === "googleTitle" ||
          currentVisible === "googleDescription" ||
          currentVisible === "googleSEOImg" ||
          currentVisible === "favIconImg" ? (
          <SEOFormHolder
            googleTitle={googleTitle}
            setGoogleTitle={setGoogleTitle}
            googleDescription={googleDescription}
            setGoogleDescription={setGoogleDescription}
            currentVisible={currentVisible}
            onButtonPress={onButtonPress}
            googleSEOImg={googleSEOImg}
            id={eventId}
            favIconImg={favIconImg}
            uid={uid}
          />
        ) : null}
      </div>
      <div className="" />
    </div>
  );
};

export default FormHolder;

// Take event name
// Add event description
// Add event media
// Add event cost
// Done
