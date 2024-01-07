import { GetStaticPaths, GetStaticProps } from "next";
import { getPostsByAuthor } from "@utils/ghostutils";
import React from "react";
import { PostOrPage } from "@tryghost/content-api";
import { useRouter } from "next/router";
// import AboutAuthor from "@modules/NewBlog/AboutAuthor";
import Link from "next/link";
import PostBlogCard from "@modules/NewBlog/PostBlogCard";
import { readIconGray, womenGroupImg } from "@constants/icons/iconURLs";
import LandingHeaderV2 from "@templates/LandingPage/V2/components/LandingHeaderV2";
import FooterV3 from "@modules/footer/FooterV3";
import WhatsAppChat from "@components/WhatsAppChat";
import AboutAuthorWrapper from "@modules/NewBlog/AboutAuthorWrapper";
import DefaultLayout from "@layouts/DefaultLayout";
import { homeImg2 } from "@constants/seoData";

interface Props {
  authorSlug: string;
  posts: PostOrPage[];
}
const AuthorPage: React.FC<Props> = ({ posts, authorSlug }) => {
  const { isFallback } = useRouter();
  if (isFallback) {
    return <h1>Fallback</h1>;
  }
  console.log({ authorSlug });
  console.log({ posts });
  const post = posts[0];

  return (
    <DefaultLayout
      title={`SocialBoat Author: ${post.primary_author?.name}'s Blog page on Nutrition, PCOS and Workouts`}
      description={
        post.primary_author?.bio?.slice(0, 140)
          ? post.primary_author?.bio?.slice(0, 140)
          : "A SocialBoat author and expert talking about workouts, PCOD treatment and nutrition"
      }
      link={`https://socialboat.live/authors/${authorSlug}`}
      canonical={`https://socialboat.live/authors/${authorSlug}`}
      img={
        post.primary_author?.profile_image
          ? post.primary_author.profile_image
          : homeImg2
      }
      siteName="SocialBoat"
      noIndex={false}
      ogType="profile"
      firstName={post.primary_author?.name}
      gender="female"
    >
      <div className="w-screen h-screen relative overflow-x-scroll scrollbar-hide z-0">
        <LandingHeaderV2
          route="/start?origin=author"
          btnText="Book Consultation"
        />
        <div className="w-full pt-20 max-w-[958px] mx-auto ">
          {post ? (
            <AboutAuthorWrapper
              h1Tag={true}
              primary_author={post.primary_author}
            />
          ) : null}
          <p className="px-4 py-7 text-2xl leading-loose font-popR">
            Articles by{" "}
            {post.primary_author?.name
              ? post.primary_author.name
              : "Our Author"}
            <br />
          </p>
          <div className="w-full px-4  mx-auto overflow-x-scroll scrollbar-hide gap-8 flex ">
            <>
              {posts?.map((post, index) => {
                return (
                  <Link
                    passHref
                    href={`/blog/post/${post.slug}`}
                    key={`${post.id}_${index}`}
                    className="min-w-[80%]  "
                  >
                    <PostBlogCard
                      post={post}
                      postCount={posts.length}
                      key={`${post.id}_${index}`}
                      authorNameColorTw="text-gray-500"
                      titleColorTw="text-black "
                      excerptColorTw="#000000CC "
                      readColorTw="#00000080"
                      mainStyleTw="border-2 border-[#00000024] rounded-2xl "
                      readIconUrl={readIconGray}
                    />
                  </Link>
                );
              })}
            </>
          </div>
        </div>
        <div className="bg-[#343074] border-t border-white/30">
          <FooterV3 footerImg={womenGroupImg} />
        </div>
        <WhatsAppChat
          redirectLink="https://api.whatsapp.com/send?phone=919958730020&text=Hi! I have a question"
          position="right-5 bottom-20"
        />
      </div>
    </DefaultLayout>
  );
};

export default AuthorPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: "jayti",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const authorSlug = params ? params.slug : "";
  if (authorSlug && typeof authorSlug === "string") {
    // const result = await getAuthorById(authorSlug);
    const remotePosts = await getPostsByAuthor(authorSlug);

    const posts = remotePosts?.posts ? remotePosts.posts : [];

    return {
      props: {
        posts,
        authorSlug: authorSlug,
      },
    };
  }
  return {
    props: {
      posts: [],
      authorSlug: "",
    },
  };
};
