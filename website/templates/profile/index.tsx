import SocialMediaHeader, {
  socialMediaIcon,
} from "@templates/profile/SocialMediaHeader";
import ReminderSection from "@templates/profile/remindersSection/index";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import Section1 from "./section1/index";
import Section2 from "./section2/index";
import SectionCrowd from "./sector-crowd/index";
import ReviewSection from "./reviewSection/ReviewSection";
import CommunitiesSection from "./communitySection/CommunitySection";
import AddSection from "./addSection/AddSection";
import ColorPannel from "templates/profile/ProfileHeader/ColorPannel";
import { colors } from "@templates/profile/ProfileHeader/constants";
import { Course } from "./section2/constants";
import { fundingCampaign } from "./sector-crowd/constants";
import { community } from "./communitySection/constants";
import { review } from "./reviewSection/constants";

export interface ProfileProps {
  editMobile?: boolean;
  profileImg: string;
  profileName: string;
  socialMediaIcons: socialMediaIcon[];
  liveURL: string;
  photoURL: string;
  courseName: string;
  courseLive: boolean;
  courses: Course[];
  campaign: fundingCampaign;
  communities: community[];
  totalRating: number;
  ratingSplit: number[];
  numRatings: number;
  reviews: review[];
  selectedColorNumber: number;
  website: string;
}
const ProfileTemplate: React.FC<ProfileProps> = ({
  editMobile,
  profileImg,
  profileName,
  socialMediaIcons,
  liveURL,
  photoURL,
  courseName,
  courseLive,
  courses,
  campaign,
  communities,
  reviews,
  numRatings,
  totalRating,
  ratingSplit,
  selectedColorNumber,
  website,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] =
    useState<number>(selectedColorNumber);

  useEffect(() => {
    if (editMobile) {
      const timer = setInterval(() => {
        setSelectedColorIndex((prev) => (prev + 1) % colors.length);
      }, 4000);

      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  // console.log("reviews", reviews);
  useEffect(() => {
    setSelectedColorIndex(selectedColorNumber);
  }, [selectedColorNumber]);

  return (
    <div className="relative">
      <div
        className={clsx(
          `bg-gradient-to-b ${colors[selectedColorIndex]} to-white `,
          "pb-4",
          "shadow-2xl",
          "rounded-t-xl"
        )}
      >
        <ProfileHeader
          website={website}
          edit={editMobile}
          profileImg={profileImg}
          profileName={profileName}
        />
        <SocialMediaHeader socialIcons={socialMediaIcons} />
      </div>
      <div className={clsx("pl-4 pr-4 pt-4")}>
        <ReminderSection edit={editMobile} />
      </div>

      {editMobile ? (
        <div className={clsx("pt-4 pl-4 pr-4")}>
          <AddSection />
        </div>
      ) : null}

      <div className={clsx("pt-4 pl-4 pr-4")}>
        <Section1
          edit={editMobile}
          liveURL={liveURL}
          photoURL={photoURL}
          courseLive={courseLive}
          courseName={courseName}
        />
      </div>

      {!editMobile ? (
        <div className={clsx("pt-6 pl-4 pr-4 mx-auto max-w-screen-2xl")}>
          <Section2 courses={courses} />
        </div>
      ) : null}

      {!editMobile ? (
        <div className={clsx("pt-6 pl-4 pr-4 mx-auto max-w-screen-2xl")}>
          <SectionCrowd campaign={campaign} />
        </div>
      ) : null}

      {!editMobile ? (
        <div className={clsx("pt-6 pl-4 pr-4 mx-auto max-w-screen-2xl")}>
          <CommunitiesSection communities={communities} />
        </div>
      ) : null}

      {!editMobile && reviews ? (
        <div className={clsx("pt-6 pl-4 pr-4 mx-auto max-w-screen-2xl pb-20")}>
          <ReviewSection
            totalRating={totalRating}
            ratingSplit={ratingSplit}
            numRatings={numRatings}
            reviews={reviews}
          />
        </div>
      ) : null}

      {editMobile ? (
        <div className="absolute top-2 left-2 right-2">
          <ColorPannel
            onClick={setSelectedColorIndex}
            selectedColor={colors[selectedColorIndex]}
          />
        </div>
      ) : null}

      {/* <div className={clsx("h-48 bg-white")} /> */}
    </div>
  );
};

export default ProfileTemplate;
