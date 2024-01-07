import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { rectWomenImg, womenImg } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import { RoundInterface } from "@models/Event/Round";
import { oneDayMS } from "@models/slots/utils";
import SuperWomenChallengeTemplate from "@modules/super-women-challenge/SuperWomenChallengeTemplate";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  round?: RoundInterface;
  numUsers?: number;
}

const ChallengeLandingPage: React.FC<Props> = ({ round, numUsers }) => {
  return (
    <DefaultLayout
      title="SocialBoat: Treat PCOD with diet, exercise & medicine"
      description="#1 Menstrual wellness app for PCOS. We provide online treatment for PCOS, Thyroid with medicine, diet & exercise. All Programs are expert led and curated by AI"
      link={`https://socialboat.live/challenges/${round?.roundKey}`}
      noIndex={false}
      siteName="SocialBoat"
      canonical={`https://socialboat.live/challenges/${round?.roundKey}`}
      img={womenImg}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      <SuperWomenChallengeTemplate round={round} numUsers={numUsers} />
    </DefaultLayout>
  );
};

export default ChallengeLandingPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { roundKey: "superwoman-challenge" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const roundKey = params ? params.roundKey : "";
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const docs = await db
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("rounds")
    .where("roundKey", "==", roundKey)
    .limit(1)
    .get();

  if (docs.docs.length) {
    // const q = await db
    //   .collection("users")
    //   .orderBy("challengeJoined", "desc")
    //   .count()
    //   .get();

    const round = docs.docs[0].data() as RoundInterface;

    const initCount = 1245;
    const start = 1698922959000;
    const now = Date.now();
    const incDays = Math.floor((now - start) / oneDayMS);

    // const ct = q.data();
    // const numUsers = ct.count;
    return {
      revalidate: true,
      props: {
        numUsers: initCount + incDays,
        round: round,
      },
    };
  }

  return {
    revalidate: true,
    props: {},
  };
};
