import { baseImageKit, finaleImage, runImage } from "@constants/icons/iconURLs";
import { RoundObject } from "@models/Event/Event";
import { format } from "date-fns";
import { getFinaleDetails } from "./utils";

interface Props {
  //   finaleName: string;
  //   finaleStarts: string;
  onClick: () => void;
  rounds: RoundObject[];
  challengeStarts: number;
}

const FinaleCard: React.FC<Props> = ({ onClick, rounds, challengeStarts }) => {
  const { finaleStarts, name } = getFinaleDetails(rounds, challengeStarts);

  // console.log("name", name, finaleStarts);

  return name && finaleStarts ? (
    <div className="w-screen max-w-md">
      <div className="px-8 relative cursor-pointer" onClick={onClick}>
        <div className="absolute left-12 top-12">
          <p className="text-gray-50 italic text-xl font-medium">{name}</p>
        </div>
        <div className="absolute left-12 top-24 z-20">
          <img
            className="w-full object-cover rounded-2xl"
            src={`${baseImageKit}/${runImage}`}
            // src={thumbnailList[task.labels]}
            alt="badge"
          />
        </div>
        <div className="absolute right-12 bottom-4">
          <p className="text-gray-100 italic text-base">
            Finale starts {format(new Date(finaleStarts), "MMM d")}
          </p>
        </div>
        <img
          className="w-full object-cover rounded-2xl"
          src={`${baseImageKit}/tr:h-200/${finaleImage}`}
          // src={thumbnailList[task.labels]}
          alt="finale"
        />
      </div>
    </div>
  ) : null;
};

export default FinaleCard;
