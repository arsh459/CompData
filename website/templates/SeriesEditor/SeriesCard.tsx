import { WorkoutSeries } from "@models/Workouts/Series";
import EditPostSection from "@templates/campaignTemplate/EditPostSection";
import {
  getAspectRatioV2,
  getHeight,
} from "@templates/community/Program/getAspectRatio";
// import IconCTA from "@templates/community/Program/GrowCommunity/IconCTA";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";
import { Link } from "@mui/material";

interface Props {
  series: WorkoutSeries;
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  onEditLink?: string;
  onAddText?: string;
  selected?: boolean;
}

const SeriesCard: React.FC<Props> = ({
  onAddText,
  series,
  onEdit,
  onDelete,
  onAdd,
  selected,
  onEditLink,
}) => {
  return (
    <div
      className={clsx(
        selected ? "border-blue-500 border-4" : "border",
        "w-full shadow-sm rounded-lg "
      )}
    >
      {series.thumbnail ? (
        <div className={clsx(getAspectRatioV2(series.thumbnail))}>
          <MediaTile
            alt="img"
            width={400}
            height={getHeight(series.thumbnail, 400)}
            media={series.thumbnail}
          />
        </div>
      ) : null}

      <div className="px-4 py-2">
        <p className="text-gray-700 font-semibold">{series.name}</p>
        <p className="text-gray-500">{series.description}</p>

        {onEdit && onDelete ? (
          <div className="pt-1">
            <EditPostSection
              size="medium"
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>
        ) : onAdd && onAddText ? (
          <div className="cursor-pointer" onClick={onAdd}>
            <p className="text-orange-500 font-semibold text-sm underline">
              {onAddText}
            </p>
          </div>
        ) : null}

        {onEditLink ? (
          <div className="cursor-pointer flex">
            <Link href={onEditLink}>
              <p className="text-orange-500 font-semibold text-sm underline">
                Edit
              </p>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SeriesCard;
