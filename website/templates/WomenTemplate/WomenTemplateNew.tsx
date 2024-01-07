import WhatsAppChat from "@components/WhatsAppChat";
import { womenGroupImg } from "@constants/icons/iconURLs";
import { Testimonial } from "@models/Testimonial/interface";
import FooterV3 from "@modules/footer/FooterV3";
import { Background } from "./components/Background";
import { useRef } from "react";
import HeroV2 from "./components/V2/HeroV2";
import LandingHeader from "@templates/WomenTemplate/components/V2/LandingHeader";
import ProvenResult from "./components/V2/ProvenResult";
import OurFAQ from "./components/V2/OurFAQ";
import JoinRevolutionV2 from "./components/V2/JoinRevolutionV2";
import Regime from "./components/V2/Regime";
import FeaturedCollection from "./components/V2/FeaturedCollection";
import { PostsOrPages } from "@tryghost/content-api";
import FundingFrom from "@templates/LandingPage/V2/LandingTransformation/components/FundingFrom";
import Transformations from "./components/V2/Transformations";
import Testimonials from "./components/V2/Testimonials";
import { fundingFrom } from "./utils";
import IntroducingV2 from "./components/V2/IntroducingV2";
import DietAndWorkout from "./components/V2/DietAndWorkout";
import YouExpect from "./components/V2/YouExpect";
import { Story } from "@models/Stories/interface";
import BonasItems from "./components/V2/BonasItems";
import Steps from "./components/V2/Steps";
import { Badge } from "@models/Prizes/PrizeV2";
import Programs from "@templates/InfluencerTemplate/Programs";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import { useAuth } from "@hooks/auth/useAuth";

interface Props {
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
  allStories: Story[];
  badges: Badge[];
  posts: PostsOrPages | null;
  origin: string;
}

const WomenTemplateNew: React.FC<Props> = ({
  testimonials,
  videoTestimonials,
  posts,
  origin,
  badges,
}) => {
  const { authStatus, user } = useAuth();
  const parentRef = useRef<HTMLDivElement>(null);

  const { coachRef } = useCoachAtt();

  const primaryCta: { text: string; route: string } =
    authStatus !== "PENDING" && authStatus === "SUCCESS" && user?.badgeId
      ? { text: "My Program", route: "/myProgram" }
      : {
          text: "Reverse PCOS now",
          route: `/start?origin=${origin}${coachRef ? `&${coachRef}` : ""}`,
        };

  return (
    <div
      ref={parentRef}
      className="bg-[#100F1A] text-white w-screen min-h-screen scrollbar-hide relative z-0"
    >
      <Background imgUrl="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/Rectangle_2192_1N9_WKdCM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674822458738" />

      <LandingHeader
        route={primaryCta.route}
        btnText={primaryCta.text}
        coachRef={coachRef}
      />
      <HeroV2 route={primaryCta.route} btnText={primaryCta.text} />

      <ProvenResult />

      <IntroducingV2 />

      <DietAndWorkout />

      <Steps />

      <YouExpect />

      <Programs badges={badges} />

      <BonasItems />

      <Transformations videoTestimonials={videoTestimonials} />

      <FundingFrom data={fundingFrom} />

      <Regime />

      <Testimonials
        testimonials={testimonials}
        bgColor={`bg-[#553CA8B2]/50 backdrop-blur-xl`}
      />

      <OurFAQ />

      {posts ? <FeaturedCollection posts={posts} /> : null}

      <JoinRevolutionV2 origin="women" />
      <div className="w-32 aspect-1" />

      <div className="bg-[#FFFFFF1A] border-t border-white/30">
        <FooterV3 footerImg={womenGroupImg} />
      </div>

      <WhatsAppChat
        redirectLink="https://api.whatsapp.com/send?phone=919958730020&text=Hi! I would like to know more"
        position="right-5 bottom-20"
      />
    </div>
  );
};

export default WomenTemplateNew;
