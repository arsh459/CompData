import DefaultLayout from "@layouts/DefaultLayout";
import { useAuth } from "@hooks/auth/useAuth";
import Loading from "@components/loading/Loading";
import JoinBoatTemplateV5 from "@templates/joinBoatTemplate/JoinBoatTemplateV5";
import { deviceTypes } from "@templates/PaymentTemplate/SelectDevice";
import { useEffect, useState } from "react";
import UserAuthTemplate from "@templates/UserAuthTemplate";
import { useRouter } from "next/router";
import { boatParamQueryV5 } from "@hooks/joinBoat/V5/useSection";
import { homeSEO } from "@constants/seo";

interface Props {}

const JoinBoatV5: React.FC<Props> = () => {
  const router = useRouter();
  const query = router.query as boatParamQueryV5;
  const { user, authStatus } = useAuth();
  // const { title, desc, img, site_name, favIcon } = useUserSEOData(user);
  const [deviceType, setDeviceType] = useState<deviceTypes | undefined>(
    query.device === "ios" || query.device === "android"
      ? query.device
      : undefined
  );

  useEffect(() => {
    if (router.isReady && query.device) {
      (query.device === "ios" || query.device === "android") &&
        setDeviceType(query.device);
    }
  }, [query.device, router.isReady]);

  // console.log("q", query);

  return (
    <DefaultLayout
      title={"SocialBoat: Join SocialBoat"}
      description={
        "Onboarding page for new users to sign up to SocialBoat and start their fitness journey"
      }
      link={`https://socialboat.live/joinBoatV5`}
      canonical={`https://socialboat.live/joinBoatV5`}
      noIndex={false}
      img={homeSEO.img}
    >
      {(!deviceType && query.device) || !router.isReady ? (
        <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : authStatus === "FAILED" || !deviceType ? (
        <UserAuthTemplate
          deviceType={deviceType}
          setDeviceType={setDeviceType}
          org={query.org}
        />
      ) : authStatus === "SUCCESS" && user && deviceType ? (
        <div className="fixed inset-0 z-0 bg-[#100F1A] flex flex-col text-white overflow-y-scroll scrollbar-hide">
          <JoinBoatTemplateV5 user={user} deviceType={deviceType} />
        </div>
      ) : (
        <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default JoinBoatV5;
