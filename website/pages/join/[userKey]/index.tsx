import { rectWomenImg } from "@constants/seo";
import { seoData } from "@constants/seoData";
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
      title={seoData.joinInvitedByPage.title}
      description={`You've been invited by ${user?.name} for a health and fitness journey`}
      link={`https://socialboat.live/join/${user?.userKey}`}
      noIndex={false}
      siteName="SocialBoat"
      canonical={`https://socialboat.live/join/${user?.userKey}`}
      img={seoData.joinInvitedByPage.img}
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
    paths: [{ params: { userKey: "abc" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { testimonials, videoTestimonials } =
    await getPriorityTestimonialsOnServerSide();

  const userKey = params ? params.userKey : "";
  if (userKey && typeof userKey === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const userDocs = await db
      .collection("users")
      .where("userKey", "==", userKey)
      .get();

    let user: UserInterface | undefined = undefined;
    if (userDocs.docs.length) {
      user = userDocs.docs[0].data() as UserInterface;
    } else {
      const userDocs2 = await db
        .collection("users")
        .where("userKey", "==", userKey.toLowerCase())
        .get();

      if (userDocs2.docs.length) {
        user = userDocs2.docs[0].data() as UserInterface;
      }
    }

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
