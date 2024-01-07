import { Testimonial } from "@models/Testimonial/interface";
import LandingPageTemplateV2 from "@templates/LandingPage/LandingPageV2";
import { LandingDataProvider } from "@templates/LandingPage/V2/providers/LandingDataProvider";
import { getPriorityTestimonialsOnServerSide } from "@utils/testimonials";
import { GetStaticProps } from "next";

interface Props {
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
}

export type modalStateType = "none" | "auth" | "welcome" | "post";

const UserPage: React.FC<Props> = ({ testimonials, videoTestimonials }) => {
  return (
    <LandingDataProvider slug="base">
      <LandingPageTemplateV2
        testimonials={testimonials}
        videoTestimonials={videoTestimonials}
      />
    </LandingDataProvider>
  );
};
export default UserPage;

export const getStaticProps: GetStaticProps = async ({}) => {
  // const firebase = (await import("@config/adminFire")).default;
  // const db = firebase.firestore();

  // const remoteDocs = await db
  //   .collection("testimonials")
  //   .orderBy("priority", "asc")
  //   .limit(30)
  //   .get();

  // const testimonials: Testimonial[] = [];
  // const videoTestimonials: Testimonial[] = [];
  // for (const test of remoteDocs.docs) {
  //   const testimonial = test.data() as Testimonial;

  //   if (testimonial.isTransformation && testimonial.youtubeId) {
  //     // console.log(tmpLeader.externalLink, tmpLeader.instagramLink);
  //     videoTestimonials.push(testimonial);
  //   } else {
  //     testimonials.push(testimonial);
  //   }
  // }

  const { testimonials, videoTestimonials } =
    await getPriorityTestimonialsOnServerSide();

  return {
    revalidate: true,
    props: {
      testimonials,
      videoTestimonials,
    },
  };
};
