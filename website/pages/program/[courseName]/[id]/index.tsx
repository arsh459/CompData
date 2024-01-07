import Loading from "@components/loading/Loading";
// import { useNewCast } from "@hooks/cast/useNewCast";
// import { useEffect, useState } from "react";
// import { useRTConnection } from "@hooks/cast/useRTConnection";
import DefaultLayout from "@layouts/DefaultLayout";
import { rectWomenImg } from "@constants/seo";
import { Task } from "@models/Tasks/Task";
import { useAuth } from "@hooks/auth/useAuth";
import UserAuthTemplate from "@templates/UserAuthTemplate";
// import { useUserV2 } from "@hooks/auth/useUserV2";
// import { usePaidStatus } from "@hooks/paidStatus/usePaidStatus";
import { GetStaticPaths, GetStaticProps } from "next";
import VideoPageTemplate from "@modules/VideoPage";

interface Props {
  task?: Task;
  taskId?: string;
}

const Video: React.FC<Props> = ({ task, taskId }) => {
  const {
    authStatus,
    // uid,

    user,
  } = useAuth();
  // const { status } = usePaidStatus(uid);

  // console.log("rtState", rtState);

  //   useEffect(() => {
  //     setheight(window.innerHeight);
  //   }, []);

  // return <Stream cast={cast} screenHeight={height} />;

  return (
    <DefaultLayout
      title={"SocialBoat Fitness Program"}
      description={"Access page for SocialBoat fitness Program"}
      link={`https://socialboat.live/video/${task?.id}`}
      canonical={`https://socialboat.live/video/${task?.id}`}
      img={
        task?.thumbnails
          ? task.thumbnails.url
          : task?.videoThumbnail
          ? task.videoThumbnail.url
          : rectWomenImg
      }
      siteName="SocialBoat"
      noIndex={false}
      rectImg={
        task?.thumbnails
          ? task.thumbnails.url
          : task?.videoThumbnail
          ? task.videoThumbnail.url
          : rectWomenImg
      }
      width={360}
      height={360}
    >
      {authStatus === "FAILED" ? (
        <UserAuthTemplate
          deviceType="android"
          setDeviceType={() => {}}
          // org={query.org}
        />
      ) : // status === "LOADING" ? (
      //   <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
      //     <Loading fill="#ff735c" width={48} height={48} />
      //   </div>
      // )

      // : status === "INACTIVE" ? (
      //   <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
      //     <p className="text-white">
      //       {"You don't have access to this program."}
      //     </p>
      //   </div>
      // ) :

      authStatus === "SUCCESS" && task && user?.uid ? (
        <div className="w-screen h-screen bg-[#100F1A] relative">
          <VideoPageTemplate uid={user?.uid} task={task} />
        </div>
      ) : (
        <div className="fixed inset-0 z-0 bg-[#100F1A] flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default Video;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "home", courseName: "greesha" } },
      // { params: { userKey: "drmonavats" } },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const taskId = params ? params.id : "";

  if (typeof taskId === "string" && taskId) {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const taskDoc = await db.collection("tasks").doc(taskId).get();

    const tkObj = taskDoc.data() as Task;

    return {
      revalidate: 1,
      props: {
        taskId,
        task: tkObj ? tkObj : null,
      },
    };
  }

  return {
    revalidate: 1,
    props: {},
  };
};
