import DefaultLayout from "@layouts/DefaultLayout";
// import Script from "next/script";
import { useUserSEOData } from "@hooks/event/useUserSEOData";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { GetStaticPaths, GetStaticProps } from "next";
import { EventInterface } from "@models/Event/Event";
import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import PhoneAuth from "@templates/apply/Form/PhoneAuth";
import Loading from "@components/loading/Loading";

interface Props {
  leader: LeaderBoard | null;
  eventToJoin: EventInterface | null;
}

const JoinBoatV2: React.FC<Props> = ({ leader, eventToJoin }) => {
  const { title, desc, img, site_name, favIcon } = useUserSEOData(leader);
  const { user, hideRecapcha, authStatus } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  // console.log("event", eventToJoin, leader);
  return (
    <DefaultLayout
      favIcon={favIcon}
      siteName={site_name}
      title={title}
      description={desc}
      link={`https://socialboat.live/joinBoatV2/${leader?.userKey}/${eventToJoin?.eventKey}`}
      canonical={`https://socialboat.live/joinBoatV2/${leader?.userKey}/${eventToJoin?.eventKey}`}
      noIndex={true}
      img={img}
    >
      {/* <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      /> */}
      {authStatus === "PENDING" ? (
        <div className="h-screen w-full flex justify-center items-center">
          <div>
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        </div>
      ) : authStatus === "SUCCESS" && user && eventToJoin && leader ? (
        <div className="max-w-lg mx-auto">
          {/* <JoinBoatTemplateV2
            user={user}
            eventToJoin={eventToJoin}
            coach={leader}
          /> */}
        </div>
      ) : (
        <div className="flex justify-center items-center  h-screen">
          <PhoneAuth
            placeholder="Enter your phone"
            brandName={leader?.name}
            recaptcha={recaptcha}
          />
        </div>
      )}

      <div
        id="recaptcha-container"
        ref={element}
        className={hideRecapcha ? "hidden" : ""}
      />
    </DefaultLayout>
  );
};

export default JoinBoatV2;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          userKey: "yourcoachabhi",
          eventKey: "fat-burner-challenge-work-from-home-764",
        },
      },
    ],
    fallback: true,
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
