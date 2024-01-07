import { weEventTrack } from "@analytics/webengage/user/userLog";
import { LandingButton } from "@templates/LandingPage/V2/components/LandingButton";
import Link from "next/link";

export type activeLinkType =
  | "link_1"
  | "link_2"
  | "link_3"
  | "link_4"
  | "link_5";

interface Props {
  activeLink?: activeLinkType;
  finalRef: string;
  btnText?: string;
  btnAction?: () => void;
}

const AllLinks: React.FC<Props> = ({
  activeLink,
  finalRef,
  btnText,
  btnAction,
}) => {
  const clickEvent = (
    text: "blog" | "about-us" | "reviews" | "plans" | "explore-workouts"
  ) => {
    if (text === "blog") {
      weEventTrack("landingPage_clickBlog", {});
    } else if (text === "about-us") {
      weEventTrack("landingPage_clickAboutUs", {});
    } else if (text === "reviews") {
      weEventTrack("landingPage_clickReviews", {});
    } else if (text === "plans") {
      weEventTrack("landingPage_headerClickPlans", {});
    } else if (text === "explore-workouts") {
      weEventTrack("landingPage_headerExploreWorkouts", {});
    }
  };

  return (
    <>
      <Link
        passHref
        href={finalRef ? `/blog?${finalRef}` : `/blog`}
        className={
          activeLink === "link_2" ? "border-b-2 border-white" : undefined
        }
      >
        <LandingButton
          btnText="Blog"
          onClickJump={() => clickEvent("blog")}
          btnStyle="rounded-lg px-0 py-3 text-white text-base font-popL mb-4 md:mb-0"
        />
      </Link>
      <Link
        passHref
        href={finalRef ? `/explore?${finalRef}` : `/explore`}
        className={
          activeLink === "link_5" ? "border-b-2 border-white" : undefined
        }
      >
        <LandingButton
          btnText="Explore workouts"
          onClickJump={() => clickEvent("explore-workouts")}
          btnStyle="rounded-lg px-0 py-3 text-white text-base font-popL mb-4 md:mb-0"
        />
      </Link>
      <Link
        passHref
        href={finalRef ? `/plans?${finalRef}` : `/plans`}
        className={
          activeLink === "link_3" ? "border-b-2 border-white" : undefined
        }
      >
        <LandingButton
          btnText="Our Plans"
          onClickJump={() => clickEvent("plans")}
          btnStyle="rounded-lg px-0 py-3 text-white text-base font-popL mb-4 md:mb-0"
        />
      </Link>
      <Link
        passHref
        href={finalRef ? `/reviews?${finalRef}` : `/reviews`}
        className={
          activeLink === "link_1" ? "border-b-2 border-white" : undefined
        }
      >
        <LandingButton
          btnText="Reviews"
          onClickJump={() => clickEvent("reviews")}
          btnStyle="rounded-lg px-0 py-3 text-white text-base font-popL mb-4 md:mb-0"
        />
      </Link>

      <Link
        passHref
        href={
          finalRef
            ? `/about/company-details?${finalRef}`
            : "/about/company-details"
        }
        className={
          activeLink === "link_4" ? "border-b-2 border-white" : undefined
        }
      >
        <LandingButton
          btnText="About Us"
          onClickJump={() => clickEvent("about-us")}
          btnStyle="rounded-lg px-0 py-3 text-white text-base font-popL mb-4 md:mb-0"
        />
      </Link>

      {/* {btnAction ? (
        <div className="rounded-full backdrop-blur-lg bg-white">
          <LandingButton
            txtColor="#000"
            btnText={btnText ? btnText : "Get Started"}
            btnStyle="whitespace-nowrap text-xs md:text-sm font-popM rounded-full"
            onClickJump={btnAction}
          />
        </div>
      ) : null} */}
    </>
  );
};

export default AllLinks;
