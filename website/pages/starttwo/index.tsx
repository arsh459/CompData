import { homeSEO } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import Loading from "@components/loading/Loading";
import UserAuthTemplate from "@templates/UserAuthTemplate";
import JoinBoatTemplateV7 from "@templates/joinBoatTemplate/V7/JoinBoatTemplateV7";

interface Props {}

const StartTwo: React.FC<Props> = () => {
  const { authStatus } = useAuth();
  // console.log("Hi I am here");
  return (
    <DefaultLayout
      title={"SocialBoat: Book Health Consultation"}
      description="Answer the following questions to get a Free health consultation with a SocialBoat expert. Over 34,000 people on SocialBoat have regularised their cycle & lost 15+Kgs."
      link={`https://socialboat.live/starttwo`}
      canonical={`https://socialboat.live/starttwo`}
      noIndex={false}
      img={homeSEO.img}
    >
      {authStatus === "FAILED" ? (
        <UserAuthTemplate
          deviceType="android"
          setDeviceType={() => {}}
          // org={query.org}
        />
      ) : authStatus === "SUCCESS" ? (
        <div className="fixed inset-0 z-0 bg-[#232136] flex flex-col text-white overflow-y-scroll scrollbar-hide">
          <JoinBoatTemplateV7 />
        </div>
      ) : (
        <div className="fixed inset-0 z-0 bg-[#232136] flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default StartTwo;
