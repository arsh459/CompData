import { dataTypes } from "@constants/inviteV2";

interface Props {
  data: dataTypes;
}

const Challenge: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full sm:w-3/4 lg:w-1/2 max-w-screen-md mx-auto flex flex-col justify-center items-center px-5 py-32">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center">
        {"What's the Challenge"}
      </h2>
      <p className="py-5 text-center text-white/60">{data.challengeDesc}</p>
    </div>
  );
};

export default Challenge;
