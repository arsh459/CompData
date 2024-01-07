import Header from "@components/header/index";
// import Banner from "@modules/Banner/index";
// import Banner from "../modules/Banner/index";
// import CentralImageExplainer from "@modules/CentralImageExplainer/index";
import clsx from "clsx";
import LaunchCourse from "@modules/Banner/LaunchCourse/LaunchCourse"; // LaunchCourseProps,
// import Mosaic from "@modules/Mosaic/Mosaic";
import FooterV2 from "@modules/footer/Footer";
import DefaultLayout from "@layouts/DefaultLayout";
import { homeSEO } from "@constants/seo";
import { homeLaunchBanner } from "@constants/landing/home";
import { useState } from "react";
// import { returnSelectedData } from "@constants/landing/selectData";
// import { ProfileProps } from "@templates/profile";
import { joinGroupEvent } from "@analytics/click/ctaClicks";
import HorizontalCarousel from "./HorizontalCarousel/HorizontalCarousel";
import CreatorHolder from "./HorizontalCarousel/CreatorHolder";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import MediaDesc from "./MediaDesc/MediaDesc";
import Heading from "./Heading/Heading";
import LandingBuilder from "./LandingBuilder/LandingBuilder";
import Mosaic from "@modules/Mosaic/Mosaic";
import VideoProviders from "@modules/illustrations/VideoProviders";
import { EventInterface } from "@models/Event/Event";
import DesktopInteractive from "@modules/Banner/MobileInteractive/DesktopInteractive";
import { getEventProps } from "@templates/listing/utils/getEventProps";
// import VideoProviders from "@modules/illustrations/VideoProviders";
// import { useAuth } from "@hooks/auth/useAuth";

interface Props {
  creators: LeaderBoard[];
  sampleLeader?: LeaderBoard | null;
  allEvents: EventInterface[];
  userKey?: string;
}
const HomeTemplateV2: React.FC<Props> = ({
  creators,
  sampleLeader,
  allEvents,
  userKey,
}) => {
  // console.log("host", host);
  // return <div className={clsx("bg-green-300 w-screen h-screen")}></div>;
  const [_, setSelectedValue] = useState<number>(0);
  // const { uid } = useAuth();
  // const [selectedData, setSelectedData] =
  //   useState<ProfileProps>(homeYogaProfileData);

  // useEffect(() => {
  //   setSelectedData(returnSelectedData(selectedNumber));
  // }, [selectedNumber]);

  // console.log("sampleLeader", sampleLeader);
  // console.log("allEvents", allEvents);

  return (
    <DefaultLayout
      title={homeSEO.title}
      link={homeSEO.link}
      img={homeSEO.img}
      canonical={homeSEO.link}
      noIndex={homeSEO.noIndex}
      description={homeSEO.description}
    >
      <div className="w-screen">
        <div className={clsx("w-full", "max-w-screen-xl mx-auto")}>
          <div className="fixed left-0 right-0 top-0 z-50 bg-white">
            <Header menuVisible={true} noShadow={true} userKey={userKey} />
          </div>
        </div>

        <div className="h-48 iphoneX:h-20 md:h-40 min-h-[100px]" />
        <div
          className="p-2  flex flex-col justify-end bg-gradient-to-b from-white to-gray-100"
          id="home"
        >
          <LaunchCourse
            dynamicText={true}
            strings={homeLaunchBanner.strings}
            preStringTyped={setSelectedValue}
            textPrefix={homeLaunchBanner.textPrefix}
            textPrimary={homeLaunchBanner.textPrimary}
            textFlow={homeLaunchBanner.textFlow}
            textCenter={true}
            phBanner={true}
            textSuffix={homeLaunchBanner.textSuffix}
            buttonText={userKey ? "Start Game" : homeLaunchBanner.buttonText}
            buttonLink={homeLaunchBanner.buttonLink}
            buttonLabel={homeLaunchBanner.buttonLabel}
            textWeight={homeLaunchBanner.textWeight}
            textSize={homeLaunchBanner.textSize}
            kpis={homeLaunchBanner.kpis}
            userKey={userKey}
            buttonClick={() => joinGroupEvent("launch_course")}
          />
        </div>

        <div className="p-4 md:p-8 bg-gradient-to-b from-gray-100 to-gray-50">
          <div className="flex justify-center pt-8 w-full">
            {sampleLeader && allEvents ? (
              <DesktopInteractive
                screen="community-home"
                communityWrapperProps={{
                  leader: sampleLeader,
                  events: allEvents,
                }}
              />
            ) : null}
          </div>
        </div>

        <div
          className={clsx("pt-16 bg-gradient-to-b from-gray-50 to-gray-100")}
        >
          <div className={clsx("max-w-screen-xl mx-auto pl-4 lg:pl-0")}>
            <HorizontalCarousel
              heading="Our boats"
              subtitle="Communities by world class creators"
            >
              <CreatorHolder creators={creators} />
            </HorizontalCarousel>
          </div>
        </div>

        <div className={clsx("pt-20 bg-gradient-to-b from-gray-100 to-white")}>
          <div className={clsx("max-w-screen-xl md:pl-12 md:pr-12 mx-auto")}>
            <Heading
              heading="How does it work?"
              subtitle="Get people to associate with you"
            />
            <div className="pt-16">
              <Mosaic
                direction="textLeft"
                screensLeft={[
                  {
                    name: "listing-program",
                    heading: "Sign users up",
                    size: "medium",
                    ...(allEvents && allEvents.length > 0 && sampleLeader
                      ? {
                          listingProps: getEventProps(
                            allEvents[0],
                            sampleLeader
                          ),
                        }
                      : {}),
                  },
                ]}
                screensRight={[
                  {
                    name: "whatsapp-invite",
                    heading: "Whatsapp DMs",
                    size: "tiny",
                  },
                  {
                    name: "instaprofile",
                    heading: "Link in bio",
                    size: "tiny",
                  },
                ]}
              >
                <LaunchCourse
                  textPrefix="Launch your"
                  textPrimary="fitness challenge"
                  textFlow="flow"
                  textCenter={true}
                  textSuffix="to the world"
                  textWeight="medium"
                  textSize="medium"
                  kpis={["A fun learning experience", "for your followers"]}
                />
              </Mosaic>
            </div>
          </div>
        </div>

        <div className={clsx("pt-20 bg-gradient-to-b from-white to-gray-100")}>
          <div className={clsx("max-w-screen-xl md:pl-12 md:pr-12 mx-auto")}>
            <Mosaic
              direction="textRight"
              elementRight={<VideoProviders />}
              screensLeft={[
                {
                  name: "community",
                  heading: "Recorded videos & workouts",
                  size: "small",
                },
              ]}
              screensRight={[
                {
                  name: "live",
                  heading: "Host live sessions",
                  size: "tiny",
                },
              ]}
            >
              <LaunchCourse
                textPrefix="Create an"
                textPrimary="innovative"
                textFlow="flow"
                textCenter={true}
                textSuffix="program"
                textWeight="medium"
                textSize="medium"
                kpis={[
                  // "Instead of 15 lives/month",
                  "Take 100 sessions/month.",
                  "10 live, 30 recorded &",
                  "rest community activities",
                ]}
              />
            </Mosaic>
          </div>
        </div>

        <div
          className={clsx("pt-20 bg-gradient-to-b from-gray-100 to-gray-100")}
        >
          <div className={clsx("max-w-screen-xl md:pl-12 md:pr-12 mx-auto")}>
            <Mosaic
              direction="textLeft"
              screensLeft={[
                {
                  name: "whatsapp-workout",
                  heading: "Daily tasks on WhatsApp",
                  size: "tiny-medium",
                },
              ]}
              screensRight={[
                {
                  name: "leaderboard",
                  heading: "Leaderboard for motivation",
                  size: "tiny",
                },
              ]}
            >
              <LaunchCourse
                textPrefix="Send daily tasks"
                textPrimary="Motivate your students"
                textFlow="flow"
                textCenter={true}
                textSuffix=""
                textWeight="medium"
                textSize="medium"
                kpis={["Drive engagement", "make them feel valued"]}
              />
            </Mosaic>
          </div>
        </div>

        <div
          className={clsx(
            "pt-24 pb-24 bg-gradient-to-b from-gray-100 to-white"
          )}
        >
          <div className={clsx("max-w-screen-xl md:pl-12 md:pr-12 mx-auto")}>
            <Heading
              heading="Transform lives"
              subtitle="Create a fitter world & grow as a content creator"
            />
          </div>
        </div>

        <div
          className={clsx(
            "pt-36 pb-10 bg-gradient-to-b from-white to-gray-100"
          )}
        >
          <div className={clsx("max-w-screen-xl md:pl-12 md:pr-12 mx-auto")}>
            <Heading
              heading="And there is a lot more"
              subtitle="Think us like your tech & knowledge partner"
            />
          </div>
        </div>

        <div className="bg-gradient-to-b from-gray-100 to-white h-20" />

        <div className="bg-gradient-to-b from-white to-gray-100">
          <LandingBuilder userKey={userKey} />
        </div>

        <div className="pt-8 bg-gradient-to-b from-white to-gray-100 shadow-lg">
          <FooterV2 />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomeTemplateV2;

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
