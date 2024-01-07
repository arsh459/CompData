import Link from "next/link";
import React from "react";
interface Props {
  heading?: string;
  text?: string;
  btnText?: string;
  navigateUrl?: () => void;
}
const SignUp: React.FC<Props> = ({ btnText, heading, navigateUrl, text }) => {
  return (
    <div className="flex flex-col  my-4 w-full h-full md:px-4 lg:gap-8 lg:flex-row ">
      <div className="w-full  max-w-3xl  overflow-hidden  flex flex-col">
        <p className="text-[#5B5B5B]   text-lg md:text-xl lg:text-2xl font-popM">
          {heading}
        </p>
        <div className="w-full flex items-center justify-between py-5">
          <p className="text-[#5B5B5B]  flex-[.63] leading-tight text-xs md:text-sm font-popR">
            {text}
          </p>
          <Link
            passHref
            href={"/interests"}
            className="bg-gradient-to-r flex-[.37] max-w-[129px] lg:max-w-[189px] from-pink-500 to-pink-600 shadow-md border rounded-full"
          >
            <p className="text-xs text-center py-2.5 md:py-3 lg:py-4 text-white md:text-sm font-popM">
              {btnText}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
