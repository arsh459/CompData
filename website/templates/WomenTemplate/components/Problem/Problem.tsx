const points: { icon: string; text: string }[] = [
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component_20_szWlLA9Uy.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668171641273",
    text: "Safety",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component_20__1__JADlDpT49.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668171641298",
    text: "Body image issues",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component_20__2__lgrlm5cd0c.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668171641365",
    text: "Lack of Time",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component_3_3C8_70QQG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668258896880",
    text: "Irrelevant Programs",
  },
];

const Problem = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p className="text-4xl sm:text-5xl lg:text-6xl font-popR text-center">
          <span className="text-[#FF4183] font-bair">Only 3% </span>
          women in India <br className="hidden md:block" /> get sufficient
          exercise.
        </p>
        <div className="h-20" />
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-max-max gap-10 lg:gap-20 p-5">
          {points.map((item) => (
            <div key={item.text} className="grid gap-5 place-items-center">
              <img
                src={item.icon}
                className="w-20 sm:w-14 object-contain"
                alt={`image of ${item.text}`}
              />
              <span className="font-popR text-sm sm:text-sm lg:text-base whitespace-nowrap">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Problem;
