import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticProps, GetStaticPaths } from "next";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import UserDetail from "@modules/Bookings/UserDetail";
import { useUserV2 } from "@hooks/auth/useUserV2";

interface Props {
  uid: string;
}

const UserTimeline: React.FC<Props> = ({ uid }) => {
  const { user, authStatus } = useAuth(undefined);

  const remoteUserAcc = useUserV2(uid);
  const remoteUser = remoteUserAcc.user;

  // console.log("remo", remoteUser?.uid);

  return (
    <DefaultLayout
      title={`${remoteUser?.name ? remoteUser?.name : "No name user"}`}
      link={`https://${homeDomain}/admin/u/${remoteUser?.uid}`}
      canonical={`https://${homeDomain}/admin/u/${remoteUser?.uid}`}
      img={boatsSEO.img}
      noIndex={true}
      description="User Timeline Example"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && remoteUser ? (
        <div>
          <UserDetail user={remoteUser} showSlotLink={true} />
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

export default UserTimeline;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { uid: "ARXMOu9F3dRiPDYm2ZmTeesDRV13" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = params ? params.uid : "";
  // console.log("host", host);

  return {
    revalidate: 1,
    props: {
      uid: uid,
    },
  };
};
