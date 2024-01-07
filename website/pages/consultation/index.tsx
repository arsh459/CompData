import Loading from "@components/loading/Loading";
import { homeImg2 } from "@constants/seo";
import { rectWomenImg } from "@constants/seoData";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import UserAuthTemplate from "@templates/UserAuthTemplate";
import ConsultationSlot from "@templates/joinBoatTemplate/ConsultationSlot";

const BookZohoSlot: React.FC = () => {
  const { authStatus, uid } = useAuth();

  return (
    <DefaultLayout
      title="SocialBoat Health Consultation"
      description="Book a slot with our health expert to know more about our programs"
      img={homeImg2}
      canonical="https://socialboat.live/consultation"
      link="https://socialboat.live/consultation"
      width={360}
      height={360}
      rectImg={rectWomenImg}
      noIndex={true}
      siteName="SocialBoat"
    >
      {authStatus === "FAILED" ? (
        <UserAuthTemplate deviceType="android" setDeviceType={() => {}} />
      ) : authStatus === "SUCCESS" && uid ? (
        <div className="fixed inset-0 z-0 bg-[#232136] flex flex-col text-white overflow-y-scroll scrollbar-hide">
          <ConsultationSlot uid={uid} />
        </div>
      ) : (
        <div className="fixed inset-0 z-0 bg-[#232136] flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default BookZohoSlot;
