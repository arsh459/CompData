import DefaultLayout from "@layouts/DefaultLayout";
import { useUserSEOData } from "@hooks/event/useUserSEOData";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { GetStaticPaths, GetStaticProps } from "next";
import { EventInterface } from "@models/Event/Event";
import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import PhoneAuth from "@templates/apply/Form/PhoneAuth";
import Loading from "@components/loading/Loading";
import JoinBoatTemplateV4 from "@templates/joinBoatTemplate/JoinBoatTemplateV4";

interface Props {
  leader: LeaderBoard | null;
  eventToJoin: EventInterface | null;
  game: EventInterface | null;
}

const JoinBoatV4: React.FC<Props> = ({ leader, eventToJoin, game }) => {
  const { title, desc, img, site_name, favIcon } = useUserSEOData(leader);
  const { user, hideRecapcha, authStatus } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  // console.log("user", user?.uid);
  console.log(game?.id, eventToJoin?.name, leader?.name);

  return (
    <DefaultLayout
      favIcon={favIcon}
      siteName={site_name}
      title={title}
      description={desc}
      link={`https://socialboat.live/joinBoatV4/${leader?.userKey}/${eventToJoin?.eventKey}`}
      canonical={`https://socialboat.live/joinBoatV4/${leader?.userKey}/${eventToJoin?.eventKey}`}
      noIndex={true}
      img={img}
    >
      {/* <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      /> */}
      {authStatus === "FAILED" ? (
        <div className="flex justify-center items-center  h-screen">
          <PhoneAuth
            placeholder="Enter your phone"
            brandName={leader?.name}
            recaptcha={recaptcha}
          />
        </div>
      ) : authStatus === "SUCCESS" && user && eventToJoin && game && leader ? (
        <div className="max-w-lg mx-auto">
          <JoinBoatTemplateV4
            user={user}
            eventToJoin={eventToJoin}
            coach={leader}
            game={game}
          />
        </div>
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <div>
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
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

export default JoinBoatV4;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          eventKey: "fat-burner-challenge-work-from-home-764",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const eventKey = params ? params.eventKey : "";

  // console.log("hist", host);

  try {
    if (typeof eventKey === "string") {
      const firebase = (await import("@config/adminFire")).default;
      const db = firebase.firestore();

      const events = await db
        .collection("sbEvents")
        .where("eventKey", "==", eventKey)
        .get();

      // console.log("eventKey", eventKey, events);

      if (events.docs.length > 0 && events.docs[0].exists) {
        const team = events.docs[0].data() as EventInterface;

        console.log("eventKey", team);

        const gameId = team.parentId;

        if (gameId) {
          const gameRemote = await db.collection("sbEvents").doc(gameId).get();
          const game = gameRemote.data() as EventInterface | undefined;

          const userDocs = await db
            .collection("leaderBoard")
            .where("uid", "==", team.ownerUID)
            .get();

          if (userDocs.docs.length > 0 && userDocs.docs[0].exists && game) {
            const leaderObj = userDocs.docs[0].data() as LeaderBoard;

            return {
              revalidate: 1,
              props: {
                leader: leaderObj,
                eventToJoin: team,
                game: game,
              },
            };
          }
        } else {
          const userDocs = await db
            .collection("leaderBoard")
            .where("uid", "==", team.ownerUID)
            .get();

          if (userDocs.docs.length > 0 && userDocs.docs[0].exists) {
            const leaderObj = userDocs.docs[0].data() as LeaderBoard;

            return {
              revalidate: 1,
              props: {
                leader: leaderObj,
                eventToJoin: team,
                game: team,
              },
            };
          }
        }
      }

      // console.log("userDocs", userDocs.docs.length);
    }

    return {
      revalidate: 1,
      props: {
        leader: null,
        eventToJoin: null,
        game: null,
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
      game: null,
    },
  };
};
