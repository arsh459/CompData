import { leadgenObj } from "@constants/leadgen";
import { homeSEO } from "@constants/seo";
// import { useUserSEOData } from "@hooks/event/useUserSEOData";
import DefaultLayout from "@layouts/DefaultLayout";
import { LandingLeaderboard } from "@models/LeaderBoard/Leaderboard";
import { Testimonial } from "@models/Testimonial/interface";
import { UserInterface } from "@models/User/User";
import About from "./leadgenComponents/About";
import Benifits from "./leadgenComponents/Benifits";
// import Features from "./leadgenComponents/Features";
import Footer from "./leadgenComponents/Footer";
import Hero from "./leadgenComponents/Hero";
import Session from "./leadgenComponents/Session";
import Testimonials from "./leadgenComponents/Testimonials";

interface Props {
  leaders: LandingLeaderboard[];
  invitedBy?: UserInterface;
  leadgenKey: string;
  testimonials?: Testimonial[];
}

const LeadGenTemplate: React.FC<Props> = ({
  leaders,
  invitedBy,
  leadgenKey,
  testimonials,
}) => {
  // const { title, link, img, canonical, desc } = useUserSEOData(invitedBy);

  const leadgen =
    leadgenKey && leadgenObj[leadgenKey] ? leadgenObj[leadgenKey] : undefined;

  return (
    <DefaultLayout
      title={leadgen?.hero.title ? leadgen?.hero.title : "SocialBoat"}
      link={`https://socialboat.live/l/${leadgenKey}`}
      img={leadgen?.hero.media ? leadgen.hero.media : homeSEO.img}
      canonical={`https://socialboat.live/l/${leadgenKey}`}
      noIndex={false}
      description={
        leadgen?.hero.subTitle
          ? leadgen.hero.subTitle
          : "Virtual Olympics for home workouts"
      }
    >
      {leadgen ? (
        <div
          className="w-screen h-screen bg-[#100F1A] text-[#F5F8FF] overflow-x-hidden overflow-y-scroll relative z-0"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          <Hero leadgen={leadgen} />
          <Benifits leadgen={leadgen} />
          <Session leadgen={leadgen} />
          <Testimonials testimonials={testimonials} />
          {/* <Features leadgen={leadgen} /> */}
          <About leadgen={leadgen} />
          <Footer />
        </div>
      ) : null}
    </DefaultLayout>
  );
};

export default LeadGenTemplate;
