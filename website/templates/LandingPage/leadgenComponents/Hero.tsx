import Logo from "@components/logo/Logo";
import { leadgenTypes } from "@constants/leadgen";
import Link from "next/link";

interface Props {
  leadgen: leadgenTypes;
}

const Hero: React.FC<Props> = ({ leadgen }) => {
  return (
    <>
      <img
        src={leadgen.hero.media}
        alt="leadgen hero image"
        className="absolute w-full h-full -z-10 object-cover"
      />
      <div className="sm:hidden absolute -z-10 top-0 left-0 right-0 bg-gradient-to-b from-transparent to-black h-full" />
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#100F1A]">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4 sm:p-8">
          <Link passHref href="/">
            <Logo size="medium" textColor="text-[#F5F8FF]" />
          </Link>
          <Link
            href="/start?origin=landing"
            className="bg-white text-[#FF4266] px-8 py-2 rounded-full font-semibold"
            style={{ textDecoration: "none" }}
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="w-full h-full max-w-screen-xl flex flex-col justify-center mx-auto px-4 sm:px-8">
        <h1 className="text-[66px] md:text-[82px] leading-[70px] md:leading-[85px] lg:w-2/3 font-bold">
          {leadgen.hero.title}
        </h1>
        <h4 className="text-base md:text-xl w-2/3 lg:w-1/3 my-8 md:my-16">
          {leadgen.hero.subTitle}
        </h4>
        <Link
          href="/start?origin=landing"
          className="bg-[#FF4266] text-white px-12 py-3 rounded font-semibold w-max"
          style={{ textDecoration: "none" }}
        >
          Schedule Call
        </Link>
      </div>
    </>
  );
};

export default Hero;
