import Loading from "@components/loading/Loading";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useAuth } from "@hooks/auth/useAuth";
// import { usePaidStatus } from "@hooks/paidStatus/usePaidStatus";
// import AccessModal from "@modules/AccessModal/AccessModal";
import MyProgramTemplate from "@templates/MyProgramTemplate";
import UserAuthTemplate from "@templates/UserAuthTemplate";
import { useBadge } from "@hooks/badges/useBadge";
import { greeshaCourse, rectWomenImg, womenImg } from "@constants/seoData";
import DefaultLayout from "@layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Props {}

const MyProgramPage: React.FC<Props> = ({}) => {
  const { authStatus, signOut, user } = useAuth();
  const [loading, setLoading] = useState(true);
  // const { status } = usePaidStatus(uid);
  const router = useRouter();

  const { badge } = useBadge(TEAM_ALPHABET_GAME, user?.badgeId);
  let smPreview = womenImg;
  if (badge?.slug === "greesha") {
    smPreview = greeshaCourse;
  }

  useEffect(() => {
    if (user) {
      if (user.badgeId) {
        setLoading(false);
      } else {
        router.push("/start?origin=myProgram");
      }
    }
  }, [user, router]);

  return (
    <DefaultLayout
      title={`SocialBoat: My Program`}
      description={`SocialBoat: Access your personal made by your SocialBoat coach`}
      link={`https://socialboat.live/myProgram`}
      canonical={`https://socialboat.live/myProgram`}
      img={smPreview}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {authStatus === "FAILED" ? (
        <UserAuthTemplate deviceType="android" setDeviceType={() => {}} />
      ) : authStatus === "SUCCESS" &&
        badge &&
        user &&
        user.badgeId &&
        !loading ? (
        <MyProgramTemplate badge={badge} signOut={signOut} user={user} />
      ) : (
        <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default MyProgramPage;
