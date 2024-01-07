import DefaultLayout from "@layouts/DefaultLayout";
import { homeSEO } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
import LoadingModal from "@components/loading/LoadingModal";
import { UserInterface } from "@models/User/User";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  userKey: string;
}

const TeamPage: React.FC<Props> = ({ userKey }) => {
  // console.log("q", query);

  const router = useRouter();

  useEffect(() => {
    if (userKey === "home") {
      router.push("/");
    }
  }, [userKey, router]);

  return (
    <DefaultLayout
      title={"SocialBoat - Your fitness team"}
      description={"Fitness app for your community"}
      link={`https://socialboat.live/sbUser/team`}
      canonical={`https://socialboat.live/sbUser/team`}
      noIndex={false}
      img={homeSEO.img}
    >
      <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
        <LoadingModal fill="#FF4266" width={100} height={100} fixed={true} />
      </div>
    </DefaultLayout>
  );
};

export default TeamPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { userKey: "home", eventKey: "event" } }],
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
