import { teamnames, teams } from "@constants/teams";
import DefaultLayout from "@layouts/DefaultLayout";
import { Testimonial } from "@models/Testimonial/interface";
import TeamsTemplate from "@templates/TeamsTemplate";
import { getPriorityTestimonialsOnServerSide } from "@utils/testimonials";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

interface Props {
  teamname: teamnames;
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
}

const JoinGoMMT: React.FC<Props> = ({
  teamname,
  testimonials,
  videoTestimonials,
}) => {
  const teamObj = teams[teamname];

  return teamObj ? (
    <DefaultLayout
      title={
        teamObj.seo?.title ? teamObj.seo.title : `Join my fitness challenge`
      }
      description={
        teamObj.seo?.description
          ? teamObj.seo.description
          : "Join my team this new year to achieve your fitness goals."
      }
      link={`https://socialboat.live/${teamObj.teamname}`}
      noIndex={false}
      siteName="SocialBoat"
      canonical={`https://socialboat.live/${teamObj.teamname}`}
      img={
        teamObj.seo?.img
          ? teamObj.seo.img
          : "https://ik.imagekit.io/socialboat/women_website_page_97_4VciXLBKv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672303772864"
      }
      rectImg={
        teamObj.seo?.rectImg
          ? teamObj.seo.rectImg
          : "https://ik.imagekit.io/socialboat/women_website_page_97_4VciXLBKv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672303772864"
      }
      width={360}
      height={360}
    >
      <TeamsTemplate
        teamObj={teamObj}
        testimonials={testimonials}
        videoTestimonials={videoTestimonials}
      />
    </DefaultLayout>
  ) : (
    <div className="w-screen h-screen bg-[#100F1A] flex flex-col justify-center items-center text-white">
      <h1 className="text-[66px] md:text-[82px] leading-[70px] md:leading-[85px] font-bold">
        404
      </h1>
      <h3 className="text-base md:text-xl my-8">Page Not Found</h3>
      <Link legacyBehavior passHref href="/">
        <a className="text-[#FF4266] text-base md:text-xl underline">Home</a>
      </Link>
    </div>
  );
};

export default JoinGoMMT;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { teamname: "teamname" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const teamname = params ? params.teamname : "";
  const { testimonials, videoTestimonials } =
    await getPriorityTestimonialsOnServerSide();

  // console.log("ream", teamname);

  return {
    revalidate: true,
    props: {
      teamname: teamname,
      testimonials,
      videoTestimonials,
    },
  };
};
