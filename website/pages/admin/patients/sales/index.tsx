import Loading from "@components/loading/Loading";
import { rectWomenImg, seoData } from "@constants/seoData";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import AllPatientsTemplate from "@templates/PatientTemplate/AllPatientsTemplate";
import UserAuthTemplate from "@templates/UserAuthTemplate";

interface Props {}
const SalesPatients: React.FC<Props> = ({}) => {
  const { authStatus, user, signOut } = useAuth();

  return (
    <DefaultLayout
      title={"SocialBoat: Sales Page of signups"}
      description={"Admin page. Information is private and confidential"}
      img={seoData.consultationPage.img}
      link={"https://socialboat.live/admin/patients/sales"}
      canonical={"https://socialboat.live/admin/patients/sales"}
      siteName="SocialBoat"
      noIndex={true}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {authStatus === "FAILED" ? (
        <UserAuthTemplate deviceType="android" setDeviceType={() => {}} />
      ) : authStatus === "SUCCESS" && user && user.role === "admin" ? (
        <AllPatientsTemplate userObj={user} onSignOut={signOut} />
      ) : authStatus === "SUCCESS" && user ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Unauthorized access
        </div>
      ) : (
        <div className="fixed inset-0 z-0  flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default SalesPatients;
