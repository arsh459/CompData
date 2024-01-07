import { rectWomenImg, womenImg } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import { Badge } from "@models/Prizes/PrizeV2";
import { Story } from "@models/Stories/interface";
import { Testimonial } from "@models/Testimonial/interface";
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
  badges: Badge[];
  posts: PostsOrPages | null;
}

const MainLandingPage: React.FC<Props> = ({
  testimonials,
  videoTestimonials,
  stories,
  posts,
  badges,
}) => {
  // console.log("t", testimonials);

  return (
    <DefaultLayout
      title="SocialBoat: Treat PCOD with diet and exercise"
      description="SocialBoat provides Personalised diet charts and workout plans for PCOD and PCOS treatment. Get expert consultation to reverse PCOD now"
      link="https://socialboat.live/ig"
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
        origin="ig"
      />
    </DefaultLayout>
  );
};

export default MainLandingPage;

export const getStaticProps: GetStaticProps = async ({}) => {
  const { testimonials, videoTestimonials } =
    await getPriorityTestimonialsOnServerSide();
  const { stories } = await getStoriesOnServerSide();
  const res = await getNumberOfPostsV2(4);
  const { badges } = await getBadgesServerSide();
  return {
    revalidate: true,
    props: {
      testimonials,
      videoTestimonials,
      stories,
      badges,
      posts: res?.posts || null,
    },
  };
};
