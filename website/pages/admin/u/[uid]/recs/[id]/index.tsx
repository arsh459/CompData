import React from "react";

//local
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
import { UserInterface } from "@models/User/User";
import DateEditorDash from "@templates/Recommendations/DateEditor";
import { useRouter } from "next/router";

interface Props {
  remoteUser?: UserInterface;
  id: string;
}

const RecommendationPage: React.FC<Props> = ({ remoteUser, id }) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();
  const router = useRouter();
  const q = router.query as { type?: "workout" | "nutrition" };

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/u/${remoteUser?.uid}/recs/${id}`}
      canonical={`https://${homeDomain}/admin/u/${remoteUser?.uid}/recs/${id}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && remoteUser && id ? (
        <div>
          <DateEditorDash
            user={remoteUser}
            id={id}
            type={q.type ? q.type : "workout"}
          />
        </div>
      ) : (
        //
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          {authStatus === "FAILED" ||
          (authStatus === "SUCCESS" && user?.role !== "admin")
            ? "Unauthorized access"
            : "Something went wrong"}
        </div>
      )}
    </DefaultLayout>
  );
};

export default RecommendationPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { uid: "ARXMOu9F3dRiPDYm2ZmTeesDRV13", id: "abc" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = params ? params.uid : "";
  const id = params ? params.id : "";
  //   console.log("host", uid);

  if (uid && typeof uid === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const profileLeader = await db.collection("users").doc(uid).get();

    // console.log("profileLeader", profileLeader.docs[0].data());

    if (profileLeader.exists) {
      const leaderObj = profileLeader.data() as UserInterface;

      // const allEvents = await getUserEvents(db, leaderObj.uid);

      // const allEventCohorts: {
      // [eId: string]: { [cohortId: string]: Cohort };
      // } = {};
      return {
        revalidate: 1,
        props: {
          remoteUser: leaderObj,
          id,
        },
      };
    }
  }

  return {
    revalidate: 1,
    props: {
      remoteUser: null,
      id: "",
    },
  };
};
