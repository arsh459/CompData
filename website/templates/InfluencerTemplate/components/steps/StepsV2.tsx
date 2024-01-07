import StepsComp from "@modules/super-women-challenge/StepsComp";
import { HowItWorksType } from "@templates/HowItWorks";
import clsx from "clsx";

interface Props {
  howItWorks?: HowItWorksType[];
  route: string;
  className?: string;
}

const bgURL =
  "https://ik.imagekit.io/socialboat/Group%201000001261_YZxafFBwI.png?updatedAt=1697189682428";

[
  {
    media:
      "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_2934_JetqLIyZv.png?updatedAt=1688400644466",
    title: "Consult with our Gynaecologist to understand your cycle and goal",
  },
  {
    media:
      "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_2935_hkjO84oig.png?updatedAt=1688400639123",
    title: "Sync your menstrual cycle with Sakhi AI",
  },
  {
    media:
      "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_2933_qJw9P9gsD.png?updatedAt=1688400643812",
    title: "Get Daily Yoga practice or HIIT training basis your cycle",
  },
  {
    media:
      "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_2936_s0puuMj0r.png?updatedAt=1688400644003",
    title: "A Dietician designed plan, which updates in realtime",
  },
  {
    media:
      "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_2937_B67fTp5wf.png?updatedAt=1688400641267",
    title: "Weekly Check-Ins, Interactive live sessions and challenges",
  },
];

const data = [
  {
    id: "step-1",
    text: "Consult with our Gynaecologist to understand your cycle and goal",
    subText: "Understands your current health & fitness goals",
    img: "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_2934_JetqLIyZv.png?updatedAt=1688400644466",
  },
  {
    id: "step-2",
    text: "Sync your menstrual cycle with Sakhi AI",
    subText: "Daily Interactive videos and Weekly LIVE Workshops",
    img: "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_2935_hkjO84oig.png?updatedAt=1688400639123",
  },
  {
    id: "step-3",
    text: "Get Daily Yoga practice or HIIT training basis your cycle",
    subText: "500+ recipes, you get a daily diet plan which is fun to follow.",
    img: "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_2933_qJw9P9gsD.png?updatedAt=1688400643812",
  },
  {
    id: "step-4",
    text: "A Dietician designed plan, which updates in realtime",
    subText: "Have any question, reach out to your coach anytime",
    img: "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_2936_s0puuMj0r.png?updatedAt=1688400644003",
  },

  {
    id: "step-5",
    text: "Weekly Check-Ins, Interactive live sessions and challenges",
    img: "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_2937_B67fTp5wf.png?updatedAt=1688400641267",
  },
];

const StepsV2: React.FC<Props> = ({ howItWorks, route, className }) => {
  return (
    <div className="w-screen min-h-screen max-w-screen-xl mx-auto relative z-0 ">
      {howItWorks ||
        data?.map((each, index) => (
          <div
            key={each.id}
            className="w-full sm:w-[70%] lg:w-5/6 sm:h-max mx-auto px-4 flex flex-col  justify-center xs:mb-15 lg:mb-24 sm:mt-24"
          >
            <h2
              aria-hidden={index !== 0}
              className={clsx(
                "font-pJSSB text-center xs:text-[28px] sm:text-4xl lg:text-5xl",
                "bg-clip-text text-[#DCCBFF]",
                "w-full xs:px-2 sm:px-4 xs:mb-2 sm:mb-8 lg:mb-16 py-2 mb-16",
                index === 0 ? "block opacity-100" : "hidden opacity-0"
              )}
            >
              How it works?
            </h2>

            <StepsComp
              heading={`Step ${index + 1}`}
              img={undefined}
              bg={bgURL}
              imageInUrl={each.img}
              title={each.text}
              route={route}
              btnText={"Start Now"}
              index={index}
              marginTop={"mt-12"}
            />
          </div>
        ))}
    </div>
  );
};
export default StepsV2;
