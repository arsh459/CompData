import Header from "@components/header/index";
import Banner from "@modules/Banner/index";
// import Banner from "../modules/Banner/index";
import CentralImageExplainer from "@modules/CentralImageExplainer/index";
import clsx from "clsx";
import LaunchCourse from "@modules/Banner/LaunchCourse/LaunchCourse"; // LaunchCourseProps,
import Mosaic from "@modules/Mosaic/Mosaic";
import FooterV2 from "@modules/footer/Footer";
import DefaultLayout from "@layouts/DefaultLayout";
import { homeSEO } from "@constants/seo";
import { homeLaunchBanner, homeYogaProfileData } from "@constants/landing/home";
import { useState } from "react";
// import { returnSelectedData } from "@constants/landing/selectData";
// import { ProfileProps } from "@templates/profile";
import { joinGroupEvent } from "@analytics/click/ctaClicks";
import VideoProviders from "@modules/illustrations/VideoProviders";
// import { useAuth } from "@hooks/auth/useAuth";

interface Props {}
const HomeTemplate: React.FC<Props> = ({}) => {
  // console.log("host", host);
  // return <div className={clsx("bg-green-300 w-screen h-screen")}></div>;
  const [_, setSelectedValue] = useState<number>(0);
  // const { uid } = useAuth();
  // const [selectedData, setSelectedData] =
  //   useState<ProfileProps>(homeYogaProfileData);

  // useEffect(() => {
  //   setSelectedData(returnSelectedData(selectedNumber));
  // }, [selectedNumber]);

  // console.log("selected", selectedNumber);

  return (
    <DefaultLayout
      title={homeSEO.title}
      link={homeSEO.link}
      img={homeSEO.img}
      canonical={homeSEO.link}
      noIndex={homeSEO.noIndex}
      description={homeSEO.description}
    >
      <div>
        <div className={clsx("w-screen", "max-w-screen-xl mx-auto")}>
          <div className="fixed left-0 right-0 top-0 z-50 bg-white">
            <Header menuVisible={true} noShadow={true} />
          </div>

          <div className="pt-36" id="courses">
            <Mosaic
              direction="textLeft"
              screensLeft={[
                {
                  name: "listing-template",
                  heading: "Build your website",
                  size: "small",
                },
              ]}
              screensRight={[
                {
                  name: "whatsapp",
                  heading: "Automate communication",
                  size: "tiny",
                },
                {
                  name: "live",
                  heading: "Host live sessions",
                  size: "tiny",
                },
              ]}
            >
              <LaunchCourse
                textPrefix="Launch"
                textPrimary="cohort based"
                textFlow="flow"
                textCenter={true}
                textSuffix="coaching"
                textWeight="black"
                buttonText={homeLaunchBanner.buttonText}
                buttonLink={homeLaunchBanner.buttonLink}
                buttonLabel={homeLaunchBanner.buttonLabel}
                textSize="large"
                buttonClick={() => joinGroupEvent("listing_page")}
                kpis={["Goal oriented coaching", "that generates results", ""]}
              />
            </Mosaic>
          </div>

          <div className="pt-24" id="insights">
            <Mosaic
              direction="textRight"
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
                textPrefix="360° view of"
                textPrimary="of your"
                textFlow="flow"
                textCenter={true}
                textSuffix="community"
                textWeight="medium"
                buttonText={homeLaunchBanner.buttonText}
                buttonLink={homeLaunchBanner.buttonLink}
                buttonLabel={homeLaunchBanner.buttonLabel}
                buttonClick={() => joinGroupEvent("community")}
                textSize="medium"
                kpis={[
                  "Get actionable insights,",
                  "Reply to WhatsApp messages,",
                  "Private & secure group chat",
                ]}
              />
            </Mosaic>
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
                  "Charge subscription,",
                  "Pay per view,",
                  "or free invites to select",
                ]}
              />
            </CentralImageExplainer>
          </div>

          <div className="pt-36" id="live">
            <Mosaic
              direction="textLeft"
              elementRight={<VideoProviders />}
              screensLeft={[
                {
                  name: "live",
                  heading: "Delightful live events",
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
                  "Host intimate events",
                  "Stream teasers to social media",
                  "Or Integrate Zoom/Meet",
                ]}
              />
            </Mosaic>
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
          </div>
        </div>
        <div
          className="pt-12 mt-12 bg-gradient-to-b from-gray-100 to-white"
          id="home"
        >
          {/* <Banner> */}
          <LaunchCourse
            dynamicText={true}
            strings={homeLaunchBanner.strings}
            preStringTyped={setSelectedValue}
            textPrefix={homeLaunchBanner.textPrefix}
            textPrimary={homeLaunchBanner.textPrimary}
            textFlow={homeLaunchBanner.textFlow}
            textCenter={true}
            textSuffix={homeLaunchBanner.textSuffix}
            buttonText={homeLaunchBanner.buttonText}
            buttonLink={homeLaunchBanner.buttonLink}
            buttonLabel={homeLaunchBanner.buttonLabel}
            textWeight={homeLaunchBanner.textWeight}
            textSize={homeLaunchBanner.textSize}
            kpis={homeLaunchBanner.kpis}
            buttonClick={() => joinGroupEvent("launch_course")}
          />
          {/* </Banner> */}
        </div>
        <div className="pt-8 bg-gradient-to-b from-white to-gray-100 shadow-lg">
          <FooterV2 />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomeTemplate;

// export async function getServerSideProps({ req, res }) {
//   res.setHeader(
//     "Cache-Control",
//     "public, s-maxage=1, stale-while-revalidate=59"
//   );

//   return {
//     props: {
//       host: req.headers.host,
//     },
//   };
// }
