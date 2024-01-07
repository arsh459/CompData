import Loading from "@components/loading/Loading";
import { rectWomenImg, seoData } from "@constants/seoData";
import { useAuth } from "@hooks/auth/useAuth";
// import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import AppointmentTemplate from "@templates/AppointmentTemplate";
import UserAuthTemplate from "@templates/UserAuthTemplate";

interface Props {}
const Appointments: React.FC<Props> = ({}) => {
  const { authStatus, signOut, user } = useAuth();

  return (
    <DefaultLayout
      title={seoData.appointmentPage.title}
      description={seoData.appointmentPage.description}
      img={seoData.appointmentPage.img}
      link={seoData.appointmentPage.link}
      canonical={seoData.appointmentPage.link}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {authStatus === "FAILED" ? (
        <UserAuthTemplate deviceType="android" setDeviceType={() => {}} />
      ) : authStatus === "SUCCESS" &&
        user &&
        (user.isDoctor || user.role === "admin") ? (
        <AppointmentTemplate user={user} onSignOut={signOut} />
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

export default Appointments;
