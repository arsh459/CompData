import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";
import {
  // getAspectRatio,
  getAspectRatioV2,
  getHeight,
} from "../Program/getAspectRatio";
import Linkify from "react-linkify";

interface Props {
  leader: LeaderBoard;
}

const AboutCreator: React.FC<Props> = ({ leader }) => {
  // console.log("leader.coverCloudinary[0]", leader.coverCloudinary[0]);
  return (
    <div>
      <div className="p-4">
        <div className="pb-4">
          <p className="text-gray-700 text-3xl font-semibold">In a brief</p>
          <p className="text-gray-700 pt-2 prose whitespace-pre-wrap">
            <Linkify>{leader.bio}</Linkify>
          </p>
        </div>

        <div className="">
          {leader.coverCloudinary && leader.coverCloudinary.length > 0 ? (
            <div
              className={clsx(
                "shadow-lg rounded-lg",
                getAspectRatioV2(leader.coverCloudinary[0])
              )}
            >
              <MediaTile
                media={leader.coverCloudinary[0]}
                alt="cover"
                rounded
                //   heightString="max-h-[400px]"
                width={1600}
                height={getHeight(leader.coverCloudinary[0], 1600)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AboutCreator;
