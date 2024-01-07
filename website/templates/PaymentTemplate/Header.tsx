import { weEventTrack } from "@analytics/webengage/user/userLog";
import Logo from "@components/logo/Logo";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  noButton?: boolean;
  notFixed?: boolean;
  orgKey?: string;
  eventName?: string;
  ctaLink?: string;
}

const Header: React.FC<Props> = ({
  noButton,
  notFixed,
  orgKey,
  eventName,
  ctaLink,
}) => {
  const onLogoClick = () => {
    weEventTrack(eventName ? eventName : "logoClick", {});
  };

  const router = useRouter();

  const q = router.query as { home?: string };

  return (
    <div
      className={clsx(
        notFixed ? "" : "fixed top-0 left-0 right-0 z-50",
        "bg-gradient-to-b from-[#100F1A]"
      )}
    >
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center p-4 sm:p-8">
        <div onClick={onLogoClick}>
          <Link passHref href={q.home ? `/${q.home}` : "/"}>
            <Logo size="medium" textColor="text-[#F5F8FF]" />
          </Link>
        </div>
        {noButton ? null : orgKey || ctaLink ? (
          <Link
            href={
              ctaLink ? ctaLink : `/joinBoatV5?origin=${orgKey}&org=${orgKey}`
            }
            passHref
          >
            <a
              className="bg-white text-[#FF4266] px-8 py-2 rounded-full font-semibold font-baim"
              style={{ textDecoration: "none" }}
            >
              Get Started
            </a>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
