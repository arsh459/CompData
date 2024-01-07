// import Loading from "@components/loading/Loading";
import { rectWomenImg, womenImg } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { SbPlans } from "@models/SbPlans/interface";
import { Testimonial } from "@models/Testimonial/interface";
import OurPlans from "@templates/OurPlans";
// import { deviceTypes } from "@templates/PaymentTemplate/SelectDevice";
// import UserAuthTemplate from "@templates/UserAuthTemplate";
import {
  getPriorityTestimonialsOnServerSide,
  getSbPlans,
} from "@utils/testimonials";
import { GetStaticProps } from "next";
// import { useState } from "react";

interface Props {
  testimonials: Testimonial[];
  plans: SbPlans[];
}

const PlansPage: React.FC<Props> = ({ testimonials, plans }) => {
  const { user } = useAuth();
  // const [deviceType, setDeviceType] = useState<deviceTypes | undefined>(
  //   undefined
  // );

  return (
    <DefaultLayout
      title="SocialBoat plans for PCOD Treatment"
      description="Our Pricing plans for pcod treatment. We offer 1 month, 3 month and yearly plans that will help you reverse pcos"
      link="https://socialboat.live/plans"
      noIndex={false}
      siteName="SocialBoat"
      canonical="https://socialboat.live/plans"
      img={womenImg}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      <div className="fixed inset-0 z-0 bg-[#100F1A] flex flex-col text-white overflow-y-scroll scrollbar-hide">
        <OurPlans
          testimonials={testimonials}
          user={user}
          deviceType={"android"}
          plans={plans}
        />
      </div>
    </DefaultLayout>
  );
};

export default PlansPage;

export const getStaticProps: GetStaticProps = async () => {
  const { testimonials } = await getPriorityTestimonialsOnServerSide();
  const plans = await getSbPlans();

  return {
    revalidate: true,
    props: {
      testimonials,
      plans,
    },
  };
};
