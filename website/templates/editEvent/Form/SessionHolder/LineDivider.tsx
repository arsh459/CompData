import { Divider } from "@mui/material";
import clsx from "clsx";

// import Checkbox from "@mui/material/Checkbox";

interface Props {
  text?: string;
  paddingString?: string;
}

export const LineDivider: React.FC<Props> = ({ text, paddingString }) => {
  // console.log("form", formState, session.sessionType);
  return (
    <div
      className={clsx(
        paddingString ? paddingString : "py-2.5 iphoneX:py-4",
        "flex items-center"
      )}
    >
      <div className="w-1/2">
        <Divider />
      </div>
      <p className="pl-4 pr-4 text-gray-700">{text ? text : "Or"}</p>
      <div className="w-1/2">
        <Divider />
      </div>
    </div>
  );
};

export default LineDivider;
