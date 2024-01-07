import { useState } from "react";

interface Props {
  activityName?: string;
  text?: string;
  userLevel?: number;
}

const PostDetails: React.FC<Props> = ({ activityName, text, userLevel }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <div className="p-4">
      <div className="flex justify-between items-start text-lg iphoneX:text-2xl font-extrabold italic">
        <h2 className="capitalize line-clamp-2">
          {activityName === "Terra" ? "Custom Workout" : activityName}
        </h2>
        <div className="flex items-center">
          <img
            src={`https://ik.imagekit.io/socialboat/Ellipse_178_fH10R76Qkq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984146252`}
            alt="media title"
            className="w-4 iphoneX:w-6"
          />
          <p className="italic pl-2 whitespace-nowrap">
            lvl {userLevel ? userLevel : 0}
          </p>
        </div>
      </div>
      {text ? (
        <p className="iphoneX:text-lg pt-4">
          {text.length < 100 ? (
            text
          ) : (
            <>
              {showMore ? text : `${text.substring(0, 75)}...`}
              <button
                className="text-blue-500"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            </>
          )}
        </p>
      ) : null}
    </div>
  );
};

export default PostDetails;
