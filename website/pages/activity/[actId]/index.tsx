import Loading from "@components/loading/Loading";
import { rectWomenImg, womenImg } from "@constants/seoData";
import { useAuth } from "@hooks/auth/useAuth";
import { usePaidStatus } from "@hooks/paidStatus/usePaidStatus";
import DefaultLayout from "@layouts/DefaultLayout";
import { Task } from "@models/Tasks/Task";
import AccessModal from "@modules/AccessModal/AccessModal";
import ActivityTaskHome from "@modules/ActivityTaskHome";
import UserAuthTemplate from "@templates/UserAuthTemplate";
import { GetStaticPaths, GetStaticProps } from "next";
interface Props {
  task?: Task;
}

const ProgramActivityHome: React.FC<Props> = ({ task }) => {
  const { authStatus, signOut, user, uid } = useAuth();
  const { status } = usePaidStatus(uid);
  console.log({ task }, "taskFrom ProgramActivityTask");

  let smPreview = womenImg;

  return (
    <DefaultLayout
      title={`SocialBoat: ${task?.name}`}
      description={`SocialBoat: ${
        task?.name ? task.name : "Access to the program"
      }`}
      link={`https://socialboat.live/activity/${task?.id}`}
      canonical={`https://socialboat.live/activity/${task?.id}`}
      img={smPreview}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {status === "INACTIVE" && authStatus === "SUCCESS" ? (
        <AccessModal signOut={signOut} />
      ) : authStatus === "FAILED" ? (
        <UserAuthTemplate
          deviceType="android"
          setDeviceType={() => {}}
          // org={query.org}
        />
      ) : authStatus === "SUCCESS" && task && user?.uid ? (
        <ActivityTaskHome task={task} user={user} />
      ) : (
        <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default ProgramActivityHome;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          actId: "id",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const actId = params ? params.actId : "";

  if (actId && typeof actId === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const taskObj = await db.collection("tasks").doc(actId).get();

    const result = taskObj.data() as Task;

    if (result)
      return {
        revalidate: 1,
        props: {
          task: result,
        },
      };
  }

  return {
    revalidate: 1,
    props: {
      task: {},
    },
  };
};
