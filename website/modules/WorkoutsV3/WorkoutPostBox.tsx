import clsx from "clsx";
// import { useState } from "react";
import Typewriter from "typewriter-effect";
import Header from "./Header";

interface Props {
  onBack: () => void;
  text?: string;
  onUpdateText: (newText: string) => void;
  onPost: () => void;
}

const words = [
  "Cycled for 50kms 🚴",
  "Did a handstand for 45secs ⏱️",
  "100kg deadlift! Feeling 💪 ",
  "Join me for a run! 🏃‍♀️",
];

const WorkoutPostBox: React.FC<Props> = ({
  onBack,
  text,
  onUpdateText,
  onPost,
}) => {
  // const [inputText, setInputText] = useState<string>("");

  return (
    <div
      className={clsx(
        "flex-1 flex flex-col bg-[#EEEEEE] transition-all",
        "group-focus-within:bg-[#F1F1F1]/[0.89] group-focus-within:backdrop-blur-[97px]"
      )}
    >
      <div className="flex justify-end items-center group-focus-within:justify-between">
        <Header
          onBack={onBack}
          headingCenter={true}
          color="#335E7D"
          classStr="hidden p-4 group-focus-within:block"
        />
        <div
          onClick={onPost}
          className={clsx(
            "w-max text-white text-xl rounded-full px-8 py-1 m-4",
            "bg-gradient-to-r from-[#F29C39] to-[#F98258]"
          )}
        >
          {text ? "Post" : "Next"}
        </div>
      </div>
      <div className="flex-1 p-2 m-4 relative">
        <textarea
          value={text}
          placeholder="How was your experience"
          onChange={(e) => onUpdateText(e.target.value)}
          className={clsx(
            "w-full h-full text-lg resize-none bg-transparent text-[#335E7D]",
            "peer placeholder:opacity-0 focus:outline-none focus:placeholder:opacity-50"
          )}
        />
        <div
          className={clsx(
            "text-lg opacity-50 absolute top-2 left-2 text-[#335E7D] pointer-events-none peer-focus:hidden",
            text === "" ? "" : "hidden"
          )}
        >
          <Typewriter
            options={{
              strings: words,
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkoutPostBox;
