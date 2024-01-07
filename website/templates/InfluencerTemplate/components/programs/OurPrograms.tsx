import ProgramCard from "./ProgramCard";
import ProgramHeading from "./ProgramHeading";
export interface ProgramDetails {
  iconUrl: string;
  title: string;
}
export interface ProgramInstructorDetail {
  description: string;
  successStories: string;
}
export interface ProgramInterface {
  img: string;
  programTitle: string;
  instructorDetails: ProgramInstructorDetail;
  programDetails: ProgramDetails[];
  courseDescriptionTitle: string;
  coursePricePerMonth: string;
  backgroundGradient: string;
  slug: string;
}
const ProgramArray: ProgramInterface[] = [
  {
    img: "https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/Frame%201000001135_R4WS2O5Oq.png?updatedAt=1699002961442",
    programTitle: "PCOS Care with LIVE Yoga classes",
    instructorDetails: {
      description: "Yoga and pilates expert",
      successStories: "200+ success stories",
    },
    slug: "yogwithswati",
    programDetails: [
      {
        iconUrl:
          "https://ik.imagekit.io/socialboat/tr:h-20,c-maintain_ratio,fo-auto/Union_JT0SYb8Jm.png?updatedAt=1699003880331",
        title: "Live Yoga Classes",
      },
      {
        iconUrl:
          "https://ik.imagekit.io/socialboat/tr:h-20,c-maintain_ratio,fo-auto/Vector_8X5prBKNL.png?updatedAt=1699003844109",
        title: "Weekly diet plan",
      },
      {
        iconUrl:
          "https://ik.imagekit.io/socialboat/tr:h-20,c-maintain_ratio,fo-auto/Frame%201000001136_aDFnX0xAkb.png?updatedAt=1699003982343",
        title: "Gynaec consultations",
      },
    ],
    courseDescriptionTitle: "Know About the Course",
    coursePricePerMonth: "1500",
    backgroundGradient:
      "linear-gradient(181deg, rgba(112, 169, 255, 0.00) 0.41%, rgba(92, 255, 226, 0.70) 99.54%)",
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:h-500,c-maintain_ratio,fo-auto/Frame%201000001136%20(1)_yWeFP_KdG.png?updatedAt=1699022234926",
    programTitle: "Weightloss program with HIIT & diet",
    instructorDetails: {
      description: "ACE Certified trainer",
      successStories: "400+ success stories",
    },
    slug: "15minworkout",
    programDetails: [
      {
        iconUrl:
          "https://ik.imagekit.io/socialboat/tr:h-20,c-maintain_ratio,fo-auto/Union_JT0SYb8Jm.png?updatedAt=1699003880331",
        title: "Daily workout videos",
      },
      {
        iconUrl:
          "https://ik.imagekit.io/socialboat/tr:h-20,c-maintain_ratio,fo-auto/Vector_8X5prBKNL.png?updatedAt=1699003844109",
        title: "Weekly diet plan",
      },

      {
        iconUrl:
          "https://ik.imagekit.io/socialboat/tr:h-20,c-maintain_ratio,fo-auto/Frame%201000001136_aDFnX0xAkb.png?updatedAt=1699003982343",
        title: "Gynaec consultations",
      },
    ],
    courseDescriptionTitle: "Know About the Course",
    coursePricePerMonth: "750",
    backgroundGradient:
      "linear-gradient(181deg, rgba(112, 123, 255, 0.00) 0.41%, rgba(92, 128, 255, 0.70) 99.54%)",
  },
  {
    img: "https://ik.imagekit.io/socialboat/tr:h-400,c-maintain_ratio,fo-auto/Frame%201000001137_ZEqi9EG5F.png?updatedAt=1699022325407",
    programTitle: "PCOS Care Course by Greesha",
    instructorDetails: {
      description: "Menstrual wellness expert",
      successStories: "400+ success stories",
    },
    slug: "greesha",
    programDetails: [
      {
        iconUrl:
          "https://ik.imagekit.io/socialboat/tr:h-20,c-maintain_ratio,fo-auto/Union_JT0SYb8Jm.png?updatedAt=1699003880331",
        title: "Dailt 60 minute Yoga (Videos)",
      },
      {
        iconUrl:
          "https://ik.imagekit.io/socialboat/tr:h-20,c-maintain_ratio,fo-auto/Vector_8X5prBKNL.png?updatedAt=1699003844109",
        title: "Weekly diet plan",
      },
      {
        iconUrl:
          "https://ik.imagekit.io/socialboat/tr:h-20,c-maintain_ratio,fo-auto/Frame%201000001136_aDFnX0xAkb.png?updatedAt=1699003982343",
        title: "Gynaec consultations",
      },
    ],
    courseDescriptionTitle: "Know About the Course",
    coursePricePerMonth: "750",
    backgroundGradient:
      "linear-gradient(181deg, rgba(112, 123, 255, 0.00) 0.41%, rgba(203, 92, 255, 0.70) 99.54%)",
  },
];

interface Props {
  coachUID: string;
  heading?: string;
}

const OurPrograms: React.FC<Props> = ({ coachUID, heading }) => {
  // const media = undefined;
  return (
    <div className="w-screen h-full max-w-screen-xl mx-auto flex flex-col relative z-0 px-5 mb-14">
      <ProgramHeading title={heading || "Our Programs"} />

      <div className="flex-1 py-16  grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {ProgramArray.map((each, index) => {
          return <ProgramCard key={index} each={each} coachUID={coachUID} />;
        })}
      </div>
    </div>
  );
};

export default OurPrograms;
