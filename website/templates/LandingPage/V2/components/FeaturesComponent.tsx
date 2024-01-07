import LandingFeatures from "./LandingFeatures";

const FeaturesComponent = () => {
  const imgArr = [
    "https://ik.imagekit.io/socialboat/tr:w-516,h-524,c-maintain_ratio/Component_3__3__C2wVw85a7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667042806205",
    "https://ik.imagekit.io/socialboat/tr:w-516,h-524,c-maintain_ratio/Component_2__3__Y2ctBwsgS9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667042806325",
    "https://ik.imagekit.io/socialboat/tr:w-516,h-524,c-maintain_ratio/Component_3__3__C2wVw85a7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667042806205",
    "https://ik.imagekit.io/socialboat/tr:w-516,h-524,c-maintain_ratio/Component_4__1__gAilz3D8v.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667042806338",
  ];
  const nameArr = ["Focus", "Energy", "Confidence", "Weightloss"];
  const coachesArr = [
    "https://ik.imagekit.io/socialboat/tr:w-800,c-maintain_ratio,fo-auto/DSC00199_1__1__hfKmf2SGb.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665752355417",
    "https://ik.imagekit.io/socialboat/tr:w-800,c-maintain_ratio,fo-auto/Screenshot_2022-09-23_at_9.45_1_35Etlff-I.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665752352732",
    "https://ik.imagekit.io/socialboat/tr:w-800,c-maintain_ratio,fo-auto/My_project__3__1__1__qUqCqUUQj.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665752354424",
    "https://ik.imagekit.io/socialboat/tr:w-800,c-maintain_ratio,fo-auto/DSC00286_1__1__krUaQeynO.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665752354945",
  ];

  const nutritionArr = [
    "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/abillion-BlQc1APEaL0-unsplash_1_nL4skSCpct.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667042809879",
    "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/eiliv-sonas-aceron-mW0LIBBHNdE-unsplash_1_4QkPpSKbM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667042809849",
    "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/sina-piryae-bBzjWthTqb8-unsplash_1_lo20FtVZ2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667042809855",
    "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/hanxiao-55zb9e_KcvM-unsplash_1__NsF_sCPG0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667042809822",
    "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/photo-1602881916963-5daf2d97c06e_1_uUWtkfGryO.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667042809727",
  ];
  const teamArr = [
    "https://ik.imagekit.io/socialboat/tr:w-596,h-462,c-maintain_ratio/Group_706_gOy0ItzOu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667042046481",
  ];
  return (
    <>
      <LandingFeatures imgArr={imgArr} nameArr={nameArr}>
        <p className="text-[#B3B3B3] w-full max-w-md pt-4 text-base md:text-sm font-baim">
          Workouts designed by experts for your tailored fitness goal
        </p>
      </LandingFeatures>
      <LandingFeatures
        imgArr={teamArr}
        // videoLink="https://ik.imagekit.io/socialboat/tr:w-800,h-800/HEXA_HIGH_KNEE__1__e8KaSLqzV.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1665672556152"
        preventAutoChange={true}
        // personImg="https://ik.imagekit.io/socialboat/tr:w-596,h-462,c-maintain_ratio/Group_706_gOy0ItzOu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667042046481"
        // personImgStyleTW=""
      >
        <p className="text-2xl md:text-5xl font-baib">
          <span className="text-[#FF4165]">Team-Up</span> with your friend to
          challenge the world.
        </p>
        <p className="text-[#B3B3B3] w-full max-w-md pt-4 text-base md:text-sm font-baim">
          Add an accountability partner and make working out fun for yourself
          and your team
        </p>
      </LandingFeatures>
      <LandingFeatures imgArr={coachesArr} pan={true}>
        <p className="text-2xl md:text-5xl font-baib">
          Workout with the{" "}
          <span className="text-[#FF4165]">Top trainners and Coaches.</span>
        </p>
      </LandingFeatures>
      <LandingFeatures imgArr={nutritionArr} pan={true}>
        <p className="text-2xl md:text-5xl font-baib">
          Dynamic <span className="text-[#FF4165]">Daily nutrition</span> plan
          for your goal
        </p>
        <p className="text-[#B3B3B3] w-full max-w-md pt-4 text-base md:text-sm font-medium font-baim">
          A nutrition plan that adapts to whatever you eat, whenever you eat.
          Eat clean everyday at socialboat.
        </p>
      </LandingFeatures>
    </>
  );
};

export default FeaturesComponent;
