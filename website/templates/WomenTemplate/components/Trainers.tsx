import PanImg from "@templates/LandingPage/V2/components/PanImg";

const coachesArr = [
  "https://ik.imagekit.io/socialboat/tr:w-800,c-maintain_ratio,fo-auto/Component_1__19__UiMWT7k_i.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668167275219",
  "https://ik.imagekit.io/socialboat/tr:w-800,c-maintain_ratio,fo-auto/Component_1__20__JpoVnJwLL.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668167828251",
  "https://ik.imagekit.io/socialboat/tr:w-800,c-maintain_ratio,fo-auto/Component_2__9__HHGeK1Z-iA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668170804961",
  "https://ik.imagekit.io/socialboat/tr:w-800,c-maintain_ratio,fo-auto/Component_2__7__-pB6c3K1-.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668170569330",
];

const Trainers = () => {
  return (
    <div className="pb-20 w-full h-full flex flex-col justify-center items-center relative z-0 p-4 pt-0">
      <div className="text-white text-4xl md:text-6xl font-bold font-bail text-center max-w-screen-lg py-20 md:py-28">
        <span className="text-[#FF4266]">Designed </span>
        by certified Trainers, Health coaches and Nutritionist
      </div>
      <div className="scale-x-[-1] w-full max-w-screen-lg flex-1 flex justify-center items-center">
        <PanImg imgArr={coachesArr} maxWidth="max-w-screen-md" />
      </div>
    </div>
  );
};

export default Trainers;
