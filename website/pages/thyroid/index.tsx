import { homeSEO } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import LeadGenModule from "@modules/LeadgenModule";

interface Props {}

const LeadGen: React.FC<Props> = () => {
  return (
    <DefaultLayout
      title={"SocialBoat: Treat Thyroid with diet, exercise and medicine"}
      description={
        "Try Thyroid reversal program by SocialBoat. Over 30,000 people have managed their Thyroid with SocialBoat's at home Thyroid management program"
      }
      link={`https://socialboat.live/thyroid`}
      canonical={`https://socialboat.live/thyroid`}
      noIndex={false}
      img={homeSEO.img}
    >
      <LeadGenModule
        strongTitle="Thyroid"
        title=" Management for Women. A Science Backed Approach."
        subtitle="Get a personal dietician, Exercise Coach and Gynaecologist."
      />
    </DefaultLayout>
  );
};

export default LeadGen;
