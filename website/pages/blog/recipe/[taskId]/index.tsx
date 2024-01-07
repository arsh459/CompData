import { rectWomenImg } from "@constants/seoData";
import DefaultLayout from "@layouts/DefaultLayout";
import { Task } from "@models/Tasks/Task";
import RecipeTemplate from "@modules/Recipe/RecipeTemplate";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  remoteTask: Task | null;
}
const Recipe: React.FC<Props> = ({ remoteTask }) => {
  return (
    <DefaultLayout
      title={
        remoteTask?.name
          ? remoteTask?.name
          : "Healthy Recipes for PCOS on SocialBoat"
      }
      description={
        remoteTask?.description
          ? remoteTask?.description
          : "Discover 500+ healthy recipes on Socialboat that can help you regularise your cycle and lose weight."
      }
      img={
        remoteTask?.reelThumbnail?.url
          ? remoteTask?.reelThumbnail?.url
          : rectWomenImg
      }
      link={`https://socialboat.live/blog/recipe/${remoteTask?.id}`}
      canonical={`https://socialboat.live/blog/recipe/${remoteTask?.id}`}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {remoteTask ? <RecipeTemplate task={remoteTask} isReel={false} /> : null}
    </DefaultLayout>
  );
};

export default Recipe;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { taskId: "ARXMOu9F3dRiPDYm2ZmTeesDRV13" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const taskId = params ? params.taskId : "";

  if (taskId && typeof taskId === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const profileLeader = await db.collection("tasks").doc(taskId).get();

    if (profileLeader.exists) {
      const leaderObj = profileLeader.data() as Task;

      return {
        revalidate: 1,
        props: {
          remoteTask: leaderObj,
        },
      };
    }
  }

  return {
    revalidate: 1,
    props: {
      remoteTask: null,
    },
  };
};
