import { rectWomenImg, womenImg } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import { Testimonial } from "@models/Testimonial/interface";
import ReviewTemplate from "@templates/ReviewTemplate";
import { getPriorityTestimonialsOnServerSide } from "@utils/testimonials";
import { GetStaticProps } from "next";

interface Props {
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
  // stories: Story[];
  // posts: PostsOrPages | null;
}

const ReviewPage: React.FC<Props> = ({
  testimonials,
  videoTestimonials,
  // stories,
  // posts,
}) => {
  // console.log("t", testimonials);

  return (
    <DefaultLayout
      title="SocialBoat Reviews"
      description="SocialBoat has helped over 5000 women in India to lose weight and revere PCOS/PCOD with effective diet and workout programs"
      link="https://socialboat.live/reviews"
      noIndex={false}
      siteName="SocialBoat"
      canonical="https://socialboat.live/reviews"
      img={womenImg}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      <ReviewTemplate
        testimonials={testimonials}
        videoTestimonials={videoTestimonials}
        // allStories={stories}
        // posts={posts}
      />
    </DefaultLayout>
  );
};

export default ReviewPage;

export const getStaticProps: GetStaticProps = async ({}) => {
  const { testimonials, videoTestimonials } =
    await getPriorityTestimonialsOnServerSide();
  // const { stories } = await getStoriesOnServerSide();

  return {
    revalidate: true,
    props: {
      testimonials,
      videoTestimonials,
      // stories,
      // posts: res?.posts || null,
    },
  };
};
