import { homeSEO } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import LeadGenModule from "@modules/LeadgenModule";

interface Props {}

const LeadGen: React.FC<Props> = () => {
  return (
    <DefaultLayout
      title={"SocialBoat: Treat PCOS with diet, exercise and medicine"}
      description={
        "Try PCOS reversal program by SocialBoat. Over 34,000 people have regularised their cycle, lost 10kg+ weight and reduced acne and facial hair. India's top rated Trainers"
      }
      link={`https://socialboat.live/transform`}
      canonical={`https://socialboat.live/transform`}
      noIndex={false}
      img={homeSEO.img}
    >
      <LeadGenModule
        strongTitle="30,000+"
        title="women have managed their PCOS at home"
        subtitle="Get a personal dietician, yoga coach and Gynaecologist"
      />
    </DefaultLayout>
  );
};

export default LeadGen;
