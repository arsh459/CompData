import clsx from "clsx";
import { getGameGoleImage, getGameGoleImgClass } from "./utils";

interface Props {
  goal?: string;
  gameId: string;
}

const YourGoalIllustraints: React.FC<Props> = ({ goal, gameId }) => {
  const classStr = getGameGoleImgClass(gameId);

  return (
    <div className={clsx("self-start relative z-0", classStr.divClass)}>
      <h3 className="text-2xl iphoneX:text-3xl font-extrabold leading-normal">
        <span className="text-[#FA6060] border-b border-[#FA6060]">
          Your Goal:
        </span>
        <br />
        {goal}
      </h3>
      <img
        className={clsx("absolute -z-10 object-cover", classStr.imgClass)}
        src={getGameGoleImage(gameId)}
        alt="Game Guide"
      />
    </div>
  );
};

export default YourGoalIllustraints;
