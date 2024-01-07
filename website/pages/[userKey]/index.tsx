import DefaultLayout from "@layouts/DefaultLayout";
import { homeSEO } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
import LoadingModal from "@components/loading/LoadingModal";
import { UserInterface } from "@models/User/User";
import { useEffect } from "react";
import { useRouter } from "next/router";
import InfluencerTemplate from "@templates/InfluencerTemplate";
import { getBadgesServerSide } from "@utils/badges";
import { Badge } from "@models/Prizes/PrizeV2";

interface Props {
  userKey?: string;
  user?: UserInterface;
  // testimonials?: Testimonial[];
  badges?: Badge[];
}

const UserPage: React.FC<Props> = ({ userKey, user, badges }) => {
  const router = useRouter();

  useEffect(() => {
    if (userKey === "home") {
      router.push("/");
    }
  }, [userKey, router]);

  return (
    <DefaultLayout
      title={`${user?.name}: Fitness Programs on SocialBoat`}
      description={
        user?.landingContent?.subtitle
          ? user.landingContent?.subtitle
          : `Treat PCOD/PCOS with fitness programs curated by ${user?.name}`
      }
      link={`https://socialboat.live/${userKey}`}
      canonical={`https://socialboat.live/${userKey}`}
      noIndex={false}
      img={homeSEO.img}
    >
      {user && badges ? (
        <InfluencerTemplate
          influencer={user}
          // testimonials={testimonials}
          badges={badges}
        />
      ) : (
        <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
          <LoadingModal fill="#FF4266" width={100} height={100} fixed={true} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default UserPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { userKey: "home" } },
      // { params: { userKey: "drmonavats" } },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const userKey = params ? params.userKey : "";

  if (userKey === "home") {
    return {
      props: {
        userKey: "home",
      },
    };
  }

  if (userKey && typeof userKey === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const profileLeader = await db
      .collection("users")
      .where("userKey", "==", userKey)
      .get();

    if (profileLeader.docs.length) {
      const usr = profileLeader.docs[0].data() as UserInterface;

      if (
        usr.landingContent &&
        usr.landingContent.heading &&
        usr.landingContent.subtitle
      ) {
        // const { testimonials } = await getPriorityTestimonialsOnServerSide();
        const { badges } = await getBadgesServerSide();
        return {
          revalidate: 1,
          props: {
            user: usr,
            // testimonials,
            badges,
            userKey,
          },
        };
      }
      return {
        redirect: {
          destination: `/joinTeam/${usr.uid}`,
          permanent: false,
        },
      };
    }
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
      // statusCode: 301
    },
  };
};
