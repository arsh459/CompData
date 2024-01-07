import { Link } from "@mui/material";
import Medal from "@templates/community/Members/Medal";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";
import { formatWithCommas } from "@utils/number";
import { getHeight } from "../getAspectRatio";
// import PrizeTime from "./PrizeTime";

interface Props {
  prize: ListItem;
  size?: "small";
  onClick: () => void;
  setPostRequest: () => void;
  canSubmit?: boolean;
}

const PrizeV2: React.FC<Props> = ({
  canSubmit,
  prize,
  size,
  onClick,
  setPostRequest,
}) => {
  // console.log("prize", prize.heading);
  return (
    <div className="flex items-start bg-gray-100 rounded-md shadow-sm pr-2">
      <div className="w-1/3">
        {prize.media ? (
          <MediaTile
            media={prize.media}
            alt={"prize"}
            rounded={true}
            width={1200}
            // widthString="w-1/3"
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
      </div>
      <div className="w-2/3 pl-2">
        <p className="text-base font-semibold text-gray-700">{prize.heading}</p>

        {/* {prize.prizeLabel ? (
          <div className="flex justify-start pt-1">
            <div className="bg-blue-500 px-4 py-1 rounded-lg">
              <p className="text-center text-sm font-medium text-white">
                {prize.prizeLabel}
              </p>
            </div>
          </div>
        ) : null} */}
        {prize.linkObj ? (
          <Link href={prize.linkObj.link}>
            <p className="text-sm text-gray-700">{`@${prize.linkObj.text}`}</p>
          </Link>
        ) : null}

        {prize.worth ? (
          <p className="text-red-500 text-sm">
            Worth {`INR ${formatWithCommas(prize.worth)}`}
          </p>
        ) : null}

        {prize.rank ? (
          <div className="flex">
            <Medal
              textBold={true}
              position={prize.rank}
              text={`Rank ${prize.rank}${
                prize.rankEnd ? ` - ${prize.rankEnd}` : ""
              } ${prize.coach ? "(Coach)" : ""}`}
            />

            {prize.duration ? (
              <div className="flex pl-2">
                <div className="bg-blue-500 px-2 py-1 rounded-lg flex items-center">
                  <p className="text-center text-xs font-medium text-white">
                    {prize.duration}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {/* <PrizeTime starts={prize.starts} ends={prize.ends} /> */}

        <p className="text-sm pt-1 text-gray-700">{prize.text}</p>

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

export default PrizeV2;
