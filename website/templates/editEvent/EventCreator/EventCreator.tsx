import { formLabelValues } from "@components/drawers/constants";
import { homeDomain } from "@constants/seo";
import { useCohorts } from "@hooks/cohorts/useCohorts";
// import { DrawerElement } from "@components/drawers/Drawer";
import { useCurrentEvent } from "@hooks/editEvent/useCurrentEvent";
import { getSEOImg } from "@layouts/SEO/getSEOImg";
import {
  updateEventMedia,
  updateEventName,
  updateEventSchedule,
  updateEventStringValue,
  updateEventThumbnail,
  updateListValue,
} from "@models/Event/createUtils";
// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { UserInterface } from "@models/User/User";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";
import { useRouter } from "next/router";
// import { useRouter } from "next/router";
// import MobileInteractive from "@modules/Banner/MobileInteractive/MobileInteractive";
// import clsx from "clsx";
import { useState } from "react";
import FormHolder from "../Form/FormHolder";
// import BottomNav from "../BottomNav/BottomNav";
// import FormHolder from "../Form/FormHolder";
import EditingLayout from "./EditingLayout";
import { getNextRoute } from "./utils";
// import LiveURL from "./LiveURL";

interface Props {
  selectedFormValue: formLabelValues;
  setForm: (val: formLabelValues, divId?: string) => void;
  setDrawerElements: any;
  user: UserInterface;
}

const EventCreator: React.FC<Props> = ({
  selectedFormValue,
  setForm,
  user,
  setDrawerElements,
}) => {
  const {
    price,
    setPrice,
    joinURL,
    setJoinURL,
    name,
    setName,
    description,
    setDescription,
    media,
    remoteEvent,
    setMedia,
    eventDateTimeList,
    setEventDateTimeList,
    whoIsItFor,
    setWhoIsItFor,
    faq,
    setFAQ,
    courseGoal,
    setCourseGoal,
    programDetails,
    setProgramDetails,
    eventKey,
    setEventKey,
    googleTitle,
    googleDescription,
    setGoogleTitle,
    setGoogleDescription,
    googleSEOImg,
    program,
    setProgram,
    thumnail,
    setThumbnail,
  } = useCurrentEvent(setDrawerElements);

  const {
    cohorts,
    setCohorts,
    selectedCohort,
    // setCohorts, selectedCohort
  } = useCohorts();

  // console.log("cohorts", cohorts);
  const router = useRouter();

  const onButtonPress = async (
    key: formLabelValues,
    value: string | number | ListItem[],
    dateTimeList?: Date[] | null
  ) => {
    if (!remoteEvent?.id) {
      return;
    }

    if (key === "media") {
      await updateEventMedia(remoteEvent.id, media);
    }

    if (key === "thumbnail") {
      await updateEventThumbnail(remoteEvent.id, thumnail);
    }

    // update db
    else if (key === "name" && typeof value === "string") {
      await updateEventName(remoteEvent.id, value, remoteEvent.eventKey);
    } else if (
      (key === "courseGoal" ||
        key === "eventKey" ||
        key === "googleTitle" ||
        key === "googleDescription" ||
        key === "cost" ||
        key === "description" ||
        key === "joinURL") &&
      (typeof value === "string" || typeof value === "number")
    ) {
      await updateEventStringValue(remoteEvent.id, key, value);
    } else if (key === "eventType" && typeof value === "string" && value) {
      await updateEventStringValue(remoteEvent.id, key, value);
    } else if (key === "schedule" && dateTimeList) {
      await updateEventSchedule(remoteEvent.id, dateTimeList);
    } else if (
      (key === "whoIsItFor" || key === "faq" || key === "programDetails") &&
      value
    ) {
      await updateListValue(remoteEvent.id, key, value as ListItem[]);
    }

    const { nextRoute, divId } = getNextRoute(key);
    // console.log("divId", divId);
    setForm(nextRoute, divId);
  };

  // console.log(onButtonPress);

  const onBack = () => {
    router.back();
    // const { previousRoute, prevDevId } = getNextRoute(currentRoute);
    // setForm(previousRoute, prevDevId);
  };

  const [viewState, setViewState] = useState<"edit" | "live">("edit");
  // console.log("faq", faq);

  return (
    <EditingLayout
      viewState={viewState}
      setViewState={setViewState}
      onBack={onBack}
      navVisible={selectedFormValue !== "current-event"}
      mobileViewProps={{
        screen:
          selectedFormValue === "joinURL" ||
          selectedFormValue === "cohortJoinURL"
            ? "whatsapp-template"
            : selectedFormValue === "googleDescription" ||
              selectedFormValue === "googleTitle" ||
              selectedFormValue === "googleSEOImg" ||
              selectedFormValue === "favIconImg"
            ? "meta-card"
            : "listing-template",
        size:
          selectedFormValue === "cohortJoinURL" ||
          selectedFormValue === "joinURL" ||
          selectedFormValue === "googleTitle" ||
          selectedFormValue === "googleDescription" ||
          selectedFormValue === "googleSEOImg" ||
          selectedFormValue === "favIconImg"
            ? "tiny"
            : "responsive",
        listingTemplateProps: {
          viewStyle: "mobile",
          program: program,
          cta: "Book",
          heading: name,
          onSectionClick: (newVal: formLabelValues) => {
            console.log("value", newVal);
            setForm(newVal);
            setViewState("edit");
          },
          about: description,
          media: media,
          bio: user.bio,
          ownerUID: remoteEvent ? remoteEvent.ownerUID : "",
          id: "",
          totalLeft: 2,
          // totalSold: 1,
          courseGoal: courseGoal,
          programDetails: programDetails,
          profileImg: user?.profileImage,
          profileName: user?.name,
          userKey: user?.userKey,
          socialMediaIcons: {
            linkedIn: user?.linkedInLink,
            facebook: user?.facebookProfile,
            instagram: user?.instagramLink,
            external: user?.instagramLink,
            youtube: user?.youtubeLink,
          },
          whoIsItFor: whoIsItFor,
          faq: faq,
          eventType: remoteEvent?.eventType ? remoteEvent.eventType : "course",
          // eventDateTimeList: eventDateTimeList,
          cohorts: cohorts,

          // setMedia: setMedia,
          currency: "₹",
          price: price,
          editing: selectedFormValue !== "current-event",
          headerVideo: undefined,
          editingSection: selectedFormValue,
        },
        metaCardProps: {
          img: remoteEvent?.googleSEOImg
            ? getSEOImg([remoteEvent.googleSEOImg])
            : remoteEvent?.media
            ? getSEOImg(remoteEvent?.media)
            : "",
          url: `${user.userKey}.${homeDomain}`,
          title: googleTitle,
          description: googleDescription,
          titlePlaceholder: name ? name : "Your event title",
          descriptionPlaceHolder: description
            ? description
            : "A 140 character description for Google to find your fabulous event and index it. This description is also visible on fb, Instagram, Whatsapp",
          urlPlaceholder: `your-name.${homeDomain}`,
          favIconImg: user.favIconImg,
        },
        whatsappTemplateProps: {
          nameOfPerson: "Mahesh",
          course: name,
          toStartIn: "",
          instructorName: "",
          msgType: "welcome",
          courseCost: price,
          joinLink:
            selectedFormValue === "cohortJoinURL"
              ? "Your meeting link comes here"
              : joinURL,
          currency: "₹",
        },
      }}
    >
      {remoteEvent ? (
        <>
          <FormHolder
            currentVisible={selectedFormValue}
            eventId={remoteEvent?.id}
            eventType={remoteEvent.eventType ? remoteEvent.eventType : "course"}
            name={name}
            description={description}
            price={price}
            setName={setName}
            setPrice={setPrice}
            setDescription={setDescription}
            onButtonPress={onButtonPress}
            eventKey={eventKey}
            setEventKey={setEventKey}
            media={media}
            setForm={setForm}
            thumbnail={thumnail}
            setThumbnail={setThumbnail}
            setMedia={setMedia}
            joinURL={joinURL}
            setJoinURL={setJoinURL}
            eventDateTimeList={eventDateTimeList}
            setEventDateTimeList={setEventDateTimeList}
            whoIsItFor={whoIsItFor}
            setWhoIsItFor={setWhoIsItFor}
            faq={faq}
            setFAQ={setFAQ}
            courseGoal={courseGoal}
            setCourseGoal={setCourseGoal}
            programDetails={programDetails}
            setProgramDetails={setProgramDetails}
            cohorts={cohorts}
            setCohorts={setCohorts}
            selectedCohort={selectedCohort}
            uid={user.uid}
            googleTitle={googleTitle}
            googleDescription={googleDescription}
            setGoogleTitle={setGoogleTitle}
            setGoogleDescription={setGoogleDescription}
            googleSEOImg={googleSEOImg}
            favIconImg={user.favIconImg}
            userKey={user.userKey}
            program={program}
            setProgram={setProgram}
          />
        </>
      ) : null}
    </EditingLayout>
  );
};

export default EventCreator;
