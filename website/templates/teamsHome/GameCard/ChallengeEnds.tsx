import { Divider } from "@mui/material";
// import { format } from "date-fns";
import { getPrefixAndSuffix } from "./utils";

interface Props {
  after: number;
  challengeLength?: number;
  sprintLength?: number;
  roundLength?: number;
}

// const now = Date.now();

const ChallengeEnds: React.FC<Props> = ({
  after,
  challengeLength,
  sprintLength,
  roundLength,
}) => {
  const { prefix, suffix } = getPrefixAndSuffix(
    after,
    challengeLength
    // sprintLength,
    // roundLength
  );

  return (
    <div className="">
      {prefix && suffix ? (
        <>
          <Divider />
          <div className="flex items-center justify-center pt-2">
            <p className="text-gray-500 text-xl text-center font-serif">
              {prefix}
            </p>
            <p className="pl-1 text-red-500 font-semibold text-xl text-center font-serif">
              {suffix}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ChallengeEnds;
