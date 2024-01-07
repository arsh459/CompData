import { homeDomain } from "@constants/seo";
import { getIconImg, getSEOImg } from "@layouts/SEO/getSEOImg";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
// import { useEffect, useState } from "react";

export const useUserSEOData = (
  leader: LeaderBoard | UserInterface | null | undefined
) => {
  return {
    title: leader?.name ? leader.name : "New creator",
    desc: leader?.bio
      ? leader.bio.slice(0, 140)
      : "A top creator at SocialBoat",
    img: leader?.profileImage ? getSEOImg([leader.profileImage]) : "",
    site_name: leader?.userKey
      ? `${leader.userKey}.${homeDomain}`
      : "SocialBoat",
    favIcon: leader?.favIconImg ? getIconImg(leader.favIconImg) : "",
    link: leader?.userKey
      ? `https://${homeDomain}/${leader.userKey}`
      : `https://${homeDomain}/`,
    canonical: leader?.userKey
      ? `https://${homeDomain}/${leader.userKey}`
      : `https://${homeDomain}/`,
  };
};
