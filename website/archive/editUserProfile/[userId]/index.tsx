import DefaultLayout from "@layouts/DefaultLayout";
// import { joinSEO } from "@constants/seo";
import { useUserSEOData } from "@hooks/event/useUserSEOData";

import { GetStaticPaths, GetStaticProps } from "next";
// import { EventInterface } from "@models/Event/Event";
// import JoinBoatTemplate from "@templates/joinBoatTemplate/JoinBoatTemplate";
import { UserInterface } from "@models/User/User";
import EditUserProfileTemplate from "@templates/EditUserProfile/EditUserProfile";

interface Props {
  user: UserInterface | null;
}

const EditUserProfile: React.FC<Props> = ({ user }) => {
  const { title, desc, img, site_name, favIcon } = useUserSEOData(user);

  // console.log("event", eventToJoin, leader);
  return (
    <DefaultLayout
      favIcon={favIcon}
      siteName={site_name}
      title={title}
      description={desc}
      link={`https://socialboat.live/editUserProfile/${user ? user.uid : ""}`}
      canonical={`https://socialboat.live/editUserProfile/${
        user ? user.uid : ""
      }`}
      noIndex={true}
      img={img}
    >
      {user ? <EditUserProfileTemplate leader={user} /> : null}
    </DefaultLayout>
  );
};

export default EditUserProfile;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const host = params ? params.userId : "";

  // console.log("hist", host);

  try {
    if (host && typeof host === "string") {
      const firebase = (await import("@config/adminFire")).default;
      const db = firebase.firestore();

      const user = await db.collection("users").doc(host).get();

      if (user.exists) {
        return {
          revalidate: 1,
          props: {
            user: user.data() as UserInterface,
          },
        };
      }
    }

    return {
      revalidate: 1,
      props: {
        user: null,
      },
    };
  } catch (error) {
    console.log("error", error);
  }

  return {
    revalidate: 1,
    props: {
      user: null,
    },
  };
};
