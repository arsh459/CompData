import ProfileTemplate, { ProfileProps } from "@templates/profile";
import { ListingProps } from "@templates/listing";
import WhatsappTemplate, { WhatsappProps } from "@templates/whatsapp";
import clsx from "clsx";
import React from "react";
import ReviewsTemplate from "@templates/reviews";
import DashboardTemplate from "@templates/dashboard";
import InboxTemplate from "@templates/inbox";
import { reviewsData } from "@constants/landing/home";
import LiveTemplate from "@templates/liveVideo";
import {
  currentQuestion,
  heading,
  liveClass,
  // questions,
  commentsInLive,
  liveMakeup,
  personURLs,
  makeupDesc,
  // yogaListingProps,
  // yogaMessage,
  // beautyListingProps,
  // beautyMessage,
  // cookingListingProps,
  // cookingMessage,
  listingPagePropsV1,
  yogaMessage,
  yogaMessage2,
  inviteMessage,
  // beautyListingProps,
  // beautyMessage,
  // cookingListingProps,
  // cookingMessage,
} from "@constants/landing/live";
import Stream from "@templates/stream";
import ListingTemplateV1, {
  listingTemplateV1Props,
} from "@templates/listing/listingTemplateV1";
import ProfileTemplateV1, {
  ProfilePropsV1,
} from "@templates/profile/ProfileTemplateV1";
import MetaCardTemplate, {
  MetaCardProps,
} from "@templates/MetaCardTemplate/MetaCardTemplate";
import LeaderboardWrapper from "@templates/leaderboard/LeaderboardWrapper";
import CommunityWrapper from "@templates/communityWrapper/CommunityWrapper";
import CommunityHomeWrapper, {
  CommunityHomeWrapperProps,
} from "@templates/communityWrapper/CommunityHomeWrapper";
import InstaProfile from "@templates/listing/Insta/Instaprofile";

export interface MobileViewProps {
  // editMobile?: boolean;
  size: "small" | "medium" | "tiny" | "screen" | "responsive" | "tiny-medium";
  screen:
    | "home"
    | "home-template"
    | "listing"
    | "listing-template"
    | "listing-program"
    | "whatsapp"
    | "whatsapp-template"
    | "whatsapp-invite"
    | "whatsapp-workout"
    | "reviews"
    | "dashboard"
    | "leaderboard"
    | "community"
    | "community-home"
    | "instaprofile"
    | "inbox"
    | "live"
    | "none"
    | "live_to_recorded"
    | "meta-card"
    | "stream";
  profileProps?: ProfileProps;
  profilePropsV1?: ProfilePropsV1;
  listingTemplateProps?: listingTemplateV1Props;
  listingProps?: ListingProps;
  whatsappTemplateProps?: WhatsappProps;
  metaCardProps?: MetaCardProps;
  communityWrapperProps?: CommunityHomeWrapperProps;
}

const MobileInteractive: React.FC<MobileViewProps> = ({
  size,
  screen,
  profileProps,
  listingTemplateProps,
  whatsappTemplateProps,
  profilePropsV1,
  metaCardProps,
  communityWrapperProps,
}) => {
  // console.log("communityWrapperProps", communityWrapperProps);
  return (
    <div
      className={clsx(
        size === "responsive"
          ? "h-[480px] w-[320px] sm:h-[640px] sm:w-[320px]"
          : size === "medium"
          ? "h-[640px] w-[320px]"
          : size === "small"
          ? "h-[480px] w-[320px]"
          : size === "screen"
          ? "w-[240px] h-[480px]"
          : size === "tiny-medium"
          ? "h-[380px] w-[320px]"
          : "h-[300px] w-[320px]",

        "rounded-xl shadow-2xl ring-gray-100 overflow-y-auto",
        "overscroll-auto",
        "no-scrollbar",
        "z-0"
      )}
    >
      {screen === "home" && profileProps ? (
        <ProfileTemplate {...profileProps} />
      ) : screen === "home-template" && profilePropsV1 ? (
        <ProfileTemplateV1 {...profilePropsV1} />
      ) : screen === "listing-template" && !listingTemplateProps ? (
        <ListingTemplateV1 {...listingPagePropsV1} />
      ) : screen === "listing-template" && listingTemplateProps ? (
        <ListingTemplateV1
          {...listingTemplateProps}
          // editing={editing ? editing : false}
          // editingSection={editingSection ? editingSection : ""}
        />
      ) : screen === "meta-card" && metaCardProps ? (
        <MetaCardTemplate {...metaCardProps} />
      ) : screen === "whatsapp-template" && whatsappTemplateProps ? (
        <WhatsappTemplate {...whatsappTemplateProps} />
      ) : screen === "whatsapp" ? (
        <WhatsappTemplate {...yogaMessage} />
      ) : screen === "whatsapp-workout" ? (
        <WhatsappTemplate {...yogaMessage2} />
      ) : screen === "whatsapp-invite" ? (
        <WhatsappTemplate {...inviteMessage} />
      ) : screen === "instaprofile" ? (
        <InstaProfile />
      ) : screen === "reviews" && reviewsData ? (
        <ReviewsTemplate reviewsProps={reviewsData} />
      ) : screen === "dashboard" ? (
        <DashboardTemplate />
      ) : screen === "inbox" ? (
        <InboxTemplate />
      ) : screen === "live" ? (
        <LiveTemplate
          mainURL={liveClass}
          heading={heading}
          currentQuestion={currentQuestion}
          questions={commentsInLive}
          persons={personURLs}
        />
      ) : screen === "stream" ? (
        <Stream
          mainURL={liveMakeup}
          currentQuestion={makeupDesc}
          persons={[]}
        />
      ) : screen === "leaderboard" ? (
        <LeaderboardWrapper numEntries={4} noHeading={true} />
      ) : screen === "community" ? (
        <CommunityWrapper />
      ) : screen === "community-home" && communityWrapperProps ? (
        <CommunityHomeWrapper {...communityWrapperProps} />
      ) : screen === "listing-program" && listingTemplateProps ? (
        <ListingTemplateV1 {...listingTemplateProps} />
      ) : null}
    </div>
  );
};

export default MobileInteractive;
