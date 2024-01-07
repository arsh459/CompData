import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
// import { GetStaticPaths, GetStaticProps } from "next";
// import EditVoucher from "@modules/EditVoucher/EditVoucher";
import VouchersList from "@templates/SbRewardsTemplate/VouchersList";
// import GameBadges from "@templates/AdminGames/GameBadges";

interface Props {}

const VouchersListPage: React.FC<Props> = ({}) => {
  const { user, authStatus } = useAuth();

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin//admin/vouchers`}
      canonical={`https://${homeDomain}/admin//admin/vouchers`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        // <AddWinners prizeId={prizeId} gameId={gameId} />
        // <p>
        //   Voucher
        //   {voucherId}

        // </p>
        <VouchersList />
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

export default VouchersListPage;
