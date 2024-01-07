import Loading from "@components/loading/Loading";
import { rectWomenImg, womenImg } from "@constants/seoData";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
// import AccessModal from "@modules/AccessModal/AccessModal";
import ExploreTemplate from "@templates/ExploreTemplate";
import UserAuthTemplate from "@templates/UserAuthTemplate";

interface Props {
  // badge?: Badge;
  // badges?: Badge[];
}

const ExploreAllPage: React.FC<Props> = ({}) => {
  const { authStatus, signOut, user } = useAuth();

  let smPreview = womenImg;

  return (
    <DefaultLayout
      title={`SocialBoat: Workouts, Yoga and HIIT`}
      description={`SocialBoat: Discover Menstrual wellness yoga, HIIT and cardio programs on SocialBoat`}
      link={`https://socialboat.live/explore`}
      canonical={`https://socialboat.live/explore`}
      img={smPreview}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {
        // status === "INACTIVE" && authStatus === "SUCCESS" ? (
        //   <AccessModal signOut={signOut} />
        // ) :

        authStatus === "FAILED" ? (
          <UserAuthTemplate
            deviceType="android"
            setDeviceType={() => {}}
            // org={query.org}
          />
        ) : authStatus === "SUCCESS" && user && user?.uid ? (
          <ExploreTemplate signOut={signOut} user={user} />
        ) : (
          <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        )
      }
    </DefaultLayout>
  );
};

export default ExploreAllPage;
