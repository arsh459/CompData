import Loading from "@components/loading/Loading";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { greeshaCourse, rectWomenImg, womenImg } from "@constants/seoData";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { Badge } from "@models/Prizes/PrizeV2";
import ProgramHomeMain from "@modules/MyProgram/Components/ProgramHomeMain";
import UserAuthTemplate from "@templates/UserAuthTemplate";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
interface Props {
  badge?: Badge;
}

const ProgramBadge: React.FC<Props> = ({ badge }) => {
  const { authStatus, user } = useAuth();

  let smPreview = womenImg;
  if (badge?.slug === "greesha") {
    smPreview = greeshaCourse;
  }

  return (
    <DefaultLayout
      title={`SocialBoat: ${badge?.name}`}
      description={`SocialBoat: ${
        badge?.courseGoal ? badge.courseGoal : "Access to the program"
      }`}
      link={`https://socialboat.live/myProgram/${badge?.slug}`}
      canonical={`https://socialboat.live/myProgram/${badge?.slug}`}
      img={smPreview}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {authStatus === "FAILED" ? (
        <UserAuthTemplate deviceType="android" setDeviceType={() => {}} />
      ) : authStatus === "SUCCESS" && badge && user?.uid ? (
        <ProgramHomeMain badge={badge} user={user} />
      ) : (
        <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default ProgramBadge;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          badgeId: "id",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const badgeId = params ? params.badgeId : "";

  if (badgeId && typeof badgeId === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const badgeObj = await db
      .collection("sbEvents")
      .doc(TEAM_ALPHABET_GAME)
      .collection("badges")
      .doc(badgeId)
      .get();

    const result = badgeObj.data() as Badge;

    if (result)
      return {
        revalidate: 1,
        props: {
          badge: result,
        },
      };
  }

  return {
    revalidate: 1,
    props: {
      badge: {},
    },
  };
};
