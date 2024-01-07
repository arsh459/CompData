import { homeDomain } from "@constants/seo";
// import { useLocalCohorts } from "@hooks/event/useLocalCohorts";
import { useSEOData } from "@hooks/event/useSEOData";
import { useUserSEOData } from "@hooks/event/useUserSEOData";
import DefaultLayout from "@layouts/DefaultLayout";
// import { CampaignPost } from "@models/Event/Campaign";
import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import CampaignTemplate from "@templates/campaignTemplate/CampaignTemplate";
import clsx from "clsx";
import { GetStaticProps, GetStaticPaths } from "next";

interface Props {
  event: EventInterface | null;
  leader: LeaderBoard | null;
}
const Campaign: React.FC<Props> = ({ event, leader }) => {
  const { title, desc, img, width, height } = useSEOData(event);
  const { site_name, favIcon } = useUserSEOData(leader);

  return (
    <DefaultLayout
      title={`Campaign: ${title}`}
      siteName={site_name}
      favIcon={favIcon}
      description={desc}
      canonical={
        event?.eventKey
          ? `https://${homeDomain}/campaign/${event.eventKey}`
          : `https://${homeDomain}`
      }
      link={
        event && event.eventKey && leader?.userKey
          ? `https://${leader.userKey}.${homeDomain}/campaign/${event.eventKey}`
          : event && event.eventKey
          ? `https://${homeDomain}/campaign/${event.eventKey}`
          : ""
      }
      noIndex={false}
      img={img}
      width={width}
      height={height}
    >
      <div className={clsx("")}>
        {event ? (
          <CampaignTemplate
            // posts={posts}
            ownerUID={event.ownerUID}
            eventId={event.id}
            parentId={event.parentId}
          />
        ) : null}
      </div>
    </DefaultLayout>
  );
};

export default Campaign;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const eventKey = params ? params.eventKey : "";

  if (eventKey) {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const eventList = await db
      .collection("sbEvents")
      .where("eventKey", "==", eventKey)
      .get();

    if (eventList.docs.length > 0 && eventList.docs[0].exists) {
      const selectedEvent = eventList.docs[0].data() as EventInterface;

      const [leader] = await Promise.all([
        db
          .collection("leaderBoard")
          .doc(`leader-${selectedEvent.ownerUID}`)
          .get(),
        // db
        //   .collection("sbEvents")
        //   .doc(selectedEvent.id)
        //   .collection("campaign")
        //   .get(),
      ]);

      // const toReturnCampaignPosts = campaignPosts.docs.map(
      //   (item) => item.data() as CampaignPost
      // );

      // console.log("cohorts", toReturnCohorts);

      return {
        revalidate: 1,
        props: {
          event: selectedEvent,
          leader: leader.data() as LeaderBoard,
          // posts: toReturnCampaignPosts,
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
      // posts: [],
      // host: host,
    },
  };
};
