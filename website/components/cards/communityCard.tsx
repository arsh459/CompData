import { getCloudinaryURLWithParams } from "@utils/cloudinary";
import clsx from "clsx";

interface Props {
  name: string;
  text: string;
  url: string;
  subtext?: string;
}

const CommunityCard: React.FC<Props> = ({ url, name, text, subtext }) => {
  return (
    <div className={clsx("relative")}>
      <img
        alt={`img-${name}`}
        src={getCloudinaryURLWithParams(url, 80, 100, "c_fill")}
        className={clsx("rounded-xl shadow-2xl w-36 h-48 object-cover")}
      />
      <div className={clsx("pt-1")}>
        <p className={clsx("text-sm font-medium text-gray-800")}>{name}</p>
        <p className={clsx("text-xs text-gray-700")}>{text}</p>
        {subtext ? (
          <p className={clsx("text-xs text-red-500")}>{subtext}</p>
        ) : null}
      </div>
    </div>
  );
};

export default CommunityCard;
