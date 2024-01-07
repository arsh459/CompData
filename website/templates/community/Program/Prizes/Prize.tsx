import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";
import { getHeight } from "../getAspectRatio";
import PrizeTime from "./PrizeTime";

interface Props {
  prize: ListItem;
  size?: "small";
  onClick: () => void;
  setPostRequest: () => void;
  canSubmit?: boolean;
}

const Prize: React.FC<Props> = ({
  canSubmit,
  prize,
  size,
  onClick,
  setPostRequest,
}) => {
  // console.log("prize", prize.heading);
  return (
    <div className="flex flex-col items-center">
      {prize.media ? (
        <MediaTile
          media={prize.media}
          alt={"prize"}
          rounded={true}
          width={1200}
          height={getHeight(prize.media, 1200)}
        />
      ) : (
        <img
          className={
            size === "small"
              ? "w-18 h-18 object-cover"
              : "w-36 h-36 object-cover"
          }
          src="https://img.icons8.com/fluency/96/000000/trophy.png"
        />
      )}
      <div>
        <p className="text-center text-sm font-medium text-gray-700">
          {prize.heading}
        </p>

        {prize.prizeLabel ? (
          <div className="flex justify-center pt-1">
            <div className="bg-blue-500 px-4 py-1 rounded-lg">
              <p className="text-center text-sm font-medium text-white">
                {prize.prizeLabel}
              </p>
            </div>
          </div>
        ) : null}

        <PrizeTime starts={prize.starts} ends={prize.ends} />

        <p className="text-center text-sm text-gray-700">{prize.text}</p>

        <div className="flex justify-evenly pt-0.5">
          {/* <div className="cursor-pointer " onClick={onClick}>
            <p className="text-sm text-center text-gray-600 font-semibold underline">
              Rules
            </p>
          </div> */}

          {/* {canSubmit ? (
            <div className="cursor-pointer" onClick={setPostRequest}>
              <p className="text-sm text-center text-orange-500 underline">
                Submit
              </p>
            </div>
          ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default Prize;
