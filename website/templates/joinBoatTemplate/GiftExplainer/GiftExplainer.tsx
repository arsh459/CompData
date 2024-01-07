import { weEventTrack } from "@analytics/webengage/user/userLog";
import clsx from "clsx";

interface Props {
  onNext: () => void;
}

const steps: { icon: string; text: string }[] = [
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component_21_3GFSDXWcw.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668261211418",
    text: "Buy SocialBoat App subscription",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Arrow_26_BC0zxhyJa.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668262317240",
    text: "arrow",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component_22_LXfNznfyE.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668261215221",
    text: "Share a personalised gift card to your loved ones",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Arrow_26_BC0zxhyJa.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668262317240",
    text: "arrow",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component_23_RzLFx1aJU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668261230703",
    text: "They Download the app & start their journey",
  },
];

const GiftExplainer: React.FC<Props> = ({ onNext }) => {
  const onStart = () => {
    onNext();
    weEventTrack("giftExplainer_clickNext", {});
  };

  return (
    <div className="w-full h-full relative z-0 flex flex-col md:justify-center md:items-center p-4">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-popR text-center">
        Give her a gift of
        <span className="text-[#FF4183] text-center font-baiSb">
          {" "}
          health & fitness{" "}
        </span>
      </h1>

      <div className="flex flex-col md:flex-row py-8 md:py-12">
        {steps.map((step, index) => (
          <div
            key={`step-${index}`}
            className="w-full h-full flex flex-col justify-center items-center"
          >
            <img
              src={step.icon}
              alt={`step-${index}`}
              className={clsx(
                step.text === "arrow"
                  ? "w-8 md:w-16 rotate-90 md:rotate-0 m-4"
                  : "w-28 md:w-40",
                "aspect-1 object-contain"
              )}
            />
            <p
              className={clsx(
                step.text === "arrow" ? "hidden" : "w-60 pt-8",
                "text-[#A6A6A6] text-sm md:text-base text-center font-extralight font-popR"
              )}
            >
              {step.text}
            </p>
          </div>
        ))}
      </div>

      <div className="sticky bottom-4 flex justify-center items-center">
        <div className="w-[240px]">
          <button
            className={clsx("rounded-full px-4 py-3  w-full", "bg-white")}
            onClick={onStart}
          >
            <p
              className="text-[#100F1A] text-base  iphoneX:text-xl text-center"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Start
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftExplainer;
