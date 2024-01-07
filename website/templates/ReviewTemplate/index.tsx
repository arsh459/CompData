import WhatsAppChat from "@components/WhatsAppChat";
import { womenGroupImg } from "@constants/icons/iconURLs";
import { Testimonial } from "@models/Testimonial/interface";
import FooterV3 from "@modules/footer/FooterV3";

import { useRef } from "react";
// import { UserInterface } from "@models/User/User";
// import HeroWithUser from "./components/HeroWithUser";

// import { PostsOrPages } from "@tryghost/content-api";
// import { Story } from "@models/Stories/interface";
import { Background } from "@templates/WomenTemplate/components/Background";
import Transformations from "@templates/WomenTemplate/components/V2/Transformations";
import Testimonials from "@templates/WomenTemplate/components/V2/Testimonials";
import JoinRevolutionV2 from "@templates/WomenTemplate/components/V2/JoinRevolutionV2";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import ReviewHeroV2 from "@templates/WomenTemplate/components/V2/ReviewHeroV2";
import FundingFrom from "@templates/LandingPage/V2/LandingTransformation/components/FundingFrom";
import { fundingFrom } from "@templates/WomenTemplate/utils";
import LandingHeaderV2 from "@templates/WomenTemplate/components/V3/LandingHeaderV2";
// import { useRouter } from "next/router";

interface Props {
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
  // user?: UserInterface;
  // allStories?: Story[];
  // posts: PostsOrPages | null;
}

const ReviewTemplate: React.FC<Props> = ({
  testimonials,
  videoTestimonials,
  // user,
  // allStories,
  // posts,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  // const router = useRouter();
  const { coachRef } = useCoachAtt();
  // const q = router.query as { home?: string; coach?: string };

  return (
    <div
      ref={parentRef}
      className="bg-[#100F1A] text-white w-screen min-h-screen scrollbar-hide relative z-0"
    >
      <Background imgUrl="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/Rectangle_2192_1N9_WKdCM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674822458738" />

      <LandingHeaderV2
        route={`/start?origin=women${coachRef ? `&${coachRef}` : ""}`}
        btnText="Start Journey"
        coachRef={coachRef}
        activeLink="link_1"
      />
      <ReviewHeroV2 />

      <Testimonials
        testimonials={testimonials}
        bgColor={`bg-[#FD7AFF3D] backdrop-blur-xl`}
      />
      <FundingFrom data={fundingFrom} />
      <Transformations videoTestimonials={videoTestimonials} />

      {/* {posts ? <ReviewPageBlogs posts={posts} /> : null} */}

      <JoinRevolutionV2 origin="women" />
      <div className="w-32 aspect-1" />

      <div className="bg-[#FFFFFF1A] border-t border-white/30">
        <FooterV3 footerImg={womenGroupImg} />
      </div>

      <WhatsAppChat
        redirectLink="https://api.whatsapp.com/send?phone=919958730020&text=Hi! I have a question"
        position="right-5 bottom-20"
      />
    </div>
  );
};

export default ReviewTemplate;
