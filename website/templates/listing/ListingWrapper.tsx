import { useLocalCohorts } from "@hooks/event/useLocalCohorts";
import { Cohort, EventInterface } from "@models/Event/Event";
// import { parseCohorts } from "@models/Event/parse";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import HomeTemplate from "@templates/home";
import ListingTemplateV1 from "@templates/listing/listingTemplateV1";
import clsx from "clsx";

// import { useEffect, useState } from "react";
// import ListingPage from "@templates/listing/index";

interface Props {
  event: EventInterface | null;
  leader: LeaderBoard | null;
  cohorts: Cohort[];
  preview?: boolean;
  // host: string;
}
const ListingWrapper: React.FC<Props> = ({
  event,
  leader,
  cohorts,
  preview,
}) => {
  // const [parsedCohorts, setParsed] = useState<LocalCohort[]>([]);

  // useEffect(() => {
  //   // console.log("cohorts in effect", cohorts);
  //   if (cohorts) setParsed(parseCohorts(cohorts));
  // }, [cohorts]);
  const { parsedCohorts, totalSold, totalLeft } = useLocalCohorts(cohorts);

  // console.log("favIcon", favIcon);
  //   console.log("event", event);

  return (
    <div
      className={clsx(
        // "bg-white",
        // "max-w-lg mx-auto md:p-4",
        ""
      )}
    >
      {event ? (
        <div className="">
          <ListingTemplateV1
            noHeader={true}
            cta={
              event.cost === 0
                ? "Register"
                : totalLeft === 0 && totalSold
                ? "Join the waitlist"
                : event.eventType === "challenge"
                ? "Join"
                : "Reserve"
            }
            id={event.id}
            program={event.program ? event.program : []}
            faq={event.faq}
            courseGoal={event.courseGoal}
            eventType={event.eventType}
            whoIsItFor={event.whoIsItFor}
            programDetails={event.programDetails}
            aboutCreator={leader?.tagline}
            bio={leader?.bio}
            profileImg={leader?.profileImage}
            profileName={leader?.name}
            preview={preview}
            cohorts={parsedCohorts}
            userKey={leader?.userKey}
            socialMediaIcons={{
              linkedIn: leader?.linkedInLink,
              facebook: leader?.facebookProfile,
              instagram: leader?.instagramLink,
              youtube: leader?.youtubeLink,
              external: leader?.externalLink,
            }}
            eventKey={event.eventKey}
            totalSold={totalSold}
            totalLeft={totalLeft}
            // eventDateTimeList={
            //   event.eventDateTimeList
            //     ? event.eventDateTimeList.map((item) => new Date(item))
            //     : null
            // }
            acceptInvites={event.acceptInvites}
            editing={false}
            heading={event.name}
            ownerUID={event.ownerUID}
            media={event.media}
            currency={event.currency}
            price={event.cost}
            about={event.description}
            live={true}
            soldOut={event.soldOut}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ListingWrapper;
