import { rectWomenImg, womenImg } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import { Badge } from "@models/Prizes/PrizeV2";
import { Story } from "@models/Stories/interface";
import { Testimonial } from "@models/Testimonial/interface";
// import WomenTemplate from "@templates/WomenTemplate";
// import WomenTemplate2 from "@templates/WomenTemplate/WomenTemplate2";
import WomenTemplateNew from "@templates/WomenTemplate/WomenTemplateNew";
import { PostsOrPages } from "@tryghost/content-api";
import { getBadgesServerSide } from "@utils/badges";
import { getNumberOfPostsV2 } from "@utils/ghostutils";
import { getStoriesOnServerSide } from "@utils/stories";
import { getPriorityTestimonialsOnServerSide } from "@utils/testimonials";
import { GetStaticProps } from "next";

interface Props {
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
  stories: Story[];
  posts: PostsOrPages | null;
  badges: Badge[];
}

const WomenLandingPage: React.FC<Props> = ({
  testimonials,
  videoTestimonials,
  stories,
  posts,
  badges,
}) => {
  // console.log("t", testimonials);

  return (
    <DefaultLayout
      title="SocialBoat for Women"
      description="Health Transformation App for women with fitness programs for PCOS weight gain, Post pregnancy mobility and general women wellbeing."
      link="https://socialboat.live/women"
      noIndex={false}
      siteName="SocialBoat"
      canonical="https://socialboat.live/"
      img={womenImg}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {/* <WomenTemplate2
        testimonials={testimonials}
        videoTestimonials={videoTestimonials}
        allStories={stories}
      /> */}
      <WomenTemplateNew
        testimonials={testimonials}
        videoTestimonials={videoTestimonials}
        allStories={stories}
        posts={posts}
        badges={badges}
        origin="women"
      />
    </DefaultLayout>
  );
};

export default WomenLandingPage;

export const getStaticProps: GetStaticProps = async ({}) => {
  const { testimonials, videoTestimonials } =
    await getPriorityTestimonialsOnServerSide();
  const { stories } = await getStoriesOnServerSide();
  const { badges } = await getBadgesServerSide();
  const res = await getNumberOfPostsV2(4);
  return {
    revalidate: true,
    props: {
      testimonials,
      videoTestimonials,
      badges,
      stories,
      posts: res?.posts || null,
    },
  };
};
