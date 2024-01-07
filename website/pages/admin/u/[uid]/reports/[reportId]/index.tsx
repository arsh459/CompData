import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticProps, GetStaticPaths } from "next";
import { UserInterface } from "@models/User/User";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import AddNewAwardReport from "@modules/Bookings/AddNewAwardReport";

interface Props {
  remoteUser: UserInterface | null;
  reportId: string;
}

const UserReportTimeline: React.FC<Props> = ({ remoteUser, reportId }) => {
  const { user, authStatus } = useAuth(undefined);

  return (
    <DefaultLayout
      title={`${remoteUser?.name ? remoteUser?.name : "No name user"}`}
      link={`https://${homeDomain}/admin/u/${remoteUser?.uid}/reports/${reportId}`}
      canonical={`https://${homeDomain}/admin/u/${remoteUser?.uid}/reports/${reportId}`}
      img={boatsSEO.img}
      noIndex={true}
      description="User Report Timeline Example"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && remoteUser ? (
        <div>
          <AddNewAwardReport user={remoteUser} reportId={reportId} />
        </div>
      ) : (
        //
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

export default UserReportTimeline;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { uid: "abc", reportId: "def" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = params ? params.uid : "";
  const reportId =
    params && params.reportId && typeof params.reportId === "string"
      ? params.reportId
      : "";

  if (uid && typeof uid === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const user = await db.collection("users").doc(uid).get();

    if (user.exists) {
      const leaderObj = user.data() as UserInterface;

      return {
        revalidate: 1,
        props: {
          remoteUser: leaderObj,
          reportId,
        },
      };
    }
  }

  return {
    revalidate: 1,
    props: {
      remoteUser: null,
      reportId,
    },
  };
};
