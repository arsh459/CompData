import { navLevels, profileSubNav } from "@hooks/community/useCommunityParams";
import clsx from "clsx";

interface Props {
  selectedNav: navLevels;
  uid?: string;
  onNavChange: (newLevel: navLevels) => void;
  onProfilePress: (uid: string, pNav: profileSubNav) => void;
}

const navIcons = [
  {
    img: "https://img.icons8.com/emoji/96/000000/man-running.png",
    text: "feed",
    key: "program" as navLevels,
  },
  {
    img: "https://img.icons8.com/android/96/000000/plus.png",
    text: "post",
    key: "compose" as navLevels,
  },
  {
    img: "https://img.icons8.com/color/96/000000/trophy.png",
    text: "game",
    key: "leaderboard" as navLevels,
  },

  {
    img: "https://img.icons8.com/officel/80/000000/person-male.png",
    text: "me",
    key: "profile" as navLevels,
  },
];

const BottomNavCom: React.FC<Props> = ({
  selectedNav,
  onProfilePress,
  onNavChange,
  uid,
}) => {
  return (
    <div className="bg-white  px-4 py-4 border-t-2 rounded-t-xl shadow-lg flex justify-around items-center">
      {navIcons.map((item) => {
        return (
          <div
            onClick={
              item.key === "profile" && uid
                ? () => onProfilePress(uid, "activities")
                : () => onNavChange(item.key)
            }
            key={item.key}
            className={clsx(
              selectedNav === item.key ? "bg-gray-200 shadow-sm px-6 py-2" : "",
              "cursor-pointer flex justify-center items-center rounded-full"
            )}
          >
            <img className="w-10 h-10 object-cover" src={item.img} />
            {selectedNav === item.key ? (
              <p className="pl-4 text-gray-700 text-xl font-semibold text-center">
                {item.text}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default BottomNavCom;
