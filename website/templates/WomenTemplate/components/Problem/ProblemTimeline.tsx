const points: { icon: string; text: string }[] = [
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Subtract__1__j0m8Pu1NO.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668796710826",
    text: "Take the SuperWoman Oath, Become a SB Athlete",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Subtract__2__KIA9PALJYo.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668796710963",
    text: "Give 30 mins to yourself for 30 days",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Subtract__3__g9bvX8luN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668796710908",
    text: "Walk, workout and Eat healthy",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Subtract__4__I8lC5ZSdB.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668796710827",
    text: "Unlock a better fit life",
  },
];
interface Props {
  pointsArr?: {
    icon: string;
    text: string;
  }[];
}
const ProblemTimeline: React.FC<Props> = ({ pointsArr }) => {
  const pointsData = pointsArr?.length ? pointsArr : points;
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        {/* <p className="text-4xl sm:text-5xl lg:text-6xl font-popR text-center">
          What is the Challenge?
        </p>
        <div className="h-14" /> */}
        <div className="grid grid-col auto-rows-fr gap-10 p-4 relative z-0">
          <div className="absolute -z-10 top-12 bottom-12 left-10 sm:left-12 lg:left-14 border-[#FFFFFF] border-dashed border-l-2" />
          {pointsData.map((item) => (
            <div key={item.text} className="flex items-center">
              <img
                src={item.icon}
                className="w-12 sm:w-16 lg:w-20 mr-4 object-contain"
                alt=""
              />
              <span className="font-bair flex-1 text-base sm:text-xl lg:text-2xl text-left">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProblemTimeline;
