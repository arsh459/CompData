import { rectWomenImg } from "@constants/seoData";
import DefaultLayout from "@layouts/DefaultLayout";
import { Task } from "@models/Tasks/Task";
import ReelTemplate from "@modules/Recipe/ReelTemplate";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  remoteTask: Task | null;
}
const Reel: React.FC<Props> = ({ remoteTask }) => {
  return (
    <DefaultLayout
      title={
        remoteTask?.name
          ? remoteTask?.name
          : "Tips & Workouts for PCOS on SocialBoat"
      }
      description={
        remoteTask?.description
          ? remoteTask?.description
          : "Discover 750+ workouts & tips on Socialboat that can help you regularise your cycle and lose weight."
      }
      img={
        remoteTask?.reelThumbnail?.url
          ? remoteTask?.reelThumbnail?.url
          : rectWomenImg
      }
      link={`https://socialboat.live/reel/${remoteTask?.id}`}
      canonical={`https://socialboat.live/reel/${remoteTask?.id}`}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {remoteTask ? <ReelTemplate task={remoteTask} isReel={true} /> : null}
    </DefaultLayout>
  );
};

export default Reel;

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
