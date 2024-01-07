import React from "react";

//local
import { GetStaticProps, GetStaticPaths } from "next";
// import UsersTemplate from "@templates/admin/UsersTemplate";
// import { UserInterface } from "@models/User/User";

import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { EventInterface } from "@models/Event/Event";
import { useAuth } from "@hooks/auth/useAuth";
import { UserRank } from "@models/Activities/Activity";
import ActivityDashboardTemplate from "@templates/admin/ActivityDashboard";

interface Props {
  parentEvent?: EventInterface;
  userRanks: UserRank[];
}

const ActivityDashboard: React.FC<Props> = ({ parentEvent, userRanks }) => {
  //   console.log("parentEvent", parentEvent);
  const { user, loadComplete, authStatus } = useAuth();
  // console.log("user", user?.role);
  // console.log("parentEvent", parentEvent);

  return (
    <DefaultLayout
      title="Admin dashboard"
      link={`https://${homeDomain}/admin/activities/`}
      canonical={`https://${homeDomain}/admin/activities`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {user?.uid && user.role === "admin" && loadComplete && parentEvent ? (
        <ActivityDashboardTemplate
          parentEvent={parentEvent}
          userRanks={userRanks}
        />
      ) : loadComplete && authStatus === "FAILED" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Unauthorized access
        </div>
      ) : null}
      {/* <UsersTemplate leaders={leaders} /> */}
    </DefaultLayout>
  );
};

export default ActivityDashboard;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { activityKey: "c0897a45-bf7f-4a93-99df-ae3dd612924d" } },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const parentKey = params ? params.activityKey : "";

  console.log("parentKey", parentKey);

  if (parentKey && typeof parentKey === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const parentEventDoc = await db.collection("sbEvents").doc(parentKey).get();

    if (parentEventDoc.exists) {
      const parentEvent = parentEventDoc.data() as EventInterface;

      const userRanks = await db
        .collection("sbEvents")
        .doc(parentEvent.id)
        .collection("userRanks")
        .get();

      const remoteRanks: UserRank[] = [];
      for (const userRank of userRanks.docs) {
        remoteRanks.push(userRank.data() as UserRank);
      }

      if (!parentEvent.parentId) {
        return {
          revalidate: 1,
          props: {
            parentEvent,
            userRanks: remoteRanks,
          },
        };
      }
    }
  }

  // console.log("returnLeaders", returnLeaders);

  return {
    revalidate: 1,
    props: {
      userRanks: [],
    },
  };
};
