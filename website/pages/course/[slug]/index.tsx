import {
  greeshaCourse,
  homeDomain,
  rectWomenImg,
  swatiCourse,
  womenImg,
} from "@constants/seoData";
import DefaultLayout from "@layouts/DefaultLayout";
import { Badge, CourseReview } from "@models/Prizes/PrizeV2";
import { Task } from "@models/Tasks/Task";
import { UserInterface } from "@models/User/User";
import CourseTemplate from "@templates/CourseTemplate";
import { FAQDATA } from "@templates/joinBoatTemplate/utils";
import PageNotFound from "@templates/PageNotFound";
import { getCourseData } from "@utils/badge";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import LoadingModal from "@components/loading/LoadingModal";
import { useEffect } from "react";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  slug: string;
  badge?: Badge;
  otherAuthors?: UserInterface[];
  primaryCoach?: UserInterface;
  badgeReview?: CourseReview[];
  courseFAQ?: FAQDATA[];
  dayZeroTasks?: Task[];
}

const Course: React.FC<Props> = ({
  slug,
  badge,
  dayZeroTasks,
  primaryCoach,
  badgeReview,
  courseFAQ,
}) => {
  useEffect(() => {
    slug && weEventTrack(`visitCourse_${slug}`, {});
  }, [slug]);

  const { isFallback } = useRouter();
  if (isFallback) {
    return (
      <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
        <LoadingModal fill="#FF4266" width={100} height={100} fixed={true} />
      </div>
    );
  }

  let smPreview = womenImg;
  if (slug === "greesha") {
    smPreview = greeshaCourse;
  } else if (slug === "yogwithswati") {
    smPreview = swatiCourse;
  }
  // console.log(
  //   "ba",
  //   badge?.name,
  //   dayZeroTasks?.length,
  //   slug,
  //   primaryCoach?.name,
  //   badgeReview?.length,
  //   courseFAQ?.length
  // );
  // console.log("pr", primaryCoach?.name);
  return (
    <DefaultLayout
      title={badge?.name ? badge?.name : "SocialBoat: A course to treat PCOS"}
      description={
        badge?.courseGoal
          ? badge.courseGoal
          : "Treat PCOS PCOD at home with an expert on SocialBoat"
      }
      link={`https://${homeDomain}/course/${slug}`}
      canonical={`https://${homeDomain}/course/${slug}`}
      img={smPreview}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {badge ? (
        <CourseTemplate
          badge={badge}
          dayZeroTasks={dayZeroTasks}
          primaryCoach={primaryCoach}
          badgeReview={badgeReview}
          courseFAQ={courseFAQ}
        />
      ) : (
        <PageNotFound />
      )}
    </DefaultLayout>
  );
};

export default Course;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: "greesha",
        },
      },
      {
        params: {
          slug: "bufitness",
        },
      },
      {
        params: {
          slug: "aarjabedi",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params && typeof params.slug === "string" ? params.slug : "";

  const {
    badge,
    otherAuthors,
    primaryCoach,
    badgeReview,
    courseFAQ,
    dayZeroTasks,
  } = await getCourseData(slug);

  if (badge) {
    return {
      revalidate: 1,
      props: {
        slug,
        badge,
        badgeReview,
        courseFAQ,
        dayZeroTasks,

        otherAuthors,
        ...(primaryCoach ? { primaryCoach } : {}),
      },
    };
  }

  return {
    revalidate: 1,
    props: {
      slug,
    },
  };
};
