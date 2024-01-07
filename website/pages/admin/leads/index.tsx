import Loading from "@components/loading/Loading";
import { rectWomenImg, seoData } from "@constants/seoData";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import LeadAdminTemplate from "@templates/LeadTemplate/LeadAdminTemplate";
import UserAuthTemplate from "@templates/UserAuthTemplate";

interface Props {}
const Leads: React.FC<Props> = ({}) => {
  const { authStatus, user, signOut } = useAuth();

  return (
    <DefaultLayout
      title={"Admin page: Load leads for user"}
      description={"Leadgen page for SocialBoat admin users only"}
      img={seoData.consultationPage.img}
      link={"https://socialboat.live/admin/leads"}
      canonical={"https://socialboat.live/admin/leads"}
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
        <LeadAdminTemplate userObj={user} onSignOut={signOut} />
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

export default Leads;
