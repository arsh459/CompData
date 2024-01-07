import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { getHeight } from "@templates/community/Program/getAspectRatio";
import MediaTile from "../HeaderImage/MediaTile";
import { Link } from "@mui/material";

interface Props {}

const whatsappButtonIcon = {
  path: "v1642418208/WhatsApp_icon_g2jyql.jpg",
  public_id: "v1642418208/WhatsApp_icon_g2jyql",
  width: 662,
  height: 664,
  resource_type: "image",
  format: "jpg",
} as CloudinaryMedia;

const WhatsAppButton: React.FC<Props> = ({}) => {
  return (
    <div className="w-20 h-20 cursor-pointer">
      <Link
        href="https://wa.me/919958730020?text=Hi!%20I%20would%20like%20some%20help%20here."
        target="_blank"
      >
        <MediaTile
          alt="wp"
          media={whatsappButtonIcon}
          width={400}
          height={getHeight(whatsappButtonIcon, 400)}
        />
        <p className="text-center text-gray-500 text-sm font-semibold">
          Tap for help
        </p>
      </Link>
    </div>
  );
};

export default WhatsAppButton;
