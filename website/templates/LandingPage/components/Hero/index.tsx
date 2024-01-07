/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import React from "react";
import { HeroData } from "../../constants";

import TextLayout from "../TextLayout";
import RippleButton from "../RippleButton";
import { isMobile } from "mobile-device-detect";
import { UserInterface } from "@models/User/User";
import { weEventTrack } from "@analytics/webengage/user/userLog";
// import InvitedByBox from "@modules/ReferralV2/InvitedByBox";
interface Props {
  referralHeading?: string;
  invitedBy?: UserInterface;
}
const Hero: React.FC<Props> = ({ referralHeading, invitedBy }) => {
  // console.log(invitedBy, "invitedby");

  const onRipple = () => {
    weEventTrack("landingPage_clickStart", {});
  };

  const { Heading } = HeroData;
  return (
    <>
      <div id="home" className="h-screen bg-red-50">
        <div className="relative z-0 overflow-hidden bg-black">
          <div className="">
            <video
              className={clsx("object-cover w-full h-screen")}
              autoPlay={true}
              playsInline
              preload="auto"
              loop
              muted={true}
              controls={false}
              // src="https://s3.ap-south-1.amazonaws.com/www.socialboat.live/videolg.mp4"
              // src="https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/v1648890904/videolg_lpqxxq.mp4"
              // src="https://s3.ap-south-1.amazonaws.com/www.socialboat.live/videolg.mp4"
              // src="https://d2cjy81ufi4f1m.cloudfront.net/videolg.mp4"
              src={
                isMobile
                  ? "https://d2cjy81ufi4f1m.cloudfront.net/videoo.MP4"
                  : "https://d2cjy81ufi4f1m.cloudfront.net/videolg.mp4"
              }
              // src="https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/videoo.MP4?alt=media&token=1cd81209-7770-43c8-9913-616b8254efbe"
              // src="https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/social%20boat%20landing%20page%20video.mp4?alt=media&token=63de6160-08ff-433a-a934-790b97b2e5ff"
              // src="/images/homeBanner.png"
              poster={`https://ik.imagekit.io/socialboat/pexels-zakaria-boumliha-2827400_1_6w7U2-XSo.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655234361614`}
            />
          </div>

          <div
            className="absolute left-0 right-0 top-0 bottom-0 z-10 w-full h-full"
            //className="top-52 md:top-48 lg:top-56 absolute w-full bottom-0 inset-x-0"
          >
            <div className="flex justify-center items-center flex-col h-full  px-4">
              {/* <div className="px-4"> */}
              <div className="sm:w-3/4 2xl:w-1/2">
                <TextLayout
                  headingText={
                    invitedBy?.name ? "An invitation to SocialBoat by" : Heading
                  }
                  textPrimary={invitedBy?.name}
                  size="large"
                  halfWidth={true}
                />
              </div>
              {/* </div> */}
              <div onClick={onRipple} className="pt-20">
                <RippleButton
                  content="Start Game"
                  size="large"
                  link={
                    invitedBy?.sbInviteURL
                      ? invitedBy.sbInviteURL
                      : "/start?origin=landing"
                  }
                  // link={`https://socialboat.page.link/FhSa`}
                />
              </div>

              <div className="">
                <a
                  href="https://www.producthunt.com/posts/socialboat-for-women?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-socialboat&#0045;for&#0045;women"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=367053&theme=dark&period=daily"
                    alt="SocialBoat&#0032;for&#0032;Women - AI&#0032;Powered&#0032;fitness&#0032;game&#0032;for&#0032;women | Product Hunt"
                    width="260"
                    height="54"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
