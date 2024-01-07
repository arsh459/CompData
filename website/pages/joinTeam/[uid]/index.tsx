import { rectWomenImg, womenImg } from "@constants/seo";
import DefaultLayout from "@layouts/DefaultLayout";
import { Testimonial } from "@models/Testimonial/interface";
import { UserInterface } from "@models/User/User";
import WomenTemplate2 from "@templates/WomenTemplate/WomenTemplate2";
import { getPriorityTestimonialsOnServerSide } from "@utils/testimonials";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  testimonials: Testimonial[];
  videoTestimonials: Testimonial[];
  user?: UserInterface;
}

const JoinSuperWomen: React.FC<Props> = ({
  testimonials,
  videoTestimonials,
  user,
}) => {
  // console.log("t", testimonials);
  return (
    <DefaultLayout
      title={
        user?.name
          ? `${user.name}: SocialBoat for Women`
          : "SocialBoat for Women"
      }
      description="Health Transformation App for women with fitness programs for PCOS weight gain, Post pregnancy mobility and general women wellbeing."
      link={`https://socialboat.live/joinTeam/${user?.uid}`}
      noIndex={false}
      siteName="SocialBoat"
      canonical={`https://socialboat.live/joinTeam/${user?.uid}`}
      img={womenImg}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      <WomenTemplate2
        testimonials={testimonials}
        videoTestimonials={videoTestimonials}
        user={user}
      />
    </DefaultLayout>
  );
};

export default JoinSuperWomen;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { uid: "abc" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { testimonials, videoTestimonials } =
    await getPriorityTestimonialsOnServerSide();

  const uid = params ? params.uid : "";
  if (uid && typeof uid === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const userDocs = await db.collection("users").doc(uid).get();

    let user: UserInterface | undefined = undefined;
    // if (userDocs.docs.length) {
    user = userDocs.data() as UserInterface;
    // }

    // const user = (await db.collection("users").doc(userId).get()).data() as
    //   | UserInterface
    //   | undefined;

    if (user)
      return {
        revalidate: true,
        props: {
          testimonials,
          videoTestimonials,
          user,
        },
      };
  }

  return {
    revalidate: true,
    props: {
      testimonials,
      videoTestimonials,
      user: null,
    },
  };
};
