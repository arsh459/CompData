import { sbLogo } from "@constants/imageKitURL";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { getURLToFetch } from "@utils/media/mediaURL";
import { createDNLink } from "./createUtils";

export const createTeamInviteLink = async (
  teamId: string,
  gameId: string,
  profileImage?: AWSMedia | CloudinaryMedia,
  teamName?: string
) => {
  return await createDNLink(
    `Hi! Join my fitness team on SB`,
    profileImage ? getURLToFetch(profileImage, 200, 200) : sbLogo,
    teamName ? teamName : "Fitness team on SB",
    {
      type: "invite",
      teamId,
      gameId,
    }
  );
};

export const createTeamInviteLinkV2 = async (
  uid: string,
  userKey: string
  // name: string,
) => {
  if (userKey) {
    return `https://socialboat.live/join/${userKey}`;
  } else {
    return `https://socialboat.live/joinTeam/${uid}`;
  }

  // return await createDNLink(
  //   `Hi! Join my fitness team on SB`,
  //   profileImage ? getURLToFetch(profileImage, 200, 200) : sbLogo,
  //   teamName ? teamName : "Fitness team on SB",
  //   {
  //     type: "invite",
  //     teamId,
  //     gameId,
  //   }
  // );
};
