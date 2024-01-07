import { homeSEO } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import JoinBoatTemplateV6 from "@templates/joinBoatTemplate/JoinBoatTemplateV6";
import Loading from "@components/loading/Loading";
import UserAuthTemplate from "@templates/UserAuthTemplate";
import { useDeviceStoreDateInit } from "@analytics/webengage/fb/hooks/useDeviceStoreInit";

interface Props {}

const Start: React.FC<Props> = () => {
  const { authStatus } = useAuth();
  // console.log("Hi I am here");
  useDeviceStoreDateInit();
  return (
    <DefaultLayout
      title={"SocialBoat: Start your journey"}
      description={
        "A 1 minute Free fitness quiz to create a custom fitness and nutrition plan for you. Quiz is designed for PCOS/PCOD, Weight loss and general well being."
      }
      link={`https://socialboat.live/start`}
      canonical={`https://socialboat.live/start`}
      noIndex={false}
      img={homeSEO.img}
    >
      {authStatus === "FAILED" ? (
        <UserAuthTemplate
          deviceType="android"
          setDeviceType={() => {}}
          /// org={query.org}
        />
      ) : authStatus === "SUCCESS" ? (
        <div className="fixed inset-0 z-0 bg-[#232136] flex flex-col text-white overflow-y-scroll scrollbar-hide">
          <JoinBoatTemplateV6 />
        </div>
      ) : (
        <div className="fixed inset-0 z-0 bg-[#232136] flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default Start;
