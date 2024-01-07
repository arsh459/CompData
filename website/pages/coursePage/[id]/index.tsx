import { homeDomain, rectWomenImg, womenImg } from "@constants/seoData";
import DefaultLayout from "@layouts/DefaultLayout";
import { Badge } from "@models/Prizes/PrizeV2";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import LoadingModal from "@components/loading/LoadingModal";
import { useAuth } from "@hooks/auth/useAuth";
import UserAuthTemplate from "@templates/UserAuthTemplate";
import Loading from "@components/loading/Loading";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import CoursePageTemplate from "@templates/CoursePageTemplate";

interface Props {
  id: string;
  badge?: Badge;
}

const CoursePage: React.FC<Props> = ({ id, badge }) => {
  const { isFallback } = useRouter();
  const { authStatus, user } = useAuth();

  if (isFallback) {
    return (
      <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
        <LoadingModal fill="#FF4266" width={100} height={100} fixed={true} />
      </div>
    );
  }

  return (
    <DefaultLayout
      title={
        badge?.name
          ? `Start: ${badge?.name}`
          : "SocialBoat: A course to treat PCOS"
      }
      description={
        badge?.courseGoal
          ? badge.courseGoal
          : "Start: Treat PCOS PCOD at home with an expert on SocialBoat"
      }
      link={`https://${homeDomain}/coursePage/${id}`}
      canonical={`https://${homeDomain}/coursePage/${id}`}
      img={womenImg}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {authStatus === "FAILED" ? (
        <UserAuthTemplate deviceType="android" setDeviceType={() => {}} />
      ) : authStatus === "SUCCESS" && badge && user && user.badgeId ? (
        <CoursePageTemplate badge={badge} user={user} />
      ) : (
        <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default CoursePage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: "d3b54de8-ac46-431c-b174-ab3351729413",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params && typeof params.id === "string" ? params.id : "";

  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const remoteDocs = await db
    .collection("sbEvents")
    .doc(TEAM_ALPHABET_GAME)
    .collection("badges")
    .doc(id)
    .get();

  if (remoteDocs.data()) {
    return {
      revalidate: 1,
      props: {
        id,
        badge: remoteDocs.data() as Badge,
      },
    };
  }

  return {
    revalidate: 1,
    props: {
      id,
    },
  };
};
