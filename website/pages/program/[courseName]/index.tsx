import Loading from "@components/loading/Loading";
// import { useNewCast } from "@hooks/cast/useNewCast";
// import { useEffect, useState } from "react";
// import { useRTConnection } from "@hooks/cast/useRTConnection";
import DefaultLayout from "@layouts/DefaultLayout";
import { rectWomenImg } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import UserAuthTemplate from "@templates/UserAuthTemplate";
// import { useUserV2 } from "@hooks/auth/useUserV2";
// import { usePaidStatus } from "@hooks/paidStatus/usePaidStatus";
import { GetStaticPaths, GetStaticProps } from "next";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { Badge } from "@models/Prizes/PrizeV2";
import { greeshaCourse, womenImg } from "@constants/seoData";
import VideoPageTasks from "@modules/VideoPage/VideoPageTasks";
// import CourseHeader from "@templates/WomenTemplate/components/V2/CourseHeader";
// import { usePaidStatus } from "@hooks/paidStatus/usePaidStatus";
import HeroV2 from "@templates/CourseTemplate/HeroV2";
import { usePaidStatus } from "@hooks/paidStatus/usePaidStatus";
// import AccessModal from "@modules/AccessModal/AccessModal";

interface Props {
  badge?: Badge;
}

const Video: React.FC<Props> = ({ badge }) => {
  // const uid = "3oIXsFT2MneNwyFejqZ2erz2wMF2";
  const {
    authStatus,
    // signOut,
    user,
    uid,
  } = useAuth();
  const { status } = usePaidStatus(uid);

  // console.log("rtState", rtState);

  //   useEffect(() => {
  //     setheight(window.innerHeight);
  //   }, []);

  // return <Stream cast={cast} screenHeight={height} />;

  let smPreview = womenImg;
  if (badge?.slug === "greesha") {
    smPreview = greeshaCourse;
  }

  return (
    <DefaultLayout
      title={`SocialBoat: Your Menstrual Wellness Program`}
      description={`SocialBoat: Access your personal menstrual wellness program created by your SocialBoat Coach`}
      link={`https://socialboat.live/program/${badge?.slug}`}
      canonical={`https://socialboat.live/program/${badge?.slug}`}
      img={smPreview}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {
        // status === "INACTIVE" && authStatus === "SUCCESS" ? (
        // <AccessModal signOut={signOut} />
        // ) :

        authStatus === "FAILED" ? (
          <UserAuthTemplate
            deviceType="android"
            setDeviceType={() => {}}
            // org={query.org}
          />
        ) : //  :        status === "LOADING" ? (
        //   <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
        //     <Loading fill="#ff735c" width={48} height={48} />
        //   </div>
        // )

        authStatus === "SUCCESS" && badge && user?.uid ? (
          <div
            className="bg-[#232136] text-white w-screen min-h-screen scrollbar-hide overflow-hidden relative z-0"
            // className="w-screen h-full bg-[#100F1A] relative"
          >
            <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#946FFF] via-[#C556FF] to-[#FF53CF]" />
            {/* <CourseHeader userObj={user} onSignOut={signOut} /> */}
            <div className="relative z-0 ">
              <HeroV2 badge={badge} gender={user?.gender} />
            </div>
            <div className=" flex flex-col justify-center items-center bg-black/30 pt-12 px-4">
              <VideoPageTasks
                badge={badge}
                uid={uid}
                isPro={status === "ACTIVE"}
              />
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        )
      }
    </DefaultLayout>
  );
};

export default Video;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { courseName: "greesha" } },
      // { params: { userKey: "drmonavats" } },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params ? params.courseName : "";

  if (typeof slug === "string" && slug) {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const remoteDocs = await db
      .collection("sbEvents")
      .doc(TEAM_ALPHABET_GAME)
      .collection("badges")
      .where("slug", "==", slug)
      .get();

    if (remoteDocs.docs.length) {
      const badge = remoteDocs.docs[0].data() as Badge;

      return {
        revalidate: 1,
        props: {
          badge,
        },
      };
    }
  }

  return {
    revalidate: 1,
    props: {},
  };
};
