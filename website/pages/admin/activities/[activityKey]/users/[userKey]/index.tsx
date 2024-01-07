import React from "react";

//local
import { GetStaticProps, GetStaticPaths } from "next";

import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { EventInterface } from "@models/Event/Event";
import { useAuth } from "@hooks/auth/useAuth";
import { UserInterface } from "@models/User/User";
import UserActivityDashboardTemplate from "@templates/admin/UserActivityDashboardTemplate";

interface Props {
  parentEvent?: EventInterface;
  userObj?: UserInterface;
}

const UserActivityDashboard: React.FC<Props> = ({ parentEvent, userObj }) => {
  const { user, loadComplete, authStatus } = useAuth();
  //   console.log("userObj", userObj);

  return (
    <DefaultLayout
      title={`${userObj?.name ? userObj?.name : "No name user"}`}
      link={`https://${homeDomain}/admin/activities/`}
      canonical={`https://${homeDomain}/admin/activities`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {user?.uid &&
      user.role === "admin" &&
      loadComplete &&
      parentEvent &&
      userObj ? (
        <UserActivityDashboardTemplate
          parentEvent={parentEvent}
          inspectingUser={userObj}
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

export default UserActivityDashboard;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          activityKey: "c0897a45-bf7f-4a93-99df-ae3dd612924d",
          userKey: "socialboat",
        },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const parentKey = params ? params.activityKey : "";
  const userKey = params ? params.userKey : "";

  //   console.log("parentKey", userKey);

  if (
    parentKey &&
    typeof parentKey === "string" &&
    userKey &&
    typeof userKey === "string"
  ) {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const parentEventDoc = await db.collection("sbEvents").doc(parentKey).get();

    if (parentEventDoc.exists) {
      const parentEvent = parentEventDoc.data() as EventInterface;

      const userObj = await db.collection("users").doc(userKey).get();

      if (userObj.exists) {
        return {
          revalidate: 1,
          props: {
            parentEvent,
            userObj: userObj.data() as UserInterface,
          },
        };
      }
    }
  }

  // console.log("returnLeaders", returnLeaders);

  return {
    revalidate: 1,
    props: {
      //   userRanks: [],
    },
  };
};
