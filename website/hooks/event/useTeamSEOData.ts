// import { homeDomain } from "@constants/seo";
import { getIconImg, getSEOImg } from "@layouts/SEO/getSEOImg";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";

export const useTeamSEOData = (
  leader?: UserInterface | LeaderBoard | null,
  teamName?: string,
  gameName?: string,
  gameDesc?: string,
  gameImg?: AWSMedia | CloudinaryMedia
) => {
  return {
    title:
      teamName && gameName
        ? `${gameName}: ${teamName}`
        : gameName
        ? gameName
        : "Socialboat",
    // ? leader.name
    // : "New creator",
    desc: gameDesc ? gameDesc : "Real life game that makes fitness fun",
    // ? `Join ${leader?.name}'s team in ${gameName}. ${gameDesc.slice(0, 130)}`
    // : leader?.bio
    // ? leader.bio.slice(0, 140)
    // : "A top creator at SocialBoat",
    img: gameImg
      ? getSEOImg([gameImg])
      : leader?.profileImage
      ? getSEOImg([leader.profileImage])
      : "",
    site_name: "SocialBoat",
    favIcon: leader?.favIconImg ? getIconImg(leader.favIconImg) : "",
  };
};
