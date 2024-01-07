import { rectWomenImg, womenImg } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import { Badge } from "@models/Prizes/PrizeV2";
import WomenTemplateNewV2 from "@templates/WomenTemplate/WomenTemplateNewV2";
import { PostsOrPages } from "@tryghost/content-api";
import { getBadgesServerSide } from "@utils/badges";
import { getNumberOfPostsV2 } from "@utils/ghostutils";
import { GetStaticProps } from "next";

interface Props {
  posts: PostsOrPages | null;
  badges: Badge[];
}

const MainLandingPage: React.FC<Props> = ({ posts, badges }) => {
  return (
    <DefaultLayout
      title="SocialBoat: Treat PCOD with diet, exercise & medicine"
      description="#1 Menstrual wellness app for PCOS. We provide online treatment for PCOS, Thyroid with medicine, diet & exercise. All Programs are expert led and curated by AI"
      link="https://socialboat.live/"
      noIndex={false}
      siteName="SocialBoat"
      canonical="https://socialboat.live/"
      img={womenImg}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      <WomenTemplateNewV2 posts={posts} badges={badges} origin="main" />
    </DefaultLayout>
  );
};

export default MainLandingPage;

export const getStaticProps: GetStaticProps = async ({}) => {
  const res = await getNumberOfPostsV2(4);
  const { badges } = await getBadgesServerSide();

  return {
    revalidate: true,
    props: {
      badges,
      posts: res?.posts || null,
    },
  };
};
