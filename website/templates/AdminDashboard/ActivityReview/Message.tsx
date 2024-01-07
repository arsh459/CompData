import { Button } from "@mui/material";
import { ReviewMessage } from "@models/Activities/Activity";
import UserPhoto from "@templates/community/Program/Feed/PostView/UserPhoto";
import clsx from "clsx";
import { format } from "date-fns";
import Tag from "./Tag";
// import Filter from "./Filter";
// import FilterHolder from "./FilterHolder";
// import Header from "./Header";
// import TaskCardsHolder from "./TaskResults/TaskCardsHolder";

interface Props {
  message: ReviewMessage;
  isActive: boolean;
  onEdit: (rev: ReviewMessage) => void;
}

const Message: React.FC<Props> = ({ message, isActive, onEdit }) => {
  return (
    <div
      className={clsx(
        "p-4 shadow-sm border",
        isActive ? "border-green-500" : ""
      )}
    >
      <UserPhoto
        name={message.authorName}
        img={message.authorImg}
        onImgClick={() => {}}
        updatedOn={message.createdOn}
      />
      <div className="pt-2">
        <div className="flex">
          <p className="font-semibold text-gray-700">
            Score:{" "}
            {message.score ? `${Math.floor(message.score / 300)} FP` : "0 FP"}
          </p>
          <p className="font-medium pl-2 text-gray-700">
            for{" "}
            {message.activityTimeAdded
              ? `${format(
                  new Date(message.activityTimeAdded),
                  "hh:mm a dd-MM-yyyy"
                )}`
              : "no date"}
          </p>
        </div>
        <p>Tags: </p>
        <div className="flex flex-wrap gap-x-2">
          {message.tags &&
            Object.keys(message.tags)?.map((item) => {
              return (
                <div key={item}>
                  <Tag text={item} />
                </div>
              );
            })}
        </div>
        <p>Review: {message.text ? message.text : "-"}</p>

        <div className="pt-2 flex justify-end">
          <Button
            disabled={!isActive}
            variant="outlined"
            onClick={() => onEdit(message)}
          >
            Edit Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Message;
