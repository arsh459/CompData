import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import HeadingSection from "@templates/listing/HeadingSection/HeadingSection";
import ProfileHeaderV2 from "@templates/profile/ProfileHeader/ProfileHeaderV2";
import { socialMediaLinkProps } from "@templates/profile/ProfileTemplateV1";
import AboutSection from "@templates/listing/AboutSection/AboutSection";
import ChallengeContent from "./ChallengeContent";
import { EventInterface } from "@models/Event/Event";
// import { UserInterface } from "@models/User/User";
import { ListItem } from "../NumberedList/NumberedList";
import { Link } from "@mui/material";
import Divider from "@components/divider/Divider";

interface Props {
  aboutCreator?: string;
  profileImg?: CloudinaryMedia | AWSMedia;
  profileName?: string;
  socialMediaIcons: socialMediaLinkProps;
  userKey?: string;
  onClick: (
    sec:
      | "name"
      | "description"
      | "media"
      | "cost"
      | "profile"
      | "schedule"
      | "cohorts"
  ) => void;
  selectedEvent: EventInterface;
  //   signedInUser?: UserInterface;
  creativeList: ListItem[];
  preview?: boolean;
  onBookModal: () => void;
  eventSeriesIds: string[];
  // participatingCommunity?: string;
  childEvents: EventInterface[];
  // setSelectedUserKey: (newKey: string) => void;
}

const LeftContent: React.FC<Props> = ({
  aboutCreator,
  profileImg,
  profileName,
  socialMediaIcons,
  userKey,
  onClick,
  selectedEvent,
  onBookModal,
  eventSeriesIds,
  // setSelectedUserKey,
  creativeList,
  preview,
  // participatingCommunity,
  childEvents,
}) => {
  // console.log("creativeList", creativeList);
  return (
    <div>
      {preview ? (
        <Link
          href={
            // participatingCommunity
            // ?
            `/challenges/${selectedEvent.eventKey}`
            // : ""
          }
          target="_blank"
        >
          <div className="" id="name">
            <HeadingSection
              heading={selectedEvent.name}
              editing={false}
              active={false}
              //   viewStyle={viewStyle}
            />
          </div>
        </Link>
      ) : (
        <div className="" id="name">
          <HeadingSection
            heading={selectedEvent.name}
            editing={false}
            active={false}
            //   viewStyle={viewStyle}
          />
        </div>
      )}

      {!preview ? (
        <div onClick={() => onClick("profile")} className="pt-4">
          <ProfileHeaderV2
            divider={true}
            aboutCreator={""}
            size="sm"
            editing={false}
            live={true}
            onEditingClick={() => {}}
            profileImg={profileImg}
            profileName={profileName}
            userKey={userKey}
            socialMediaIcons={socialMediaIcons}
            editingSection={undefined}
            //   viewStyle={viewStyle}
          />
          <div className="pt-4">
            <Divider />
          </div>
        </div>
      ) : null}

      <div
        id="description"
        className="pt-4"
        onClick={() => onClick("description")}
      >
        <AboutSection
          noMinHeight={true}
          about={selectedEvent.description}
          editing={false}
          noDivider={true}
          active={false}
          heading=""
          editingHeading="Edit description"
          placeholderText={""}
        />
      </div>

      <div className="pt-8">
        <ChallengeContent
          // preview={preview}
          onBookModal={onBookModal}
          eventSeriesIds={eventSeriesIds}
          leaderKey={userKey ? userKey : ""}
          // participatingCommunity={participatingCommunity}
          // setSelectedUserKey={setSelectedUserKey}
          selectedEvent={selectedEvent}
          creativeList={creativeList}
          childEvents={childEvents}
        />
      </div>
    </div>
  );
};

export default LeftContent;
