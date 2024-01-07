// import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { ScoreEntry } from "@models/ScoreEntry/ScoreEntry";
import ScoreboardEntry from "./ScoreboardEntry";

interface Props {
  scoreEntries: ScoreEntry[];

  noHeading?: boolean;
}

const Scoreboard: React.FC<Props> = ({
  scoreEntries,

  noHeading,
}) => {
  return (
    <div className="w-full ">
      {noHeading ? null : (
        <div className="pb-2">
          <p className="text-2xl text-center font-medium text-gray-700">
            Leaderboard
          </p>
          <p className="text-sm text-center text-gray-700">Join the cult</p>
        </div>
      )}
      <div className="flex flex-wrap">
        {scoreEntries.map((item, index) => {
          return (
            <div key={item.id} className="pb-2 w-full">
              <ScoreboardEntry entry={item} sampleVideo={item.img} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Scoreboard;
