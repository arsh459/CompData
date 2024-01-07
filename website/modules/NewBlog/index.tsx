import WhatsAppChat from "@components/WhatsAppChat";
import {
  blogBgImg,
  // searchIconWhite,
  womenGroupImg,
} from "@constants/icons/iconURLs";
import { rectWomenImg, seoData } from "@constants/seoData";
import { useAuth } from "@hooks/auth/useAuth";
import { useGhostPosts } from "@hooks/ghost/useGhostPosts";
import DefaultLayout from "@layouts/DefaultLayout";
import FooterV3 from "@modules/footer/FooterV3";
// import LandingHeaderV2 from "@templates/LandingPage/V2/components/LandingHeaderV2";
import { Background } from "@templates/WomenTemplate/components/Background";

// import { useState } from "react";
// import BlogHero from "./BlogHero";
// import GlassedTags from "./GlassedTags";
import Tags from "./Tags";

import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import LandingHeaderV2 from "@templates/WomenTemplate/components/V3/LandingHeaderV2";
import { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import ReelItem from "./ReelItem";
import { useRouter } from "next/router";
import clsx from "clsx";
export type viewTypes = "blogs" | "reels";

interface Props {}

const NewBlog: React.FC<Props> = ({}) => {
  const {
    posts,
    filters,
    pagination,
    // onPageChange,
    // onSearchStrChange,
    onSearchTagsChange,
    searchTags,
  } = useGhostPosts();

  // let filterTimeout: ;
  // console.log("pa", pagination?.page);
  // const [filterTimeout, setFilterTimeout] = useState<NodeJS.Timeout>();

  // const onChange = (text: string) => {
  //   if (filterTimeout) clearTimeout(filterTimeout);

  //   const filterTimeoutSt = setTimeout(() => {
  //     onSearchStrChange(text);
  //   }, 1000);

  //   // save in state
  //   setFilterTimeout(filterTimeoutSt);
  // };

  const { authStatus } = useAuth();

  const { coachRef } = useCoachAtt();
  const router = useRouter();
  const initialView = router.query.view || "blogs";
  const [selectView, setSelectView] = useState(initialView);

  useEffect(() => {
    if (!router.query.view || router.query.view !== selectView) {
      router.push({
        pathname: router.pathname,
        query: { view: selectView },
      });
    }
  }, [selectView, router]);

  const toggleView = (view: viewTypes) => {
    setSelectView(view);
  };
  return (
    <DefaultLayout
      title={seoData.blogPage.title}
      description={seoData.blogPage.description}
      img={seoData.blogPage.img}
      link={seoData.blogPage.link}
      canonical={seoData.blogPage.link}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      <div className="w-screen h-screen relative ">
        <Background imgUrl={blogBgImg} />
        <LandingHeaderV2
          route={`/start?origin=blog${coachRef ? `&${coachRef}` : ""}`}
          btnText="Start Journey"
          coachRef={coachRef}
          activeLink="link_2"
        />
        {/* {authStatus === "SUCCESS" ? (
        <Banner
          btnText="Talk to an expert"
          heading="Reverse PCOS/PCOD. Book free consultation"
        />
      ) : (
        <div className="w-full h-1/2 lg:h-3/5 relative z-0 overflow-hidden ">
          <BlogHero />
          <GlassedTags
            tags={filters.tags}
            onSearchTagsChange={onSearchTagsChange}
            onSearchStrChange={onSearchStrChange}
            selectedTags={searchTags}
          />
        </div>
      )} */}
        <div
          className={clsx(
            "text-white flex gap-4     max-w-6xl mx-auto",
            selectView === "blogs" ? "pt-40" : "pt-28"
          )}
        >
          <div
            className="cursor-pointer flex-1 sm:flex-none"
            onClick={() => toggleView("blogs")}
          >
            <p className="px-4 pb-3 text-center">Explore other articles</p>
            {selectView === "blogs" && (
              <p className="border-b-4 mx-4 border-white" />
            )}
          </div>
          <div
            className="cursor-pointer flex-1 sm:flex-none"
            onClick={() => toggleView("reels")}
          >
            <p className="px-4 pb-3 text-center">Explore Reels</p>
            {selectView === "reels" && (
              <p className="border-b-4 mx-4 border-white" />
            )}
          </div>
        </div>
        {authStatus && (
          <div className="fixed top-14 lg:top-20   left-0 right-0  z-50 flex justify-center items-center bg-black/10 backdrop-blur-2xl">
            <div className="w-full max-w-screen-xl mx-auto flex flex-row gap-2 items-center justify-between px-4 sm:px-10 py-3">
              {/* <div className="flex  py-1.5 w-fit max-w-4xl bg-[#FFFFFF24] rounded-3xl pl-4">
              <img
                src={searchIconWhite}
                alt="blog search icon"
                className="w-4 lg:w-5 aspect-h-4 lg:aspect-h-4   rounded-l-3xl object-contain "
              />
              <input
                type="text"
                className="w-full bg-transparent placeholder-white/70 focus:outline-none  pl-2 rounded-r-3xl"
                placeholder="Search"
                onChange={(e) => onChange(e.target.value)}
                style={{ color: "#fff" }}
              />
            </div> */}
              {selectView === "blogs" ? (
                <>
                  <div className="flex w-fit max-w-4xl">
                    <p className="font-popR font-medium  text-xs px-6 py-2 whitespace-nowrap text-white">
                      Filter your Search
                    </p>
                  </div>
                  <div className="flex w-full overflow-x-scroll  scrollbar-hide">
                    {filters.tags
                      ? Object.keys(filters.tags).map((tag, index) => (
                          <div
                            onClick={() => onSearchTagsChange(tag)}
                            key={`${tag}_${index}`}
                            className="mr-2"
                          >
                            <Tags
                              tag={filters.tags[tag]}
                              isSelected={searchTags.includes(tag)}
                            />
                          </div>
                        ))
                      : null}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        )}
        {selectView === "reels" ? (
          <ReelItem />
        ) : (
          <BlogItem pagination={pagination} posts={posts} />
        )}
        <div className="bg-[#FFFFFF1A] border-t border-white/30">
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

export default NewBlog;
