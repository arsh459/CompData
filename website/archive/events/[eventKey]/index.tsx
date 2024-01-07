import { homeDomain } from "@constants/seo";
import { useLocalCohorts } from "@hooks/event/useLocalCohorts";
import { useSEOData } from "@hooks/event/useSEOData";
import { useUserSEOData } from "@hooks/event/useUserSEOData";
import DefaultLayout from "@layouts/DefaultLayout";
import { Cohort, EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import ListingTemplateV1 from "@templates/listing/listingTemplateV1";
import clsx from "clsx";
import { GetStaticProps, GetStaticPaths } from "next";

interface Props {
  event: EventInterface | null;
  leader: LeaderBoard | null;
  cohorts: Cohort[];
  // host: string;
}
const Listing: React.FC<Props> = ({ event, leader, cohorts }) => {
  // const [parsedCohorts, setParsed] = useState<LocalCohort[]>([]);

  // useEffect(() => {
  //   // console.log("cohorts in effect", cohorts);
  //   if (cohorts) setParsed(parseCohorts(cohorts));
  // }, [cohorts]);
  const { parsedCohorts, totalSold, totalLeft } = useLocalCohorts(cohorts);

  // console.log("cohorts parsed", parsedCohorts);

  const { title, desc, img, width, height } = useSEOData(event);
  const { site_name, favIcon } = useUserSEOData(leader);

  // console.log(
  //   "link",
  //   `${leader.userKey}.${homeDomain}/events/${event.eventKey}`
  // );

  // console.log("favIcon", favIcon);
  // console.log("event", event);

  return (
    <DefaultLayout
      title={title}
      siteName={site_name}
      favIcon={favIcon}
      description={desc}
      canonical={
        event?.eventKey
          ? `https://${homeDomain}/events/${event.eventKey}`
          : `https://${homeDomain}`
      }
      link={
        event && event.eventKey && leader?.userKey
          ? `https://${leader.userKey}.${homeDomain}/events/${event.eventKey}`
          : event && event.eventKey
          ? `https://${homeDomain}/events/${event.eventKey}`
          : ""
      }
      noIndex={false}
      img={img}
      width={width}
      height={height}
    >
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
    </DefaultLayout>
  );
};

export default Listing;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    // fallback: "blocking",
    // fallback: "blocking",
    // paths: [{ params: { eventKey: "bootcamp" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log("params", params);

  const eventKey = params ? params.eventKey : "";

  // if (host && typeof host === "string") {
  // const eventKey = host.split(".")[0];

  // console.log("eventKey", eventKey);

  if (eventKey) {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const eventList = await db
      .collection("sbEvents")
      .where("eventKey", "==", eventKey)
      .get();

    if (eventList.docs.length > 0 && eventList.docs[0].exists) {
      const selectedEvent = eventList.docs[0].data() as EventInterface;

      const [leader, cohorts] = await Promise.all([
        db
          .collection("leaderBoard")
          .doc(`leader-${selectedEvent.ownerUID}`)
          .get(),
        db
          .collection("sbEvents")
          .doc(selectedEvent.id)
          .collection("cohorts")
          .get(),
      ]);

      const toReturnCohorts = cohorts.docs.map((item) => item.data() as Cohort);

      // console.log("cohorts", toReturnCohorts);

      return {
        revalidate: 1,
        props: {
          event: selectedEvent,
          leader: leader.data() as LeaderBoard,
          cohorts: toReturnCohorts,
          // host: host,
        },
      };
    }
  }
  // }

  return {
    revalidate: 1,
    props: {
      event: null,
      leader: null,
      cohorts: [],
      // host: host,
    },
  };
};
