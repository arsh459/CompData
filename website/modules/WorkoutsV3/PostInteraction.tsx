import Loading from "@components/loading/Loading";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onGoToTeam: () => Promise<void>;
}

const PostInteraction: React.FC<Props> = ({ isOpen, onClose, onGoToTeam }) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const interval = useRef<NodeJS.Timeout | null>(null);

  const [buttonLoader, setButtonLoader] = useState<boolean>(false);

  const onClick = async () => {
    setButtonLoader(true);
    await onGoToTeam();
  };

  useEffect(() => {
    interval.current = setInterval(() => {
      setProgress((prev) => prev + Math.round(Math.random() * 25));
    }, 2000);

    return () => {
      if (interval.current !== null) {
        clearInterval(interval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      if (interval.current !== null) {
        clearInterval(interval.current);
      }
      setCompleted(true);
    }
  }, [progress]);

  return (
    <CreateModal
      heading=""
      isOpen={isOpen}
      onBackdrop={() => {}}
      onCloseModal={() => {}}
      onButtonPress={() => {}}
      bgData="bg-[#100F1A] fixed inset-0 z-50 w-full h-full max-w-md mx-auto"
    >
      <div className="w-full h-full flex flex-col items-center px-4 iphoneX:px-8 py-8 iphoneX:py-16 text-white">
        <h2 className="text-xl iphoneX:text-3xl font-bold">AI Scan</h2>
        <div className="flex-1 flex flex-col justify-end items-center">
          <div className="w-4/5 aspect-1 relative -z-10">
            <div
              className={clsx(
                "absolute -top-8 -left-8 -z-10 bg-[#AB41FF]/50 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-1000",
                completed
                  ? "w-[250%] h-[250%] blobAnimation1"
                  : "w-full h-full animate-pulse"
              )}
            />
            <div
              className={clsx(
                "absolute -top-8 -right-8 -z-10 bg-[#79FFDF]/50 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-1000",
                completed
                  ? "w-[250%] h-[250%] blobAnimation2"
                  : "w-full h-full animate-pulse"
              )}
            />
            <div
              className={clsx(
                "absolute -bottom-8 -right-8 -z-10 bg-[#5B41FF]/50 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-1000",
                completed
                  ? "w-[250%] h-[250%] blobAnimation3"
                  : "w-full h-full animate-pulse"
              )}
            />
            <div
              className={clsx(
                "absolute -bottom-8 -left-8 -z-10 bg-[#79BFFF]/75 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-1000",
                completed
                  ? "w-[250%] h-[250%] blobAnimation4"
                  : "w-full h-full animate-pulse"
              )}
            />
            <img
              src={
                completed
                  ? `https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Component_2_lKtgaiNhd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659093179822`
                  : `https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Component_1__1__5hQlHRYgx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659117363799`
              }
              alt="process icons"
            />
          </div>
          {completed ? (
            <p className="text-sm iphoneX:text-lg">Processing Completed</p>
          ) : null}
        </div>
        {completed ? null : (
          <p className="text-sm iphoneX:text-lg">
            Progress {progress >= 100 ? 100 : progress}%
          </p>
        )}
        <div className={clsx(!completed && "opacity-0 pointer-events-none")}>
          <p className="w-2/3 mx-auto py-8 iphoneX:py-16 iphoneX:text-xl text-center">
            Your Results will be ready in 15 mins after submission
          </p>
          <button
            className="w-full flex justify-center items-center bg-[#F5F8FF] border border-white rounded-lg py-2.5 iphoneX:py-4"
            onClick={onClick}
          >
            {buttonLoader ? (
              <div>
                <Loading fill="#ff735c" width={24} height={24} />
              </div>
            ) : (
              <img
                src={`https://ik.imagekit.io/socialboat/Group_M1RelHbCm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659092518194`}
                className="w-4 iphoneX:w-5 h-4 iphoneX:h-5 object-contain mr-2.5 iphoneXmr-4"
                alt="file icon"
              />
            )}
            <p className="text-[#100F1A] iphoneX:text-xl">
              {buttonLoader ? "Submitting now" : "Submit For AI Scan"}
            </p>
          </button>
        </div>
      </div>
    </CreateModal>
  );
};

export default PostInteraction;
