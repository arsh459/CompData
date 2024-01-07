import Link from "next/link";
import LogoName from "@templates/LandingPage/V2/components/LogoName";
import ArrowDirectionIcon from "@components/SvgIcons/ArrowDirectionIcon";

interface Props {
  logoLink: string;
  skipLink?: string;
  onSkip?: () => void;
}

const HeaderWithSkipCta: React.FC<Props> = ({ logoLink, skipLink, onSkip }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col justify-center items-center bg-black/10 backdrop-blur-2xl">
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-10 py-3">
        <Link passHref href={logoLink}>
          <LogoName />
        </Link>

        {skipLink ? (
          <Link passHref href={skipLink} onClick={onSkip}>
            <SkipCta />
          </Link>
        ) : onSkip ? (
          <button onClick={onSkip}>
            <SkipCta />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default HeaderWithSkipCta;

const SkipCta = () => {
  return (
    <div className="px-4 py-2 w-full bg-white rounded-full flex justify-center items-center">
      <p className="hidden sm:block text-black font-nunitoB text-xs whitespace-nowrap">
        Skip for now
      </p>
      <p className="sm:hidden text-black font-nunitoB text-xs whitespace-nowrap">
        Skip
      </p>
      <div className="sm:hidden w-2.5 aspect-1 ml-1">
        <ArrowDirectionIcon direction="right" color="#000000" />
      </div>
    </div>
  );
};
