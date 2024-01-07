import { homeSEO } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import LeadGenModule from "@modules/LeadgenModule";

interface Props {}

const LeadGen: React.FC<Props> = () => {
  return (
    <DefaultLayout
      title={"SocialBoat: Lose upto 12 kgs in 3 months"}
      description={
        "Try our weight loss plan that can help you lose upto 12 kgs in 3 months. All programs focus on holistic female health with a special focus on hormone balancing"
      }
      link={`https://socialboat.live/weightloss`}
      canonical={`https://socialboat.live/weightloss`}
      noIndex={false}
      img={homeSEO.img}
    >
      <LeadGenModule
        strongTitle="WeightLoss"
        title=" for Women. A Science Backed Approach."
        subtitle="Get a personal dietician, Exercise Coach and Gynaecologist."
      />
    </DefaultLayout>
  );
};

export default LeadGen;
