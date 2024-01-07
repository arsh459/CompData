import Divider from "@components/divider/Divider";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { ScoreEntry } from "@models/ScoreEntry/ScoreEntry";
import ProfileImg from "@templates/profile/ProfileHeader/ProfileImg";
import MediaTile from "../HeaderImage/MediaTile";

interface Props {
  entry: ScoreEntry;
  sampleVideo?: CloudinaryMedia;
}

const ScoreboardEntry: React.FC<Props> = ({ entry, sampleVideo }) => {
  //   console.log("sampleVideo", sampleVideo);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="pr-2">
            <p className="text-gray-700 text-2xl font-light">{entry.rank}.</p>
          </div>
          <div className="pr-4 sm:pr-2">
            <ProfileImg
              live={false}
              onClickURL=""
              imgUrl={`https://avatars.dicebear.com/api/micah/${entry.name}.svg`}
              size="sm"
              selected={false}
            />
          </div>
          <div>
            <p className="text-gray-700 font-semibold md:text-sm">
              {entry.name}
            </p>
            {entry.submissions.length > 0 ? (
              <>
                <p className="text-orange-500 font-semibold text-sm md:text-xs">{`${entry.submissions[0].value} ${entry.scoreKey}`}</p>
                {entry.location ? (
                  <p className="text-gray-700 text-sm md:text-xs">
                    {entry.location}
                  </p>
                ) : null}
                <p className="text-gray-500 text-sm md:text-xs pt-1">{`${new Date(
                  entry.submissions[0].createdOnUnix
                ).toLocaleDateString("default", {
                  // month: "short",
                  // day: "2-digit",
                  hour12: true,
                  hour: "numeric",
                  weekday: "short",
                })}`}</p>
              </>
            ) : null}
          </div>
        </div>

        <div className="w-1/3 pl-2">
          <div className="aspect-w-3 aspect-h-2 bg-green-50">
            {sampleVideo ? (
              <MediaTile
                media={sampleVideo}
                width={400}
                height={200}
                alt="kpi-video"
                rounded
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="pt-4 pb-4">
        <Divider />
      </div>
    </div>
  );
};

export default ScoreboardEntry;
