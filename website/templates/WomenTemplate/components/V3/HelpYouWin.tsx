import Link from "next/link";
import React from "react";
import CardForHelpYouIn from "./CardForHelpYouIn";

interface Props {
  route: string;
  btnText: string;
}

const HelpYouWin: React.FC<Props> = ({ route, btnText }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col py-[10vh]">
      <p className="text-3xl md:text-5xl font-popM w-3/4 pt-10 pb-2 text-center text-transparent bg-clip-text bg-gradient-to-br from-[#B269FF] via-[#E3C6FF] to-[#D45FFF]">
        Socialboat app <span className="font-popL">Will help you in</span>
      </p>
      <div className="flex-1 w-full max-w-screen-sm mx-auto grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-4 px-4 py-[10vh]">
        {helpYouWinData.map((i) => {
          return <CardForHelpYouIn key={i.text} data={i} />;
        })}
      </div>

      <div className="flex justify-center items-center">
        <Link passHref href={route}>
          <button className="bg-white px-8 py-3 text-black rounded-full">
            {btnText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HelpYouWin;
export interface HelpYouWinData {
  img: string;
  text: string;
}
const helpYouWinData: HelpYouWinData[] = [
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,f-auto/Vector__5__RShmWc2fk.png?updatedAt=1687285337967",
    text: "Weight loss",
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,f-auto/impM_3llcowHdWE.png?updatedAt=1687519717143",
    text: "improved mood",
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,f-auto/impM__1__23r1rInLV.png?updatedAt=1687519717166",
    text: "Reduction in Facial Acne and hair",
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,f-auto/impM__2__WkkIvf_hr.png?updatedAt=1687519717175",
    text: "Lowers Hair loss",
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,f-auto/impM__3__PgugfhBx1i.png?updatedAt=1687519717218",
    text: "Feel energetic",
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,f-auto/impM__4__d3sq_P61ns.png?updatedAt=1687519717200",
    text: "Regularise your cycle",
  },
];
