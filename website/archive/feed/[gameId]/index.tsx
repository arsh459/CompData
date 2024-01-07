import Loading from "@components/loading/Loading";
import { feedSEO } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import DefaultLayout from "@layouts/DefaultLayout";
import PhoneAuth from "@templates/apply/Form/PhoneAuth";
import FeedPageTemplate from "@templates/feed/FeedPageTemplate";
import { GetStaticPaths, GetStaticProps } from "next";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
import { EventInterface } from "@models/Event/Event";
import { FAT_BURNER_GAME } from "@constants/gameStats";

interface Props {
  game: EventInterface | null;
}

const FeedPage: React.FC<Props> = ({ game }) => {
  //   const router = useRouter();
  const { user, hideRecapcha, authStatus } = useAuth(undefined);
  const { recaptcha, element } = useRecapcha(authStatus === "FAILED");
  //   const [eventKey, setEventKey] = useState<string>("");

  //   useEffect(() => {
  //     if (typeof router.query.eventKey === "string") {
  //       setEventKey(router.query.eventKey);
  //     }
  //   }, [router.query.eventKey]);
  //   console.log("game", game);

  return (
    <DefaultLayout
      title={feedSEO.title}
      description={feedSEO.description}
      canonical={feedSEO.link}
      noIndex={false}
      img={feedSEO.img}
      link={feedSEO.link}
    >
      {!game ? null : (
        <>
          {authStatus === "FAILED" ? (
            <div className="flex justify-center items-center  h-screen">
              <PhoneAuth placeholder="Enter your phone" recaptcha={recaptcha} />
            </div>
          ) : authStatus === "SUCCESS" && user ? (
            <FeedPageTemplate
              signedInUser={user}
              authStatus={authStatus}
              gameId={game.id}
              game={game}
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
        </>
      )}
    </DefaultLayout>
  );
};

export default FeedPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          gameId: FAT_BURNER_GAME,
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const gameId = params ? params.gameId : "";

  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  if (typeof gameId === "string") {
    const game = await db.collection("sbEvents").doc(gameId).get();

    if (game.exists) {
      return {
        revalidate: 1,
        props: {
          game: game.data() as EventInterface,
        },
      };
    }
  }

  return {
    revalidate: 1,
    props: {
      game: null,
    },
  };
};
