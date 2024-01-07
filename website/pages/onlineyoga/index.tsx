import { homeSEO } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import LeadGenModule from "@modules/LeadgenModule";

interface Props {}

const LeadGen: React.FC<Props> = () => {
  return (
    <DefaultLayout
      title={"SocialBoat: Get LIVE online yoga classes"}
      description={
        "Try our hormone balancing yoga classes. These yoga classes are taken by trained and experienced yoga instructors of SocialBoat"
      }
      link={`https://socialboat.live/onlineyoga`}
      canonical={`https://socialboat.live/onlineyoga`}
      noIndex={false}
      img={homeSEO.img}
    >
      <LeadGenModule
        strongTitle="Online Yoga"
        title=" Classes with country’s Best Coaches."
        subtitle="A Holistic Health plan for Women."
      />
    </DefaultLayout>
  );
};

export default LeadGen;
