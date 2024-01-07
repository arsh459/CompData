import { weEventTrack } from "@analytics/webengage/user/userLog";
import { leadgenTypes } from "@constants/leadgen";
import useWindowDimensions from "@hooks/utils/useWindowDimensions";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  leadgen: leadgenTypes;
  ctaText?: string;
  ctaText2?: string;
  ctaLink2?: string;
  onProceed?: () => void;
  ctaHidden?: boolean;
  orgKey: string;
  ctaLink?: string;
}

const Hero: React.FC<Props> = ({
  leadgen,
  ctaText,
  onProceed,
  ctaLink2,
  ctaText2,
  ctaHidden,
  orgKey,
  ctaLink,
}) => {
  const { height } = useWindowDimensions();

  const onLetsGo = () => {
    weEventTrack("invitePage_clickLetsGo", {});
  };
  const onJoin = () => {
    weEventTrack("invitePage_clickJoin", {});
  };

  return (
    <>
      <div className="absolute inset-0 bg-black flex justify-end -z-20">
        <img
          src={leadgen.hero.media}
          alt="leadgen hero image"
          className="w-full h-3/4 md:h-full object-cover"
          style={{ minWidth: height }}
        />
      </div>
      <div className="absolute inset-0 h-4/5 md:h-full -z-10 flex">
        <div className="self-end w-full md:w-3/5 h-1/2 md:h-full bg-gradient-to-t md:bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>
      <div className="w-full h-full flex flex-col justify-end md:justify-center px-4 sm:px-8 max-w-screen-xl mx-auto pt-20">
        <h1 className="text-4xl md:text-5xl font-baib text-center md:text-left w-full md:w-4/5">
          {leadgen.hero.title}
        </h1>
        <h4 className="text-lg md:text-xl font-baiEl mt-4 md:mt-8 mb-8 md:mb-16  text-center md:text-left w-full md:w-3/5">
          {leadgen.hero.subTitle}
        </h4>
        <div className="flex md:flex-row flex-col items-center">
          {ctaText && !ctaHidden ? (
            <Link
              href={ctaLink ? ctaLink : `/start?origin=${orgKey}&org=${orgKey}`}
              passHref
            >
              <button
                onClick={onLetsGo}
                className="bg-[#FF4266] text-white px-6 md:px-12 py-3 rounded font-baiSb w-max whitespace-nowrap"
              >
                {ctaText}
              </button>
            </Link>
          ) : null}

          {ctaText2 && ctaLink2 && !ctaHidden ? (
            <Link href={ctaLink2} passHref>
              <button
                onClick={onJoin}
                className="md:ml-4 mt-4 md:px-6 text-white underline  py-3 rounded font-baiSb font-light w-max"
              >
                {ctaText2}
              </button>
            </Link>
          ) : null}
        </div>
        {leadgen.hero.partners ? (
          <div className="w-full lg:w-2/3 flex flex-wrap pt-4 md:pt-20">
            {leadgen.hero.partners.map((partner, index) => (
              <div
                key={partner.text}
                className={clsx(
                  "flex flex-col justify-center items-center my-2 pr-4",
                  index ===
                    (leadgen.hero.partners?.length
                      ? leadgen.hero.partners.length
                      : 0) -
                      1 && "mr-20"
                )}
              >
                <img
                  src={partner.icon}
                  alt={partner.text}
                  className="h-10 max-w-[150px] object-contain"
                />
                <p className="text-lg lg:text-xl font-baiSb mt-2">
                  {partner.text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-1/5" />
        )}
      </div>
    </>
  );

  // return (
  //   <div className="w-full max-w-screen-xl mx-auto flex flex-col items-center pt-8">
  //     <h1 className="text-4xl sm:text-[54px] lg:text-7xl font-extrabold text-center font-baib">
  //       {organization.heading ? organization.heading : "Get Fit With"}
  //       <br />
  //       {organization.headingBr ? organization.headingBr : organization.name}
  //     </h1>
  //     <div className="text-[#C8C8C8] w-max flex flex-col md:flex-row items-center py-8">
  //       {organization.tags.map((tag, index) => (
  //         <div key={tag} className="w-full flex flex-col md:flex-row ">
  //           {index === 0 ? null : (
  //             <div className="w-full md:w-px h-px md:h-10 my-4 md:my-0 md:mx-6 bg-[#C8C8C8]" />
  //           )}
  //           <h4 className="text-center text-xl sm:text-2xl lg:text-3xl whitespace-nowrap font-bair">
  //             {tag}
  //           </h4>
  //         </div>
  //       ))}
  //     </div>
  //     <CTA
  //       text="Proceed"
  //       onClick={onProceed}
  //       bgColor="bg-[#F03D5F]"
  //       textSize="text-base sm:text-lg lg:text-xl"
  //       width="w-80"
  //     />
  //   </div>
  // );
};

export default Hero;
