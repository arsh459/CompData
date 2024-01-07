// import CampaignCreator from "./CampaignCreator";
// import ComeBackLater from "./ComeBackLater";
import { Link } from "@mui/material";
import IconCTA from "@templates/community/Program/GrowCommunity/IconCTA";

interface Props {
  onDelete: () => void;
  onEdit: () => void;
  size?: "tiny" | "medium";
  editLink?: string;
}

const EditPostSection: React.FC<Props> = ({
  onDelete,
  onEdit,
  size,
  editLink,
}) => {
  return (
    <div className="flex">
      <div className="pr-2">
        <IconCTA
          size={size ? size : "tiny"}
          text=""
          img="https://img.icons8.com/ios-glyphs/60/000000/filled-trash.png"
          onClick={onDelete}
        />
      </div>
      {editLink ? (
        <Link href={editLink}>
          <IconCTA
            size={size ? size : "tiny"}
            text=""
            img="https://img.icons8.com/ios-glyphs/30/000000/pencil--v1.png"
            onClick={onEdit}
          />
        </Link>
      ) : (
        <div>
          <IconCTA
            size={size ? size : "tiny"}
            text=""
            img="https://img.icons8.com/ios-glyphs/30/000000/pencil--v1.png"
            onClick={onEdit}
          />
        </div>
      )}
    </div>
  );
};

export default EditPostSection;
