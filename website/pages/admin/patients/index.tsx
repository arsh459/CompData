import Loading from "@components/loading/Loading";
import { rectWomenImg, seoData } from "@constants/seoData";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import PatientTemplate from "@templates/PatientTemplate";
import UserAuthTemplate from "@templates/UserAuthTemplate";

interface Props {}
const Patients: React.FC<Props> = ({}) => {
  const { authStatus, user, signOut } = useAuth();

  return (
    <DefaultLayout
      title={seoData.consultationPage.title}
      description={seoData.consultationPage.description}
      img={seoData.consultationPage.img}
      link={seoData.consultationPage.link}
      canonical={seoData.consultationPage.link}
      siteName="SocialBoat"
      noIndex={true}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {authStatus === "FAILED" ? (
        <UserAuthTemplate deviceType="android" setDeviceType={() => {}} />
      ) : authStatus === "SUCCESS" &&
        user &&
        (user.isDoctor || user.role === "admin") ? (
        <PatientTemplate userObj={user} onSignOut={signOut} />
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

export default Patients;
