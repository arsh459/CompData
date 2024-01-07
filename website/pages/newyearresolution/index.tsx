import { rectnewYearResolutionImg } from "@constants/seo";
import { seoData } from "@constants/seoData";
import DefaultLayout from "@layouts/DefaultLayout";
import { Testimonial } from "@models/Testimonial/interface";
import ResolutionTemplate from "@templates/ResolutionTemplate";
import { getPriorityTestimonialsOnServerSide } from "@utils/testimonials";

import { GetStaticProps } from "next";

interface Props {
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
}

const JoinGoMMT: React.FC<Props> = ({ testimonials, videoTestimonials }) => {
  return (
    <DefaultLayout
      title={seoData.newyearresolutionPage.title}
      description={seoData.newyearresolutionPage.description}
      link={seoData.newyearresolutionPage.link}
      canonical={seoData.newyearresolutionPage.link}
      img={seoData.newyearresolutionPage.img}
      noIndex={false}
      siteName="SocialBoat"
      rectImg={rectnewYearResolutionImg}
      width={1200}
      height={627}
    >
      <ResolutionTemplate
        testimonials={testimonials}
        videoTestimonials={videoTestimonials}
      />
    </DefaultLayout>
  );
};

export default JoinGoMMT;

export const getStaticProps: GetStaticProps = async () => {
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
