import { UserInterface } from "@models/User/User";

export const getCommunityNames = (
  leaders: UserInterface[],
  enrolledCommunities?: string[]
) => {
  const communityNames: string[] = [];

  if (enrolledCommunities) {
    for (const community of enrolledCommunities) {
      const comns = leaders.filter((item) => item.uid === community);

      if (comns.length > 0) {
        communityNames.push(comns[0]?.name ? comns[0].name : "Unknwon");
      }
    }
  }

  return communityNames;
};
