import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import UserSearch from "@modules/Bookings/UserSearch";

interface Props {
  //   remoteUser: UserInterface | null;
}

const UserTimeline: React.FC<Props> = ({}) => {
  const { user, authStatus } = useAuth(undefined);

  //   console.log("remo", remoteUser?.uid);

  return (
    <DefaultLayout
      title={`User search page`}
      link={`https://${homeDomain}/admin/u`}
      canonical={`https://${homeDomain}/admin/u`}
      img={boatsSEO.img}
      noIndex={true}
      description="User Timeline Example"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" ? (
        <div>
          <UserSearch baseRoute="/admin/u" />
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

export default UserTimeline;
