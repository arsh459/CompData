// import Header from "../components/header";
// import Banner from "../modules/Banner/index";
// import CentralImageExplainer from "@modules/CentralImageExplainer/index";
import clsx from "clsx";
import LaunchCourse from "@modules/Banner/LaunchCourse/LaunchCourse"; // LaunchCourseProps,
// import Mosaic from "@modules/Mosaic/Mosaic";
// import FooterV2 from "@modules/footer/Footer";
import DefaultLayout from "@layouts/DefaultLayout";
import { homeSEO } from "@constants/seo";
import {
  // beautyProfileData,
  // cookingProfileData,
  // homeLaunchBanner,
  homeYogaProfileData,
} from "@constants/landing/home";
import { useEffect, useState } from "react";
import { returnSelectedData } from "@constants/landing/selectData";
import { ProfileProps } from "@templates/profile";
import { joinGroupEvent } from "@analytics/click/ctaClicks";
// import VideoProviders from "@modules/illustrations/VideoProviders";
// import BannerIllustration from "@modules/Banner/Illustration/BannerIllustration";
// import MobileInteractive from "@modules/Banner/MobileInteractive/MobileInteractive";
import MosaicIllustration from "@modules/Banner/Illustration/MosaicIllustration";

interface Props {}
const Home: React.FC<Props> = ({}) => {
  // return <div className={clsx("bg-green-300 w-screen h-screen")}></div>;
  const [selectedNumber] = useState<number>(0);
  const [_, setSelectedData] = useState<ProfileProps>(homeYogaProfileData);

  useEffect(() => {
    setSelectedData(returnSelectedData(selectedNumber));
  }, [selectedNumber]);

  // console.log("selected", selectedNumber);

  return <div></div>;

  return (
    <DefaultLayout
      title={homeSEO.title}
      canonical={homeSEO.link}
      link={homeSEO.link}
      img={homeSEO.img}
      noIndex={homeSEO.noIndex}
      description={homeSEO.description}
    >
      <div>
        <div
          className={clsx(
            "w-screen h-screen shadow-inner ",
            // "border-2 border-black",
            // "bg-green-500",
            "bg-gradient-to-b from-gray-50 to-white",
            // "bg-green-500",
            "flex items-center justify-center"
            // "flex justify-between items-center p-8"
          )}
        >
          {/* <CentralImageExplainer>
            <LaunchCourse
              textPrefix="Collect instant, "
              textPrimary="easy payments"
              textCenter={true}
              textFlow="flow"
              textSuffix=""
              textWeight="medium"
              textSize="medium"
              //   buttonText={homeLaunchBanner.buttonText}
              //   buttonLink={homeLaunchBanner.buttonLink}
              //   buttonLabel={homeLaunchBanner.buttonLabel}
              buttonClick={() => joinGroupEvent("payments")}
              kpis={
                [
                  // "Charge for subscription,",
                  // "Pay per view,",
                  // "or raise sponsorship from your followers",
                ]
              }
            />
          </CentralImageExplainer> */}
          {/* <MosaicIllustration
            direction="textLeft"
            screensLeft={[
              {
                name: "dashboard",
                heading: "Actionable insights",
                size: "small",
              },
            ]}
            screensRight={[
              {
                name: "inbox",
                heading: "Reply to Insta, fb & Whatsapp",
                size: "tiny",
              },
            ]}
          >
            <LaunchCourse
              textPrefix="Get a 360° view of"
              textPrimary="your community"
              textFlow="flow"
              textCenter={true}
              textSuffix=""
              textWeight="medium"
              //   buttonText={homeLaunchBanner.buttonText}
              //   buttonLink={homeLaunchBanner.buttonLink}
              //   buttonLabel={homeLaunchBanner.buttonLabel}
              buttonClick={() => joinGroupEvent("community")}
              textSize="medium"
              kpis={
                [
                  // "Get actionable insights,",
                  // "Reply to WhatsApp messages,",
                  // "Private & secure group chat",
                ]
              }
            />
          </MosaicIllustration> */}

          {/* <div className="fixed left-0 right-0 top-0 z-50 bg-white">
            <Header menuVisible={true} />
          </div> */}

          {/* <div className="flex justify-between items-center p-5" id="home"> */}
          {/* <Banner profileProps={selectedData}> */}
          {/* <BannerIllustration
            dynamicText={false}
            strings={homeLaunchBanner.strings}
            preStringTyped={setSelectedValue}
            textPrefix={"Launch your"}
            textPrimary="Fitness class"
            textFlow={homeLaunchBanner.textFlow}
            textCenter={homeLaunchBanner.textCenter}
            textSuffix="in 5 minutes"
            // buttonText={homeLaunchBanner.buttonText}
            // buttonLink={homeLaunchBanner.buttonLink}
            // buttonLabel={homeLaunchBanner.buttonLabel}
            textWeight={homeLaunchBanner.textWeight}
            textSize={homeLaunchBanner.textSize}
            kpis={[
              "Earn upto ₹50,000",
              "by teaching your talent",
              "to your followers",
            ]}
            buttonClick={() => joinGroupEvent("launch_course")}
          />
          <div className="flex items-center">
            <MobileInteractive
              screen="home"
              size="screen"
              profileProps={homeYogaProfileData}
            />
          </div> */}
          {/* </Banner> */}
          {/* </div> */}

          <MosaicIllustration
            direction="textRight"
            screensLeft={[
              {
                name: "listing",
                heading: "Personal listing page",
                size: "small",
              },
            ]}
            screensRight={[
              {
                name: "whatsapp",
                heading: "WhatsApp reminders",
                size: "tiny",
              },
              //   {
              //     name: "reviews",
              //     heading: "Collect user reviews",
              //     size: "tiny",
              //   },
            ]}
          >
            <LaunchCourse
              textPrefix="Your personal"
              textPrimary="website"
              textFlow="flow"
              textCenter={true}
              textSuffix="with your domain"
              textWeight="medium"
              //   buttonText={homeLaunchBanner.buttonText}
              //   buttonLink={homeLaunchBanner.buttonLink}
              //   buttonLabel={homeLaunchBanner.buttonLabel}
              textSize="medium"
              buttonClick={() => joinGroupEvent("listing_page")}
              kpis={
                [
                  // "Stylish listing page",
                  // "Whatsapp & Email reminders",
                  // "Collect testimonials",
                ]
              }
            />
          </MosaicIllustration>

          {/* <div className="pt-36" id="live">
            <Mosaic
              direction="textRight"
              elementRight={<VideoProviders />}
              screensLeft={[
                {
                  name: "live",
                  heading: "Live video for Q&A",
                  size: "small",
                },
              ]}
              screensRight={[
                {
                  name: "stream",
                  heading: "Stream to social media",
                  size: "tiny",
                },
              ]}
            >
              <LaunchCourse
                textPrefix="Live video tailored for"
                textPrimary="creators"
                textFlow="flow"
                textCenter={true}
                textSuffix=""
                textWeight="medium"
                buttonText={homeLaunchBanner.buttonText}
                buttonLink={homeLaunchBanner.buttonLink}
                buttonLabel={homeLaunchBanner.buttonLabel}
                textSize="medium"
                buttonClick={() => joinGroupEvent("live_video")}
                kpis={[
                  "Do a live Q&A,",
                  "Convert live video to on-demand,",
                  "And stream teasers to social media",
                ]}
              />
            </Mosaic>
          </div>

          <div className="pt-24" id="insights">
            
          </div>

          <div className="pt-36" id="paid">
            <CentralImageExplainer>
              <LaunchCourse
                textPrefix="Get paid for"
                textPrimary="your skills"
                textCenter={true}
                textFlow="flow"
                textSuffix=""
                textWeight="medium"
                textSize="medium"
                buttonText={homeLaunchBanner.buttonText}
                buttonLink={homeLaunchBanner.buttonLink}
                buttonLabel={homeLaunchBanner.buttonLabel}
                buttonClick={() => joinGroupEvent("payments")}
                kpis={[
                  "Charge for subscription,",
                  "Pay per view,",
                  "or raise sponsorship from your followers",
                ]}
              />
            </CentralImageExplainer>
          </div>

          <div className="pt-0" id="website">
            <Banner profileProps={{ ...homeYogaProfileData, editMobile: true }}>
              <LaunchCourse
                textPrefix="A website that"
                textPrimary="keeps up"
                textCenter={false}
                textFlow="fixed"
                textSuffix="with your content"
                textWeight="medium"
                buttonText={homeLaunchBanner.buttonText}
                buttonLink={homeLaunchBanner.buttonLink}
                buttonLabel={homeLaunchBanner.buttonLabel}
                buttonClick={() => joinGroupEvent("website")}
                textSize="medium"
                kpis={[
                  "Use the drag & drop",
                  "tool to design & update",
                  "your custom website & class",
                ]}
              />
            </Banner>
          </div> */}
        </div>
        {/* <div className="pt-8 bg-gradient-to-b from-white to-gray-100 shadow-lg">
          <FooterV2 />
        </div> */}
      </div>
    </DefaultLayout>
  );
};

export default Home;
