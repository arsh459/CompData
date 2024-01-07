import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
// import DefaultLayout from "@layouts/DefaultLayout";
// import { EventInterface } from "@models/Event/Event";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import { GetStaticProps, GetStaticPaths } from "next";
// import { useUserSEOData } from "@hooks/event/useUserSEOData";
// import { useState } from "react";
// import NewUserModals from "@templates/community/BaseModals/NewUserModals";
// import CommunityTemplateV3 from "@templates/community/CommunityTemplateV3";
// import { UserInterface } from "@models/User/User";
// import NewUserModalsV2 from "@templates/community/BaseModals/NewUserModalsV2";
// import CommunityLayout from "@layouts/CommunityLayout";
import DefaultLayout from "@layouts/DefaultLayout";
import { feedSEO } from "@constants/seo";
import FeedTemplate from "@templates/feed/FeedTemplate";
import PhoneAuth from "@templates/apply/Form/PhoneAuth";
import Loading from "@components/loading/Loading";
import { GetStaticProps } from "next";
import {
  CHALLENGE_ONE,
  FAT_BURNER_GAME,
  WFH_CHALLENGE,
  FAT_BURNER_CHALLENGE,
} from "@constants/gameStats";
import { EventInterface } from "@models/Event/Event";

interface Props {
  games: EventInterface[];
}

// export type modalStateType = "none" | "auth" | "welcome" | "post";

const FeedPage: React.FC<Props> = ({ games }) => {
  // const { title, desc, img, site_name, favIcon, link, canonical } =
  //   useUserSEOData(leader);

  //   const [modalState, setModalState] = useState<"none" | "auth">("none");

  const { user, hideRecapcha, authStatus } = useAuth(undefined);

  const { recaptcha, element } = useRecapcha(authStatus === "FAILED");

  //   const setAuthIsVisible = () => {
  //     setModalState("auth");
  //   };

  //   console.log("user", user);

  // console.log("parentEvent", parentEvent?.eventStarts, parentEvent?.id);
  // console.log("selectedEvent", selectedEvent?.eventStarts);

  return (
    <DefaultLayout
      title={feedSEO.title}
      description={feedSEO.description}
      canonical={feedSEO.link}
      noIndex={false}
      img={feedSEO.img}
      link={feedSEO.link}
    >
      {authStatus === "FAILED" ? (
        <div className="flex justify-center items-center  h-screen">
          <PhoneAuth placeholder="Enter your phone" recaptcha={recaptcha} />
        </div>
      ) : authStatus === "SUCCESS" && user ? (
        <FeedTemplate
          games={games}
          signedInUser={user}
          authStatus={authStatus}
        />
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
export default FeedPage;

export const getStaticProps: GetStaticProps = async () => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const [fatBurnerGame, wfhChallenge, challengeOne, fatBurnerChallenge] =
    await Promise.all([
      db.collection("sbEvents").doc(FAT_BURNER_GAME).get(),
      db.collection("sbEvents").doc(WFH_CHALLENGE).get(),
      db.collection("sbEvents").doc(CHALLENGE_ONE).get(),
      db.collection("sbEvents").doc(FAT_BURNER_CHALLENGE).get(),
    ]);

  const returnedGames: EventInterface[] = [];
  if (fatBurnerGame.exists) {
    returnedGames.push(fatBurnerGame.data() as EventInterface);
  }

  if (wfhChallenge.exists) {
    returnedGames.push(wfhChallenge.data() as EventInterface);
  }

  if (fatBurnerChallenge.exists) {
    returnedGames.push(fatBurnerChallenge.data() as EventInterface);
  }

  if (challengeOne.exists) {
    returnedGames.push(challengeOne.data() as EventInterface);
  }

  return {
    revalidate: 1,
    props: {
      games: returnedGames,
    },
  };
};
