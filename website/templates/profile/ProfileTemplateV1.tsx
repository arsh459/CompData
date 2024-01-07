import clsx from "clsx";
import React from "react";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { formLabelValues } from "@components/drawers/constants";
// import CoverVideo from "./CoverVideo/CoverVideo";
// import ProfileHeaderV1 from "./ProfileHeader/ProfileHeaderV1";
import AboutSection from "@templates/listing/AboutSection/AboutSection";
import { sampleProfileText } from "@templates/listing/AboutSection/constants";
import UpcomingEvents from "./UpcomingEvents/UpcomingEvents";
import { EventInterface } from "@models/Event/Event";
import { useRouter } from "next/dist/client/router";

export interface socialMediaLinkProps {
  linkedIn?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  external?: string;
}

export interface ProfilePropsV1 {
  coverVideo?: (CloudinaryMedia | AWSMedia)[];
  profileImg?: CloudinaryMedia | AWSMedia;
  profileName?: string;
  socialMediaLinks: socialMediaLinkProps;
  uid: string;
  editing: boolean;
  live: boolean;
  aboutMe?: string;
  editingSection: formLabelValues | undefined;
  userKey?: string;
  onSectionClick?: (newSection: formLabelValues) => void;
  events: EventInterface[];
}
const ProfileTemplateV1: React.FC<ProfilePropsV1> = ({
  coverVideo,
  editingSection,
  profileImg,
  profileName,
  socialMediaLinks,
  events,
  live,
  onSectionClick,
  editing,
  userKey,
  aboutMe,
}) => {
  const router = useRouter();

  const onEventClick = (eventId?: string, eventKey?: string) => {
    if (!live && eventId) {
      router.push(
        `?pinLevel=current-event&formLevel=current-event&eventId=${eventId}`,
        undefined,
        { shallow: true }
      );
    } else if (eventKey) {
      router.push(`/events/${eventKey}`);
    }
  };

  const onClick = (newSection?: formLabelValues) => {
    if (editing && onSectionClick && newSection) {
      onSectionClick(newSection);
    }
  };

  return (
    <div className="relative min-h-[90vh] bg-white">
      <div
        className={clsx(
          editing
            ? "bg-gradient-to-b from-gray-300 to-white"
            : "bg-gradient-to-b from-gray-300 to-white",
          //   "pb-4",
          //   "shadow-md",
          "rounded-t-xl"
          // "min-h-[90vh]"
        )}
      >
        <div onClick={() => onClick("cover-video")}>
          {/* <CoverVideo
            coverVideo={coverVideo}
            editing={editing}
            active={editingSection === "cover-video"}
          /> */}
        </div>
        {/* <ProfileHeaderV1
          editing={editing}
          live={live}
          onEditingClick={onClick}
          editingSection={editingSection}
          profileImg={profileImg}
          profileName={profileName}
          userKey={userKey}
          socialMediaIcons={socialMediaLinks}
        /> */}

        <div className="" onClick={() => onClick("about-me")}>
          {!editing && (!aboutMe || !aboutMe.trim()) ? null : (
            <div className="pl-4 pr-4">
              <AboutSection
                noMinHeight={true}
                noDivider={false}
                about={aboutMe}
                editing={editing}
                active={editingSection === "about-me"}
                heading="About me"
                editingHeading="Add a short bio"
                placeholderText={sampleProfileText}
              />
            </div>
          )}
        </div>

        {/* <SocialMediaHeader socialIcons={socialMediaIcons} /> */}
      </div>

      <div className="">
        {events && events.length > 0 ? (
          <UpcomingEvents
            editing={editing}
            active={false}
            heading="Live sessions"
            editingHeading="Edit events"
            events={events}
            onEditingClick={onClick}
            onEventClick={onEventClick}
            live={live}
          />
        ) : null}
      </div>
      {/* <div className={clsx("pl-4 pr-4 pt-4")}> */}
      {/* <ReminderSection edit={editMobile} /> */}
      {/* </div> */}

      {/* {editMobile ? (
        <div className={clsx("pt-4 pl-4 pr-4")}>
          <AddSection />
        </div>
      ) : null} */}

      {/* <div className={clsx("pt-4 pl-4 pr-4")}> */}
      {/* <Section1
          edit={editMobile}
          liveURL={liveURL}
          photoURL={photoURL}
          courseLive={courseLive}
          courseName={courseName}
        /> */}
      {/* </div> */}

      {/* {!editMobile ? (
        <div className={clsx("pt-6 pl-4 pr-4 mx-auto max-w-screen-2xl")}>
          <Section2 courses={courses} />
        </div>
      ) : null}

      {!editMobile ? (
        <div className={clsx("pt-6 pl-4 pr-4 mx-auto max-w-screen-2xl")}>
          <SectionCrowd campaign={campaign} />
        </div>
      ) : null}

      {!editMobile ? (
        <div className={clsx("pt-6 pl-4 pr-4 mx-auto max-w-screen-2xl")}>
          <CommunitiesSection communities={communities} />
        </div>
      ) : null} */}

      {/* {!editMobile && reviews ? (
        <div className={clsx("pt-6 pl-4 pr-4 mx-auto max-w-screen-2xl pb-20")}>
          <ReviewSection
            totalRating={totalRating}
            ratingSplit={ratingSplit}
            numRatings={numRatings}
            reviews={reviews}
          />
        </div>
      ) : null}

      {editMobile ? (
        <div className="absolute top-2 left-2 right-2">
          <ColorPannel
            onClick={setSelectedColorIndex}
            selectedColor={colors[selectedColorIndex]}
          />
        </div>
      ) : null} */}

      {/* <div className={clsx("h-48 bg-white")} /> */}
    </div>
  );
};

export default ProfileTemplateV1;
