import { rectMmtImg } from "@constants/seo";
import { seoData } from "@constants/seoData";
import DefaultLayout from "@layouts/DefaultLayout";
import { Testimonial } from "@models/Testimonial/interface";
import MmtTemplate from "@templates/mmtTemplate";
import { getPriorityTestimonialsOnServerSide } from "@utils/testimonials";
import { GetStaticProps } from "next";

interface Props {
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
}

const JoinGoMMT: React.FC<Props> = ({ testimonials, videoTestimonials }) => {
  return (
    <DefaultLayout
      title={seoData.mmtPage.title}
      description={seoData.mmtPage.description}
      link={seoData.mmtPage.link}
      canonical={seoData.mmtPage.link}
      img={seoData.mmtPage.img}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectMmtImg}
      width={360}
      height={360}
    >
      <MmtTemplate
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
