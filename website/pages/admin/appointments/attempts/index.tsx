import Loading from "@components/loading/Loading";
import { rectWomenImg, seoData } from "@constants/seoData";
import { useAuth } from "@hooks/auth/useAuth";
// import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import AppointmentAttemptTemplate from "@templates/AppointmentTemplate/Attempts/AppointmentAttemptTemplate";
import UserAuthTemplate from "@templates/UserAuthTemplate";

interface Props {}
const AppointmentAttempts: React.FC<Props> = ({}) => {
  const { authStatus, signOut, user } = useAuth();

  return (
    <DefaultLayout
      title="Appointment Attempts"
      description="Admin page to manage user appointments"
      img={seoData.appointmentPage.img}
      link="https://socialboat.live/admin/appointments/attempts"
      canonical="https://socialboat.live/admin/appointments/attempts"
      siteName="SocialBoat"
      noIndex={true}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {authStatus === "FAILED" ? (
        <UserAuthTemplate deviceType="android" setDeviceType={() => {}} />
      ) : authStatus === "SUCCESS" && user && user.role === "admin" ? (
        <AppointmentAttemptTemplate
          fetchAll={true}
          user={user}
          onSignOut={signOut}
        />
      ) : authStatus === "SUCCESS" && user ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Unauthorized access
        </div>
      ) : (
        <div className="fixed inset-0 z-0 bg-white flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default AppointmentAttempts;
