import Link from "next/link";

interface Props {
  heading?: string;
  img?: string;
  title?: string;
  route: string;
  btnText: string;
}

const HowItWorksComp: React.FC<Props> = ({
  heading,
  route,
  btnText,
  img,
  title,
}) => (
  <div className="flex-1 flex flex-col lg:flex-row items-center gap-8 py-4 relative z-0">
    <div className="flex-1 py-4 flex flex-col justify-center gap-4 sm:gap-12 lg:gap-8 lg:pl-12">
      <p className="text-xl lg:text-2xl font-popL text-center lg:text-left text-[#EEE9FF]">
        {heading}
      </p>
      <p className="font-canelaR text-center lg:text-left text-3xl lg:text-[2.8rem] lg:leading-[2.8rem] text-[#EEE9FF]">
        {title}
      </p>
      <div className="flex-1 lg:hidden flex justify-center items-center">
        <div className="w-full aspect-1 overflow-hidden bg-white/10 border border-white/20 rounded-3xl">
          <div className="w-full aspect-1 overflow-hidden bg-white/10 border border-white/20 rounded-3xl">
            <img
              src={img}
              alt={`${heading} img`}
              className="w-full h-full object-contain object-bottom"
            />
          </div>
        </div>
      </div>
      <Link passHref href={route} className="self-center lg:self-start">
        <button className="bg-white px-8 py-2.5 text-base text-black rounded-full">
          {btnText}
        </button>
      </Link>
    </div>
    <div className="hidden lg:block w-2/5 aspect-1 overflow-hidden bg-white/10 border border-white/20 rounded-3xl">
      <img
        src={img}
        alt={`${heading} img`}
        className="w-full h-full object-contain object-bottom"
      />
    </div>
  </div>
);

export default HowItWorksComp;
