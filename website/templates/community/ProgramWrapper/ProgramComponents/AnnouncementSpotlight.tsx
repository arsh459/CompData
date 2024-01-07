import { weEventTrack } from "@analytics/webengage/user/userLog";
import {
  communityQueryV3,
  navLevelsV3,
  postTypes,
} from "@hooks/community/v2/useCommunityParamsV3";

interface Props {
  selectedNav?: navLevelsV3;
  onQueryChange: (
    querry: communityQueryV3,
    replace?: true,
    merge?: boolean
  ) => void;
}

const AnnouncementSpotlight: React.FC<Props> = ({
  selectedNav,
  onQueryChange,
}) => {
  const handleQueryChange = (key: postTypes) => {
    const query: communityQueryV3 = {};
    query.nav = selectedNav;
    query.post = key;
    onQueryChange(query);
    weEventTrack("gameCommunity_postType", { postType: key });
  };

  return (
    <div className="flex text-[#F4F4F4] p-2.5 iphoneX:p-4">
      <div
        className="flex-1 py-3 iphoneX:py-4 flex flex-col justify-center items-center bg-gradient-to-r from-[#97BCF2] to-[#C289B6] rounded-xl relative cursor-pointer"
        onClick={() => handleQueryChange("announcement")}
      >
        <img
          src={`https://ik.imagekit.io/socialboat/Group_77_eqGQBb-oHZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650982153902`}
          alt="Announcement Icon"
          className="w-5 iphoneX:w-8"
        />
        <p className="pt-2 text-sm iphoneX:text-lg font-bold">Announcement</p>
        {/* <div className="absolute -top-1 -right-1 z-10 w-4 h-4 bg-[#FD6F6F] rounded-full" /> */}
      </div>
      <div className="w-2.5 iphoneX:w-4" />
      <div
        className="flex-1 py-3 iphoneX:py-4 flex flex-col justify-center items-center bg-gradient-to-r from-[#B1C6D4] to-[#95BC9B] rounded-xl relative cursor-pointer"
        onClick={() => handleQueryChange("spotlight")}
      >
        <img
          src={`https://ik.imagekit.io/socialboat/Vector_rXnRyXXwY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650982153909`}
          alt="Spotlight Icon"
          className="w-5 iphoneX:w-8"
        />
        <p className="pt-2 text-sm iphoneX:text-lg font-bold">Spotlight</p>
        {/* <div className="absolute -top-1 -right-1 z-10 w-4 h-4 bg-[#FD6F6F] rounded-full" /> */}
      </div>
    </div>
  );
};

export default AnnouncementSpotlight;
