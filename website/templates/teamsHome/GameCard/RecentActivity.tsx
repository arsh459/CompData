import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";

interface Props {
  img?: CloudinaryMedia;
  text?: string;
  name?: string;
  createdOn: number;
}

const RecentActivity: React.FC<Props> = () => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default RecentActivity;
