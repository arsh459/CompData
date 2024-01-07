import { HowItWorksType } from "@templates/HowItWorks";
import HowItWorks from "./HowItWorks";

const data = [
  {
    id: "step-1",
    text: "Health Evaluation",
    subText: "Understands your current health & fitness goals",
    img: "https://ik.imagekit.io/socialboat/tr:h-500,c-maintain_ratio,fo-auto/Frame_1360_1__b1sSX92FK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676887158363",
  },
  {
    id: "step-2",
    text: "Interactive Live Workouts",
    subText: "Daily Interactive videos and Weekly LIVE Workshops",
    img: "https://ik.imagekit.io/socialboat/tr:h-500,c-maintain_ratio,fo-auto/Frame_1364__1__C4os55lNd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677072741465",
  },
  {
    id: "step-3",
    text: "A diet plan made by Clinical Nutritionists",
    subText: "500+ recipes, you get a daily diet plan which is fun to follow.",
    img: "https://ik.imagekit.io/socialboat/tr:h-500,c-maintain_ratio,fo-auto/Frame_1360_mwcq6z05ft.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676887159411",
  },
  {
    id: "step-4",
    text: "Weekly Check-ins & 24*7 support",
    subText: "Have any question, reach out to your coach anytime",
    img: "https://ik.imagekit.io/socialboat/tr:h-500,c-maintain_ratio,fo-auto/Frame_1362_o5Pk5QgY9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676887161105",
  },
];

interface Props {
  howItWorks?: HowItWorksType[];
}
const Steps: React.FC<Props> = ({ howItWorks }) => {
  return (
    <>
      <h2 className="w-full font-nunitoSB text-center text-white text-3xl sm:text-4xl lg:text-5xl px-5 my-8 mt-24">
        How it Works?
      </h2>
      {(howItWorks || data)?.map((each, index) => (
        <HowItWorks
          key={each.id}
          heading={`Step ${index + 1}`}
          title={each.text}
          subtitle={each.subText}
          img={each.img}
        />
      ))}
    </>
  );
};

export default Steps;
