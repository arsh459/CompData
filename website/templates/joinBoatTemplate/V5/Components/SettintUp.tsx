import clsx from "clsx";
import { useEffect } from "react";

const animateTime = 1000;

interface Props {
  onGotoJoin: () => void;
}

const SettintUp: React.FC<Props> = ({ onGotoJoin }) => {
  useEffect(() => {
    setTimeout(() => {
      onGotoJoin();
    }, animateTime * 3);
  }, []);

  return (
    <div className="flex-1 relative">
      <StackingComp
        imgUrl="https://ik.imagekit.io/socialboat/Union_vvy_Wkt0P.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666100738600"
        text="Creating a workout plan"
        gradient="bg-gradient-to-b from-[#48AFFF] to-[#829DFF]"
        alt="This Is A Picture Of A Stick Figure Person That Is - Gymnastics Icon"
      />
      <StackingComp
        imgUrl="https://ik.imagekit.io/socialboat/Vector_-4FdNPIi_.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666100721176"
        text="Sending information for diet plan"
        gradient="bg-gradient-to-b from-[#EBA94E] to-[#FF6153]"
        delay={animateTime}
        alt="This Is A Picture Of food bowl"
      />
      <StackingComp
        imgUrl="https://ik.imagekit.io/socialboat/Vector_F_MugypDu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666100705507"
        text="Accounting for your Mindful levels"
        gradient="bg-gradient-to-b from-[#8F98FF] to-[#FF72E0]"
        delay={animateTime * 2}
        alt="icon for Mindful levels"
      />
    </div>
  );
};

export default SettintUp;

interface StackingCompProps {
  imgUrl: string;
  text: string;
  gradient: string;
  delay?: number;
  alt?: string;
}

const StackingComp: React.FC<StackingCompProps> = ({
  imgUrl,
  text,
  gradient,
  delay,
  alt,
}) => {
  return (
    <div
      className="flex flex-row items-center px-4 iphoneX:px-8 py-4 iphoneX:py-6 settingupAnimation"
      style={{
        opacity: 0,
        animationDelay: `${delay}ms`,
      }}
    >
      <img
        src={imgUrl}
        alt={alt || ""}
        className="w-5 iphoneX:w-6 aspect-1 object-contain"
      />
      <div className="w-4 aspect-1" />
      <p
        className={clsx(
          `text-transparent bg-clip-text font-baib text-sm iphoneX:text-base text-white`,
          gradient
        )}
      >
        {text}
      </p>
    </div>
  );
};
