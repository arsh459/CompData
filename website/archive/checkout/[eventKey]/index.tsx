import { useSEOData } from "@hooks/event/useSEOData";
import { useUserSEOData } from "@hooks/event/useUserSEOData";
import DefaultLayout from "@layouts/DefaultLayout";
import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import CheckoutTemplate from "@templates/checkout/CheckoutTemplate";
import { GetStaticProps, GetStaticPaths } from "next";
import { Cohort } from "@models/Event/Event";
// import { useRemoteCohort } from "@hooks/cohorts/useRemoteCohort";
import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import PhoneForm from "@templates/apply/Form/PhoneForm";
import { dashVisible } from "@templates/apply/Form/utils";
import { homeDomain } from "@constants/seo";
import { UserInterface } from "@models/User/User";

interface Props {
  game: EventInterface | null;
  team: EventInterface | null;
  leader: LeaderBoard | null;
  cohort: Cohort | null;
}
const PreCheckout: React.FC<Props> = ({ team, game, leader }) => {
  const { title, desc, img } = useSEOData(game);
  const { site_name, favIcon } = useUserSEOData(leader);
  // const { cohort } = useRemoteCohort(event?.id);
  const { user, loadComplete, hideRecapcha, authStatus } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  const link =
    team && team.eventKey
      ? `https://${homeDomain}/checkout/${team.eventKey}`
      : game && game.eventKey
      ? `https://${homeDomain}/checkout/${game.eventKey}`
      : "";

  return (
    <DefaultLayout
      title={`Checkout: ${title}`}
      description={`Book ${desc}`}
      siteName={site_name}
      favIcon={favIcon}
      canonical={link}
      link={link}
      noIndex={false}
      img={img}
    >
      <>
        {game &&
        user &&
        user.phone &&
        user.email &&
        user.name &&
        user.instagramHandle ? (
          <CheckoutTemplate
            phone={user.phone}
            // name={user.name}
            email={user.email}
            uid={user.uid}
            // id={team.id}
            // acceptInvites={game.acceptInvites}
            // editing={false}
            heading={game.name}
            // ownerUID={game.ownerUID}
            // media={game.media}
            // currency={game.currency}
            // price={game.cost}
            // about={game.description}
            live={true}
            // eventKey={game.eventKey}
            leader={leader}
            game={game}
            team={team}
            // cohortId={cohort?.id ? cohort.id : ""}
          />
        ) : null}

        <div
          id="recaptcha-container"
          ref={element}
          className={hideRecapcha ? "hidden" : ""}
        />

        <div className={!dashVisible(user) && loadComplete ? "" : "hidden"}>
          <PhoneForm
            mobileInteractive={false}
            user={user}
            brandName={leader?.name}
            recaptcha={recaptcha}
          />
        </div>
      </>
    </DefaultLayout>
  );
};

export default PreCheckout;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          // userKey: "yourcoachabhi",
          eventKey: "Spartans% Ready to Run-14294",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const eventKey = params ? params.eventKey : "";
  // const userKey = params ? params.userKey : "";

  try {
    if (typeof eventKey === "string" && eventKey) {
      //   const userKey = stripSubDomain(host);
      // console.log("userKey", userKey);
      // console.log("userKey", userKey);

      const firebase = (await import("@config/adminFire")).default;
      const db = firebase.firestore();

      // console.log("firebase", firebase.projectManagement.name);

      const eventDocs = await db
        .collection("sbEvents")
        .where("eventKey", "==", eventKey)
        .get();

      if (eventDocs.docs.length > 0 && eventDocs.docs[0].exists) {
        const selectedEvent = eventDocs.docs[0].data() as EventInterface;
        const ownerUID = selectedEvent.ownerUID;
        const parentId = selectedEvent.parentId;

        if (ownerUID && parentId) {
          const [leader, parentEvent] = await Promise.all([
            db.collection("users").doc(ownerUID).get(),
            db.collection("sbEvents").doc(parentId).get(),
          ]);

          if (leader.exists && parentEvent.exists) {
            const leaderObj = leader.data() as UserInterface;
            const parentObj = parentEvent.data() as EventInterface;

            return {
              revalidate: 1,
              props: {
                leader: leaderObj,
                team: selectedEvent,
                game: parentObj,
              },
            };
          }
        } else if (ownerUID) {
          const leader = await db.collection("users").doc(ownerUID).get();

          if (leader.exists) {
            const leaderObj = leader.data() as UserInterface;

            return {
              revalidate: 1,
              props: {
                leader: leaderObj,
                game: selectedEvent,
                team: null,
              },
            };
          }
        }
      }
    }
  } catch (error) {
    console.log("error in index", error);
  }

  return {
    revalidate: 1,
    props: {
      leader: null,
      team: null,
      game: null,
    },
  };
};

/**
 * landing page -> payment page ->
 */
