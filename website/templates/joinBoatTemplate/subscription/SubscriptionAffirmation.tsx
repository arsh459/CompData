import WaveBtn from "@components/WaveBtn";

interface Props {
  onNext: () => void;
}

const SubscriptionAffirmation: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center">
      <div className="px-8">
        <p className="text-2xl iphoneX:text-3xl text-white font-bold pt-2 w-full text-center">
          Let the games begin!
        </p>
        <p className="text-gray-100 font-light text-center text-sm iphoneX:text-base pt-2 iphoneX:pt-4">
          Please feel free to reach out to us anytime if you run into any
          problems or want to know how to play the game
        </p>

        <div className="pt-6 iphoneX:pt-8 flex justify-center items-center">
          <div className="w-48 iphoneX:w-52">
            <WaveBtn text="Start Game" gotoComponent={onNext} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAffirmation;
