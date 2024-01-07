import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticProps, GetStaticPaths } from "next";
import { UserInterface } from "@models/User/User";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import Reports from "@modules/Bookings/Reports";

interface Props {
  remoteUser: UserInterface | null;
}

const UserProgress: React.FC<Props> = ({ remoteUser }) => {
  const { user, authStatus } = useAuth(undefined);

  return (
    <DefaultLayout
      title={`${remoteUser?.name ? remoteUser?.name : "No name user"}`}
      link={`https://${homeDomain}/admin/u/${remoteUser?.uid}/reports`}
      canonical={`https://${homeDomain}/admin/u/${remoteUser?.uid}/reports`}
      img={boatsSEO.img}
      noIndex={true}
      description="Awards Progress Timeline Example"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && remoteUser ? (
        <div>
          <Reports user={user} />
        </div>
      ) : (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          {authStatus === "FAILED" ||
          (authStatus === "SUCCESS" && user?.role !== "admin")
            ? "Unauthorized access"
            : remoteUser
            ? "Something went wrong"
            : "No such User"}
        </div>
      )}
    </DefaultLayout>
  );
};

export default UserProgress;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { uid: "ARXMOu9F3dRiPDYm2ZmTeesDRV13" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = params ? params.uid : "";

  if (uid && typeof uid === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const profileLeader = await db.collection("users").doc(uid).get();

    if (profileLeader.exists) {
      const leaderObj = profileLeader.data() as UserInterface;
      return {
        revalidate: 1,
        props: {
          remoteUser: leaderObj,
        },
      };
    }
  }

  return {
    revalidate: 1,
    props: {
      remoteUser: null,
    },
  };
};
