/* eslint-disable @next/next/no-img-element */
import { PostOrPage } from "@tryghost/content-api";
import { getSinglePost } from "@utils/ghostutils";
import styles from "@modules/ghost/screen.module.css";
import FooterV3 from "@modules/footer/FooterV3";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import clsx from "clsx";
import DefaultLayout from "@layouts/DefaultLayout";
import { homeImg2 } from "@constants/seo";
import {
  fbIconGray,
  linkdeinIconGray,
  readIconGray,
  shareIconGray,
  whatsapIconGray,
  womenGroupImg,
} from "@constants/icons/iconURLs";
import LandingHeaderV2 from "@templates/LandingPage/V2/components/LandingHeaderV2";
import RelatedPosts from "@modules/NewBlog/RelatedPosts";
import Link from "next/link";
import StickyPoster from "@modules/NewBlog/StickyPoster";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import LeftFeatherIcon from "@templates/LandingPage/V2/components/LeftFeatherIcon";
import { useEffect, useRef, useState } from "react";
import { useRelatedBlogPosts } from "@hooks/ghost/useRelatedBlogPosts";
import PostBlogCard from "@modules/NewBlog/PostBlogCard";
// import AboutAuthor from "@modules/NewBlog/AboutAuthor";
// import SignUp from "@modules/NewBlog/SignUp";
import WhatsAppChat from "@components/WhatsAppChat";
import AboutAuthorWrapper from "@modules/NewBlog/AboutAuthorWrapper";
import { format } from "date-fns";

interface Props {
  post: PostOrPage;
  authors: string[];
  tags: string[];
}

const BlogPost: React.FC<Props> = ({ post, authors, tags }) => {
  const { isFallback } = useRouter();

  const [url, setUrl] = useState("");
  const scollToRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const q = router.query as { noHeader?: string };
  // console.log(q, "router query");

  const currentPostTag = post && post?.tags ? post.tags[0]?.name : "";
  const currentPostId = post ? post.id : "";
  const { relatedPosts } = useRelatedBlogPosts(currentPostTag, currentPostId);
  useEffect(() => {
    const url = window.location.href;
    if (url) {
      // console.log(url.split(":3000"));
      // const val = `${homeDomain}${url.split(":3000")[1]}`;
      // console.log(val);

      setUrl(url);
    }
  }, [url]);
  if (isFallback) {
    return <h1>Fallback</h1>;
  }

  const copyUrl = () => {
    if (url) {
      navigator.clipboard.writeText(url);
      alert("url copied");
    }
  };

  return (
    <DefaultLayout
      title={
        post.meta_title
          ? post.meta_title
          : post.title
          ? post.title
          : "Blog: SocialBoat knowledge center"
      }
      description={
        post.meta_description
          ? post.meta_description
          : "Articles on women health and fitness written by ace certified trainers and nutrition experts"
      }
      link={`https://socialboat.live/blog/post/${post.slug}`}
      canonical={`https://socialboat.live/blog/post/${post.slug}`}
      img={post.feature_image ? post.feature_image : homeImg2}
      siteName="SocialBoat"
      noIndex={false}
      ogType="article"
      publishedTime={post.published_at ? post.published_at : ""}
      modifiedTime={post.updated_at ? post.updated_at : ""}
      authors={authors}
      tags={tags}

      // rectImg={rectWomenImg}
      // width={360}
      // height={360}
    >
      <div className="w-screen relative bg-[#00000003]">
        <div className="w-full pt-20  bg-[#100F1A] ">
          <img
            src={post.feature_image ? post.feature_image : ""}
            alt={post.feature_image_alt ? post.feature_image_alt : ""}
            className="w-full object-contain max-w-screen-xl mx-auto md:object-cover max-h-[50vh]"
          />
        </div>
        <div className="w-full max-w-screen-xl mx-auto  post-detail">
          {q.noHeader === "true" ? null : (
            <LandingHeaderV2
              route="/start?origin=blog"
              btnText="Book FREE Consultation"
            />
          )}
          {/* <Head>
            <title>{post.title}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head> */}

          <div className="flex flex-col pt-10 w-full h-full px-4 lg:gap-7 lg:flex-row">
            <main
              className={clsx(
                styles["article-header"],
                "w-full lg:w-2/3 p-2 lg:border-r-2"
              )}
            >
              <div className="w-full  py-2">
                <h1
                  className={
                    "text-2xl md:text-3xl  lg:text-4xl font-popR font-medium"
                  }
                >
                  {post.title}
                </h1>
                {post.published_at ? (
                  <p className="text-black/50 text-xs sm:text-sm pt-1 sm:pt-0 font-popM">
                    Published:{" "}
                    {format(new Date(post.published_at), "hh:mma dd MMMM yyyy")}
                  </p>
                ) : null}

                <div className="flex items-center py-2">
                  <div
                    onClick={() =>
                      scollToRef.current &&
                      scollToRef.current.scrollIntoView({
                        block: "start",
                        behavior: "smooth",
                      })
                    }
                    className=" border rounded-full cursor-pointer px-1.5 py-1  border-black w-fit h-full flex gap-2 items-center"
                  >
                    {/* <div className=" w-full    md:pt-0  flex-1 max-w-max px-4 py-2    flex gap-2"> */}
                    <img
                      className=" w-7 h-7 object-cover rounded-full"
                      src={
                        post.primary_author?.profile_image
                          ? post.primary_author?.profile_image
                          : ""
                      }
                      alt="Avatar of Author"
                    />

                    <p className="flex-1 font-popR text-base text-[#00000080]  lg:text-xl ">
                      {post.primary_author?.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-end flex-1 self-start py-2 pr-5">
                    {/* <img
                      src={readIconGray}
                      alt={
                        post?.feature_image_alt ||
                        "blog post reading time image"
                      }
                      className="w-4  aspect-[16/11] "
                    />
                    <p className="text-xs  font-popR pl-1.5 text-[#00000080]">
                      {post.reading_time} mins Read
                    </p> */}
                    <div className="flex justify-around items-center">
                      <div onClick={copyUrl}>
                        <img
                          src={shareIconGray}
                          alt={"fb share url"}
                          className="w-[34px] h-6 object-contain   cursor-pointer"
                        />
                      </div>
                      <FacebookShareButton url={url}>
                        <img
                          src={fbIconGray}
                          alt={"fb share url"}
                          className="w-[34px] h-6 object-contain   cursor-pointer"
                        />
                      </FacebookShareButton>
                      <LinkedinShareButton url={url}>
                        <img
                          src={linkdeinIconGray}
                          alt={"linkedein share url"}
                          className="w-[34px] h-6 object-contain   cursor-pointer"
                        />
                      </LinkedinShareButton>
                      <WhatsappShareButton url={url}>
                        <img
                          src={whatsapIconGray}
                          alt={"whatsapp share url"}
                          className="w-[34px] h-6 object-contain   cursor-pointer"
                        />
                        {/* <WhatsappIcon round={true} widths={14} size={34} /> */}
                      </WhatsappShareButton>
                    </div>
                  </div>
                </div>
              </div>

              {post.html ? (
                <div
                  className={clsx(styles["gh-content"], "px-2")}
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              ) : null}
              <div className=" w-full pt-10 ">
                <p
                  ref={scollToRef}
                  className="text-black px-4  text-lg md:text-xl lg:text-2xl font-popR"
                >
                  About the Author
                </p>

                {/* {About Author} */}
                <AboutAuthorWrapper primary_author={post.primary_author} />
                <div className="my-20 h-px w-full bg-[#00000059]" />

                {/* <SignUp
                  heading="Sign up for The Source"
                  text="The Source tackles taboo topics, exposes unseen truths, and gets the scoop on the latest in the tech and design sphere."
                  btnText="Subscribe to us"
                /> */}
                <div className="w-full  pt-10 md:px-4  lg:flex md:max-w-2xl lg:max-w-5xl   flex-col">
                  {relatedPosts?.map((relPost, index) => {
                    if (relPost.id !== post.id)
                      return (
                        <Link
                          passHref
                          href={`/blog/post/${relPost.slug}`}
                          key={`${post.id}_${index}`}
                        >
                          <PostBlogCard
                            post={relPost}
                            postCount={relatedPosts.length}
                            key={`${relPost.id}_${index}`}
                            authorNameColorTw="text-gray-500"
                            titleColorTw="text-black"
                            excerptColorTw="#000000CC"
                            readColorTw="#00000080"
                            mainStyleTw="border-2 border-[#00000024] rounded-2xl "
                            readIconUrl={readIconGray}
                          />
                        </Link>
                      );
                  })}
                </div>
              </div>
            </main>
            {q.noHeader === "true" ? null : (
              <aside className="w-full  lg:w-1/3  pb-10  relative z-0">
                {post?.tags && post.tags?.length ? (
                  <>
                    <RelatedPosts
                      relatedPosts={relatedPosts}
                      baseId={post.id}
                    />
                    <p className=" font-popR text-xl md:text-2xl lg:text-3xl py-4">
                      Related Tags
                    </p>
                    <div className="flex  flex-wrap">
                      {post.tags?.map((item, index) => (
                        <Link
                          href={`/blog?tags=${item.slug}`}
                          className="m-w-max mr-2 my-2 bg-[#0000000D]  rounded-full"
                          key={`${item.id}_${index}`}
                        >
                          <p className="px-5 py-2 font-popR text-center text-base text-[#000000CC]">
                            {item.name}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : null}

                <StickyPoster />
              </aside>
            )}
          </div>
        </div>
        {q.noHeader === "true" ? null : (
          <>
            <div className="bg-[#343074] border-t border-white/30">
              <FooterV3 footerImg={womenGroupImg} />
            </div>
            <WhatsAppChat
              redirectLink="https://api.whatsapp.com/send?phone=919958730020&text=Hi! I have a question"
              position="right-5 bottom-20"
              popupMsg={`Want a custom workout & nutrition plan?`}
            />
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  // const res = await getPosts();

  // const paths = res?.posts?.map((post: PostOrPage) => ({
  //   params: { slug: post.slug },
  // }));

  return {
    paths: [
      {
        params: {
          slug: "5-magical-nutrition-tips-for-a-clearer-skin",
        },
      },
    ],
    // fallback: true,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // export async function getStaticProps(context: any) {
  //   console.log(context.params.slug, "slug found");

  const slug = context.params ? context.params.slug : "";
  // const q = context.
  if (typeof slug === "string") {
    const post = await getSinglePost(slug);

    if (post) {
      let authorList: string[] = [];
      if (post.authors) {
        authorList = post.authors.map((item) =>
          item.url ? item.url?.replace("blog.", "") : ""
        );
      }

      let tagList: string[] = [];
      if (post.tags) {
        tagList = post.tags.map((item) => (item.name ? item.name : ""));
      }
      return {
        props: { post, authors: authorList, tags: tagList },
      };
    }
  }

  return {
    notFound: true,
    authors: [],
    tags: [],
  };
};
export interface InsideWingText {
  text?: string;
}
export const InsideWingText: React.FC<InsideWingText> = ({ text }) => {
  return (
    <div className="flex max-w-[147px]  sm:w-fit justify-evenly items-center flex-1">
      <div className="w-[15%]  object-contain ">
        <LeftFeatherIcon color="#585858" />
      </div>
      <div className="w-full ">
        <p className="text-[10px]  md:text-xs  font-baiSb text-center  text-[#585858]">
          {text}
        </p>
      </div>
      <div className="w-[15%] object-contain -scale-x-100 ">
        <LeftFeatherIcon color="#585858" />
      </div>
    </div>
  );
};
