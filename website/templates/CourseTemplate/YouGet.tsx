const courseBenifits = [
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Group_1207_IIooevkGm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676099950977",
    title: "20hrs of video content",
    text: "Follow along videos made by Pre/Post natal Yogini Greesha Dhingra",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Group_1208_vwtDeVrDxH.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676099951146",
    title: "24x7 Health Coach",
    text: "24 x 7 Health coach to help you guide through your fitness journey.",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Group_1209_VHBTJ79dV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676099950932",
    title: "Customised Diet Plan",
    text: "A custom nutrition plan will be given for better weight managenment",
  },
  {
    icon: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Group_1210_d-Krso_AR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676099950824",
    title: "1 weekly live session",
    text: "Learn about how small lifestyle changes like how to manage stress, what to eat to manage PCOS",
  },
];

const YouGet = () => {
  return (
    <div className="w-screen h-screen max-w-screen-lg mx-auto flex flex-col justify-center items-center">
      <h2 className="w-full sm:text-center text-white text-3xl sm:text-4xl lg:text-5xl px-5 font-qsSB">
        What will you get in this program?
      </h2>
      <div className="w-12 aspect-1" />
      <div className="w-full grid sm:grid-cols-2 gap-5 px-5">
        {courseBenifits.map((each, index) => (
          <div key={`${each.text}-${index}`} className="flex-1 flex gap-4">
            <img
              src={each.icon}
              alt={each.text}
              className="w-20 sm:w-24 aspect-1 object-contain"
            />
            <div className="flex flex-col justify-center">
              <h6 className="text-white text-lg sm:text-xl font-medium font-qsB">
                {each.title}
              </h6>
              <p className="text-white/80 text-sm font-popR">{each.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouGet;
