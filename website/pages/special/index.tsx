import DefaultLayout from "@layouts/DefaultLayout";
import { useAuth } from "@hooks/auth/useAuth";
import Loading from "@components/loading/Loading";
import UserAuthTemplate from "@templates/UserAuthTemplate";
import { useRouter } from "next/router";
import { homeSEO } from "@constants/seo";
import PayTemplate from "@templates/PayTemplate";
import { currency } from "@templates/PaymentTemplate/SelectPlan";
import { SbPlans } from "@models/SbPlans/interface";
import { getSbPlans } from "@utils/testimonials";
import { GetStaticProps } from "next";

interface Props {
  plans: SbPlans[];
}

const PayPageV2: React.FC<Props> = ({ plans }) => {
  const router = useRouter();
  const query = router.query as {
    duration?: string;
    currency?: string;
    id?: string;
  };
  const { user, authStatus } = useAuth();

  // console.log("query", query);
  return (
    <DefaultLayout
      title={"SocialBoat: Special Pricing Offer"}
      description={
        "This is a special plan upgrade offer created only for you by your health coach."
      }
      link={`https://socialboat.live/special`}
      canonical={`https://socialboat.live/special`}
      noIndex={true}
      img={homeSEO.img}
    >
      {!router.isReady ? (
        <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : authStatus === "FAILED" ? (
        <UserAuthTemplate deviceType="android" setDeviceType={() => {}} />
      ) : authStatus === "SUCCESS" && user ? (
        <PayTemplate
          splUID={query.id}
          user={user}
          plans={plans}
          durationInDays={query.duration ? parseInt(query.duration) : 30}
          currency={(query.currency || "INR") as currency}
        />
      ) : (
        <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default PayPageV2;

export const getStaticProps: GetStaticProps = async () => {
  const plans = await getSbPlans();

  return {
    revalidate: true,
    props: {
      plans,
    },
  };
};
