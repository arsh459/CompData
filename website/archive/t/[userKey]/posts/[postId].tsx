import DefaultLayout from "@layouts/DefaultLayout";
// import { playSEO } from "@constants/seo";
import { GetStaticProps, GetStaticPaths } from "next";
// import WorkoutV2Template from "@modules/WorkoutsV2/WorkoutV2Template";
// import { UserInterface } from "@models/User/User";
// import { EventInterface } from "@models/Event/Event";
import { useUserSEOData } from "@hooks/event/useUserSEOData";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";

interface Props {
  leader?: LeaderBoard | null;
  //   selectedEvent?: EventInterface | null;
  //   parentEvent?: EventInterface | null;
  postId: string;
}

const UserPostPage: React.FC<Props> = ({
  leader,
  //   selectedEvent,
  //   parentEvent,
  postId,
}) => {
  const { title, desc, img } = useUserSEOData(leader);

  //   return <div></div>;
  return (
    <DefaultLayout
      title={title}
      description={desc}
      noIndex={false}
      img={img}
      siteName={"SocialBoat"}
      link={`https://socialboat.live/${leader?.userKey}/posts/${postId}`}
      canonical={`https://socialboat.live/${leader?.userKey}/posts/${postId}`}
    >
      <p>{postId}</p>
    </DefaultLayout>
  );
};

export default UserPostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          postId: "abc",
          userKey: "rahul2992",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postId = params ? params.postId : "";
  const userKey = params ? params.userKey : "";

  if (userKey && typeof userKey === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const userDocs = await db
      .collection("leaderBoard")
      .where("userKey", "==", userKey)
      .get();

    if (userDocs.docs.length > 0 && userDocs.docs[0].exists) {
      const leaderObj = userDocs.docs[0].data() as LeaderBoard;

      return {
        revalidate: 1,
        props: {
          postId: postId ? postId : "",
          leader: leaderObj,
        },
      };
    }
  }

  return {
    revalidate: 1,
    props: {
      postId: postId ? postId : "",
      leader: null,
    },
  };
};
