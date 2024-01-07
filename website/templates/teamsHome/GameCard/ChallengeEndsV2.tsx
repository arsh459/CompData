import { EventInterface } from "@models/Event/Event";
import { getPrefixAndSuffix } from "./utils";

interface Props {
  // event: EventInterface;
  parentEvent: EventInterface;
}

const ChallengeEndsV2: React.FC<Props> = ({ parentEvent }) => {
  const { prefix, suffix } = getPrefixAndSuffix(
    parentEvent.configuration?.starts,
    parentEvent.configuration?.challengeLength
    // parentEvent.sprintLength,
    // parentEvent.roundLength
  );

  return (
    <div className="italic text-white bg-[#575757]/50 backdrop-blur border border-[#D4D4D4] rounded-xl px-2.5 iphoneX:px-4 py-1 iphoneX:py-2">
      {prefix && suffix ? (
        <>
          <p className="text-[10px] iphoneX:text-xs text-center leading-tight">
            {prefix}
          </p>
          <p className="text-xs iphoneX:text-sm font-extrabold text-center leading-tight">
            {suffix}
          </p>
        </>
      ) : null}
    </div>
  );
};

export default ChallengeEndsV2;
