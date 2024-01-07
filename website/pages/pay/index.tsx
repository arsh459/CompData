import DefaultLayout from "@layouts/DefaultLayout";
import { useAuth } from "@hooks/auth/useAuth";
import Loading from "@components/loading/Loading";
import UserAuthTemplate from "@templates/UserAuthTemplate";
import { useRouter } from "next/router";
import { homeSEO } from "@constants/seo";
import PayTemplate from "@templates/PayTemplate";
import { currency } from "@templates/PaymentTemplate/SelectPlan";
import { GetStaticProps } from "next";
import { getSbPlans } from "@utils/testimonials";
import { SbPlans } from "@models/SbPlans/interface";

interface Props {
  plans: SbPlans[];
}

const PayPage: React.FC<Props> = ({ plans }) => {
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
      title={"SocialBoat: Buy the best PCOD treatment"}
      description={
        "Checkout page to buy SocialBoat PCOD treatment program designed for weight loss, irregular periods and acne"
      }
      link={`https://socialboat.live/pay`}
      canonical={`https://socialboat.live/pay`}
      noIndex={false}
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
          user={user}
          plans={plans}
          id={query.id}
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

export default PayPage;

export const getStaticProps: GetStaticProps = async () => {
  const plans = await getSbPlans();

  return {
    revalidate: true,
    props: {
      plans,
    },
  };
};
