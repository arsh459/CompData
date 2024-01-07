import Button from "@components/button";
import { Link } from "@mui/material";
import LineDivider from "@templates/editEvent/Form/SessionHolder/LineDivider";

interface Props {
  placeholderStyle?: "community" | "community-me";
}

const PostPlaceholder: React.FC<Props> = ({ placeholderStyle }) => {
  if (placeholderStyle === "community-me") {
    return (
      <>
        <div className="p-4 flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg">
          <div className="flex flex-col items-center">
            <img
              className="w-36 h-36 object-cover"
              src="https://img.icons8.com/emoji/96/000000/vulcan-salute-emoji.png"
            />
          </div>
          <div className="pt-4">
            <p className="text-2xl text-gray-700 text-center">
              Welcome! You have no programs as of now
            </p>
            <p className="text-base text-gray-500 text-center">
              To start, click below
            </p>
          </div>

          <Link href="/dashboard" target="_blank">
            <div className="flex pt-2">
              <Button appearance="contained">
                <p>Launch new program</p>
              </Button>
            </div>
          </Link>
        </div>

        <div className="">
          <LineDivider />
        </div>
      </>
    );
  }
  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg">
      <div className="flex flex-col items-center">
        <img
          className="w-36 h-36 object-cover"
          src="https://img.icons8.com/emoji/96/000000/vulcan-salute-emoji.png"
        />
        <div className="pt-4">
          <p className="text-2xl text-gray-700 text-center">
            {placeholderStyle === "community"
              ? "Welcome! No Programs as of now"
              : "Welcome! No posts till now"}
          </p>
          <p className="text-base text-gray-500 text-center">
            {placeholderStyle === "community" ? "Please visit soon" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostPlaceholder;
