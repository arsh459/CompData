import React from "react";

//local
import { GetStaticProps } from "next";
import UsersTemplate from "@templates/admin/UsersTemplate";
import { UserInterface } from "@models/User/User";

import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";

interface Props {
  leaders: UserInterface[];
}

const UsersPage: React.FC<Props> = ({ leaders }) => {
  const { user, authStatus } = useAuth();
  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/users`}
      canonical={`https://${homeDomain}/admin/users`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" ? (
        <div>
          <UsersTemplate leaders={leaders} />
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

export default UsersPage;

export const getStaticProps: GetStaticProps = async ({}) => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const allLeaders = await db
    .collection("users")
    .where("socialBoat", "==", true)
    .get();

  const returnLeaders: UserInterface[] = [];
  for (const leader of allLeaders.docs) {
    const tmpLeader = leader.data() as UserInterface;

    returnLeaders.push(tmpLeader);
  }

  // console.log("returnLeaders", returnLeaders);

  return {
    revalidate: 1,
    props: {
      leaders: returnLeaders,
    },
  };
};
