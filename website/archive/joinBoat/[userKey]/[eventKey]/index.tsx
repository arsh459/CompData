import DefaultLayout from "@layouts/DefaultLayout";
// import { joinSEO } from "@constants/seo";
import { useUserSEOData } from "@hooks/event/useUserSEOData";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { GetStaticPaths, GetStaticProps } from "next";
import { EventInterface } from "@models/Event/Event";
import JoinBoatTemplate from "@templates/joinBoatTemplate/JoinBoatTemplate";

interface Props {
  leader: LeaderBoard | null;
  eventToJoin: EventInterface | null;
}

const JoinBoat: React.FC<Props> = ({ leader, eventToJoin }) => {
  const { title, desc, img, site_name, favIcon, link, canonical } =
    useUserSEOData(leader);

  // console.log("event", eventToJoin, leader);
  return (
    <DefaultLayout
      favIcon={favIcon}
      siteName={site_name}
      title={title}
      description={desc}
      link={link}
      canonical={canonical}
      noIndex={true}
      img={img}
    >
      {leader && eventToJoin ? (
        <JoinBoatTemplate event={eventToJoin} leader={leader} />
      ) : null}
    </DefaultLayout>
  );
};

export default JoinBoat;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const host = params ? params.userKey : "";
  const eventKey = params ? params.eventKey : "";

  // console.log("hist", host);

  try {
    if (host && typeof host === "string" && typeof eventKey === "string") {
      const firebase = (await import("@config/adminFire")).default;
      const db = firebase.firestore();

      const [userDocs, events] = await Promise.all([
        db.collection("leaderBoard").where("userKey", "==", host).get(),
        db.collection("sbEvents").where("eventKey", "==", eventKey).get(),
      ]);

      // console.log("userDocs", userDocs.docs.length);

      if (userDocs.docs.length > 0 && userDocs.docs[0].exists) {
        const leaderObj = userDocs.docs[0].data() as LeaderBoard;
        if (events.docs.length > 0 && events.docs[0].exists) {
          const returnEvent = events.docs[0].data() as EventInterface;

          return {
            revalidate: 1,
            props: {
              leader: leaderObj,
              eventToJoin: returnEvent,
            },
          };
        }
      }
    }

    return {
      revalidate: 1,
      props: {
        leader: null,
        eventToJoin: null,
      },
    };
  } catch (error) {
    console.log("error", error);
  }

  return {
    revalidate: 1,
    props: {
      leader: null,
      eventToJoin: null,
    },
  };
};
