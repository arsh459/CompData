import { rectLeaderImg, leaderImg } from "@constants/seo";
import { seoData } from "@constants/seoData";
import DefaultLayout from "@layouts/DefaultLayout";
import { Testimonial } from "@models/Testimonial/interface";
import LeaderTemplate from "@templates/LeaderTemplate";
// import WomenTemplate from "@templates/WomenTemplate";
import { getPriorityTestimonialsOnServerSide } from "@utils/testimonials";
import { GetStaticProps } from "next";

interface Props {
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
}

const LeaderLandingPage: React.FC<Props> = ({
  testimonials,
  videoTestimonials,
}) => {
  // console.log("t", testimonials);
  return (
    <DefaultLayout
      title={seoData.leaderPage.title}
      description={seoData.leaderPage.description}
      link={seoData.leaderPage.link}
      canonical={seoData.leaderPage.link}
      noIndex={false}
      siteName="SocialBoat"
      img={leaderImg}
      rectImg={rectLeaderImg}
      width={360}
      height={360}
    >
      <LeaderTemplate
        testimonials={testimonials}
        videoTestimonials={videoTestimonials}
      />
    </DefaultLayout>
  );
};

export default LeaderLandingPage;

export const getStaticProps: GetStaticProps = async ({}) => {
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
