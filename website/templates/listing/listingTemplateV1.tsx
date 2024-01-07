import HeaderImage from "@templates/listing/HeaderImage/HeaderImage";
import HeadingSection from "@templates/listing/HeadingSection/HeadingSection";
import AboutSection from "@templates/listing/AboutSection/AboutSection";
import clsx from "clsx";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { formLabelValues } from "@components/drawers/constants";
// import {
//   internalPayRequest,
//   internalSignatureVerify,
//   RazorpayAuthorization,
// } from "@utils/payments/payRequest";
// import Script from "next/script";
import { useRouter } from "next/router";
import { useEventView } from "@hooks/event/useEventView";
import { sampleText } from "./AboutSection/constants";
import { socialMediaLinkProps } from "@templates/profile/ProfileTemplateV1";
import EventTimeSection from "./EventTimeSection/EventTimeSection";
import Header from "./Header/Header";
// import MediaGrid from "./MediaGrid/MediaGrid";
import ProfileHeaderV2 from "@templates/profile/ProfileHeader/ProfileHeaderV2";
import NumberedList, { ListItem } from "./NumberedList/NumberedList";
import CBCBrief from "./CBCBrief/CBCBrief";
import CourseGoal from "./CourseGoal/CourseGoal";
import Instructor from "./Instructor/Instructor";
import Testimonials, {
  TestimonialInterface,
} from "./Testimonials/Testimonials";
import { eventTypes, LocalCohort, SessionV2 } from "@models/Event/Event";
import { useCohort } from "@hooks/event/useCohort";
import { usePageComponents } from "@hooks/event/usePageComponents";
import CohortBookingModal from "./BookingModal/CohortBookingModal";
import BookV2 from "./Book/BookV2";
import { useState } from "react";
import CohortSelector from "./Book/CohortSelector";
import LoadingModal from "@components/loading/LoadingModal";
// import Scoreboard from "./Scoreboard/Scoreboard";
// import { scoreEntriesSample } from "./constants";
import { useEventHeadings } from "@hooks/event/useEventHeadings";
import ProgramSection from "./ProgramSection/ProgramSection";
import MediaGridV2 from "./MediaGrid/MediaGridV2";

export const razorpay_key_id_front = "rzp_live_N8tAbOcFSLnajr";

export interface listingTemplateV1Props {
  eventType?: eventTypes;
  editing: boolean;
  editingSection?: formLabelValues;
  headerVideo?: string;
  heading?: string;
  onSectionClick?: (newSection: formLabelValues) => void;
  media: (CloudinaryMedia | AWSMedia)[];
  id: string;
  ownerUID: string;
  live?: boolean;
  faq?: ListItem[];
  whoIsItFor?: ListItem[];
  programDetails?: ListItem[];
  courseGoal?: string;
  bio?: string;
  soldOut?: boolean;
  currency?: "₹";
  price: number;
  profileImg: CloudinaryMedia | AWSMedia | undefined;
  profileName: string | undefined;
  socialMediaIcons: socialMediaLinkProps;
  userKey: string | undefined;
  cohorts: LocalCohort[];
  viewStyle?: "mobile" | "desktop";
  totalSold?: number;
  totalLeft?: number;
  testimonials?: TestimonialInterface[];
  eventKey?: string;
  acceptInvites?: boolean;
  about?: string;
  aboutCreator?: string;
  cta: string;
  program: SessionV2[];

  noHeader?: boolean;
  preview?: boolean;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const ListingTemplateV1: React.FC<listingTemplateV1Props> = ({
  headerVideo,
  heading,
  onSectionClick,
  media,
  id,
  preview,
  ownerUID,
  live,
  aboutCreator,
  program,
  // acceptInvites,
  eventKey,
  profileImg,
  profileName,
  userKey,
  testimonials,
  viewStyle,
  programDetails,
  faq,
  whoIsItFor,
  cohorts,
  soldOut,
  socialMediaIcons,
  editing,
  editingSection,
  courseGoal,
  currency,
  price,
  bio,
  totalSold,
  totalLeft,
  about,
  cta,
  eventType,
  noHeader,
}) => {
  // console.log("program", program);
  // console.log("cohorts", cohorts);
  // console.log("cta", cta);
  // console.log("media", media);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  useEventView(id, ownerUID, live);
  const {
    keyWord,
    list1Heading,
    list1Placeholder,
    // list2Heading,
    // list2Placeholder,
    creativeList,
  } = useEventHeadings(eventType);
  // console.log("bui", bio);
  const { selectedCohort } = useCohort(cohorts);
  const headerItems = usePageComponents(
    courseGoal,
    whoIsItFor,
    testimonials,
    faq,
    eventType
  );

  // console.log("editing", editing);

  const onClick = (
    newSection?:
      | "name"
      | "description"
      | "media"
      | "cost"
      | "profile"
      | "schedule"
      | "cohorts"
  ) => {
    if (editing && onSectionClick && newSection) {
      // console.log("here", newSection);
      onSectionClick(newSection);
    }
  };

  const router = useRouter();
  const onBookFooterClick = async () => {
    if (!live) {
      return;
    }

    // if a cohort exists
    if (cohorts.length > 1 && totalLeft) {
      setIsOpen(true);
    } else if (cohorts.length === 1 && totalLeft && selectedCohort) {
      setLoading(true);
      await onPayRequest(selectedCohort.id);
      setLoading(false);
    } else if (totalLeft === 0 && cohorts.length > 0) {
    } else {
      setLoading(true);
      await onPayRequest("");
      setLoading(false);
    }
  };

  const onPayRequest = async (cohortId: string) => {
    setLoading(true);
    router.push(`/checkout/${eventKey}?cohortId=${cohortId}`);
  };

  // console.log("n", noHeader);

  return (
    <div className={clsx("shadow-inner relative rounded-xl", "bg-white")}>
      {loading ? <LoadingModal fill="#ff735c" width={48} height={48} /> : null}
      <CohortSelector
        cohorts={cohorts}
        keyWord={keyWord}
        cta={cta}
        cost={price}
        heading="Select your cohort"
        explainer=""
        isOpen={isOpen}
        onButtonClick={onPayRequest}
        closeModal={closeModal}
      />
      {/* {live ? (
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          type="text/javascript"
          strategy="afterInteractive"
        />
      ) : null} */}
      <div className="">
        {noHeader ? (
          <div className="h-4" />
        ) : (
          <div className="sticky top-0 bg-white z-40">
            <div
              className={clsx(
                viewStyle === "mobile"
                  ? "pl-4 pr-4"
                  : "max-w-6xl mx-auto pl-4 pr-4 md:pl-8 md:pr-8"
              )}
            >
              <Header
                headerItems={headerItems}
                name={profileName}
                userKey={userKey}
                viewStyle={viewStyle}
              />
            </div>
          </div>
        )}

        {preview ? null : (
          <div
            id="media"
            onClick={() => onClick("media")}
            className={clsx(
              editingSection === "media" ? "bg-white" : "bg-gray-200",
              viewStyle === "mobile" ? "" : preview ? "lg:hidden" : "md:hidden"
            )}
          >
            <HeaderImage
              editing={editing}
              active={editingSection === "media"}
              headerVideo={headerVideo}
              media={media}
              live={live}
            />
          </div>
        )}

        <div
          className={clsx(
            viewStyle === "mobile"
              ? "pl-4 pr-4"
              : "max-w-6xl mx-auto pl-4 pr-4 md:pl-8 md:pr-8"
          )}
        >
          {/* {preview ? null : ( */}
          <div
            className={clsx(
              viewStyle === "mobile"
                ? "hidden"
                : preview
                ? "hidden lg:block"
                : "hidden md:block",
              "pb-0 pt-4"
            )}
          >
            <MediaGridV2 media={media} />
          </div>
          {/* )} */}

          <div className="flex justify-between">
            <div
              className={clsx(
                viewStyle === "mobile"
                  ? "w-full"
                  : preview
                  ? "w-full lg:w-2/3 lg:pt-6"
                  : "w-full md:w-2/3 pt-4 md:pt-6"
              )}
            >
              <div className="" id="name">
                <HeadingSection
                  heading={heading}
                  editing={editing}
                  active={editingSection === "name"}
                  viewStyle={viewStyle}
                  // numRatings={numRatings}
                  // currency={currency}
                  // price={price}
                  // registratinCloseDate={registratinCloseDate}
                />
              </div>

              <div onClick={() => onClick("profile")} className="pt-4">
                <ProfileHeaderV2
                  divider={true}
                  aboutCreator={aboutCreator}
                  size="sm"
                  editing={editing}
                  live={live}
                  onEditingClick={() => {}}
                  profileImg={profileImg}
                  profileName={profileName}
                  userKey={userKey}
                  socialMediaIcons={socialMediaIcons}
                  editingSection={undefined}
                  viewStyle={viewStyle}
                  // wDivider="w-1/2"
                  // profileImg={}
                />
              </div>

              <div
                id="description"
                className="pt-4"
                onClick={() => onClick("description")}
              >
                <AboutSection
                  noMinHeight={true}
                  about={about}
                  editing={editing}
                  noDivider={true}
                  active={editingSection === "description"}
                  // heading="Description"
                  heading=""
                  editingHeading="Edit description"
                  placeholderText={sampleText}
                />
              </div>

              {selectedCohort ? (
                <div
                  id="cohorts"
                  className=""
                  onClick={() => onClick("cohorts")}
                >
                  <EventTimeSection
                    placeholderText="Your event timings"
                    heading=""
                    numSessions={program.length}
                    keyWord={keyWord}
                    selectedCohort={selectedCohort}
                    editingHeading="Add cohort"
                    viewStyle={viewStyle}
                    // eventDateTimeList={eventDateTimeList}
                    active={editingSection === "cohorts"}
                    editing={editing}
                    cohortSize={selectedCohort?.cohortSize}
                    cohortSizePlaceholder="Add cohort size"
                  />
                </div>
              ) : null}

              <div>
                {(programDetails && programDetails.length > 0) || editing ? (
                  <div className="pt-4">
                    <NumberedList
                      // vertical={true}
                      headingSeparateLine={true}
                      viewStyle={viewStyle}
                      separator="none"
                      heading={list1Heading}
                      listItems={programDetails}
                      placeholderList={list1Placeholder}
                    />

                    <div className="pt-4" id="goal">
                      <CourseGoal courseGoal={courseGoal} />
                    </div>
                  </div>
                ) : null}
              </div>

              {/* {false && eventType === "challenge" ? (
                <div className="pt-8" id="leaderboard">
                  <Scoreboard
                    scoreEntries={scoreEntriesSample}
                    sampleVideo={media[3]}
                    sampleVideo2={media[4]}
                    sampleVideo3={media[5]}
                    sampleVideo4={media[1]}
                  />
                </div>
              ) : null} */}

              {(program || editing) && !preview ? (
                <div id="program" className="pt-4">
                  <ProgramSection
                    sessions={program}
                    viewStyle={viewStyle}
                    heading={"What's the program?"}
                  />
                </div>
              ) : null}

              <div id="whoIsItFor">
                {whoIsItFor && whoIsItFor.length > 0 ? (
                  <div className="pt-8">
                    <NumberedList
                      viewStyle={viewStyle}
                      separator="bullet"
                      border={true}
                      heading="Who is it for?"
                      listItems={whoIsItFor}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div
              className={clsx(
                viewStyle === "mobile"
                  ? "hidden"
                  : preview
                  ? "hidden lg:flex"
                  : "hidden md:flex",
                "sticky h-full w-1/3 top-16 pt-6 pl-4 justify-end"
              )}
            >
              <CohortBookingModal
                cta={cta}
                cohorts={cohorts}
                onClick={onPayRequest}
                keyWord={keyWord}
                cost={price}
                currency={currency}
                // cohortSize={selectedCohort?.cohortSize}
                // seatsBooked={selectedCohort?.seatsBooked}
                // registrationsClose={selectedCohort?.registerBy}
              />
            </div>
          </div>
        </div>

        {/** Instructors */}
        <div className="pt-10 pb-10 bg-gray-100 mt-8" id="instructor">
          <div className="max-w-6xl mx-auto pl-4 pr-4 md:pl-8 md:pr-8">
            <Instructor
              size="sm"
              viewStyle={viewStyle}
              profileImg={profileImg}
              profileName={profileName}
              socialMediaIcons={socialMediaIcons}
              bio={bio}
              live={live}
              editingSection={undefined}
              aboutCreator={"Engineer, Inventor & Fitness enthusiast"}
            />
          </div>
        </div>

        <div className="pt-8 pb-4" id="brief">
          <div
            className={clsx(
              "max-w-6xl mx-auto",
              viewStyle === "mobile" ? "pl-4 pr-4" : "pl-4 pr-4 md:pl-8 md:pr-8"
            )}
          >
            <CBCBrief
              viewStyle={viewStyle}
              eventType={eventType}
              creativeList={creativeList}
            />
          </div>
        </div>

        <div id="testimonials">
          {testimonials && testimonials.length > 0 ? (
            <div className="pt-10 pb-4">
              <div className="max-w-6xl mx-auto pl-4 pr-4 md:pl-8 md:pr-8">
                <Testimonials data={testimonials} />
              </div>
            </div>
          ) : null}
        </div>

        <div id="faq">
          {(faq && faq.length > 0) || editing ? (
            <div className={clsx(viewStyle === "mobile" ? "pt-0" : "md:pt-10")}>
              <div
                className={clsx(
                  viewStyle === "mobile"
                    ? "pl-4 pr-4"
                    : "max-w-6xl mx-auto pl-4 pr-4 md:pl-8 md:pr-8"
                )}
              >
                <NumberedList
                  vertical={true}
                  viewStyle={viewStyle}
                  headingSeparateLine={true}
                  separator="number"
                  heading="Frequently asked questions"
                  listItems={faq}
                  placeholderList={[
                    {
                      heading: "Question 1",
                      text: "Think what your students generally ask",
                    },
                    {
                      heading: "Question 2",
                      text: "Answer it in the simplest way possible",
                    },
                  ]}
                />
              </div>
            </div>
          ) : null}
        </div>

        <div
          className={clsx(
            viewStyle === "mobile" ? "" : preview ? "lg:hidden" : "md:hidden",
            "sticky bottom-0 left-0 right-0"
          )}
        >
          <BookV2
            price={price}
            registerBy={selectedCohort?.registerBy}
            viewStyle={viewStyle}
            totalSold={totalSold}
            seatsLeft={totalLeft}
            soldOut={soldOut}
            currency={currency}
            cta={cta}
            onClick={onBookFooterClick}
            cohortSize={selectedCohort?.cohortSize}
            seatsBooked={selectedCohort?.seatsBooked}
          />
        </div>

        <div
          className={clsx(
            viewStyle === "mobile" ? "hidden" : "hidden md:block h-48"
          )}
        />
      </div>
    </div>
  );
};

export default ListingTemplateV1;
