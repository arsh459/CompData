// import { useSEOData } from "@hooks/event/useSEOData";
import { useUserSEOData } from "@hooks/event/useUserSEOData";
import DefaultLayout from "@layouts/DefaultLayout";
// import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import CheckoutTemplate from "@templates/checkout/CheckoutTemplate";
import { GetStaticProps, GetStaticPaths } from "next";
// import { Link } from "@mui/material";
// import { useRemoteCohort } from "@hooks/cohorts/useRemoteCohort";
import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import PhoneForm from "@templates/apply/Form/PhoneForm";
import { dashVisible } from "@templates/apply/Form/utils";
import { homeDomain } from "@constants/seo";
import { WorkoutSeries } from "@models/Workouts/Series";
import { useWorkoutSEOData } from "@hooks/workouts/useWorkoutSEOData";
// import CheckoutSeriesWidget from "@templates/checkout/CheckoutSeries";
// import Button from "@components/button";

interface Props {
  selectedSeries?: WorkoutSeries;
  leader: LeaderBoard | null;
}
const CheckoutSeries: React.FC<Props> = ({ selectedSeries, leader }) => {
  const { title, desc, img, width, height } = useWorkoutSEOData(selectedSeries);
  const { site_name, favIcon } = useUserSEOData(leader);

  //   const [modalState, setModalState] = useState<seriesModal>("none");
  const { user, loadComplete, hideRecapcha, authStatus } = useAuth(undefined);

  const { recaptcha, element } = useRecapcha(
    authStatus === "FAILED"
    // showAuthModal
  );

  //   const enrolled = user?.enrolledCourses?.includes(
  //     selectedSeries?.id ? selectedSeries?.id : ""
  //   );

  // console.log("hideRecapcha", hideRecapcha, authStatus);

  return (
    <DefaultLayout
      title={`Checkout: ${title}`}
      description={`Book ${desc}`}
      siteName={site_name}
      width={width}
      height={height}
      favIcon={favIcon}
      canonical={
        selectedSeries && selectedSeries.seriesKey
          ? `https://${homeDomain}/checkoutSeries/${selectedSeries.seriesKey}`
          : ""
      }
      link={
        selectedSeries && selectedSeries.seriesKey
          ? `https://${homeDomain}/checkoutSeries/${selectedSeries.seriesKey}`
          : ""
      }
      noIndex={false}
      img={img}
    >
      <>
        {selectedSeries &&
        leader &&
        user &&
        user.phone &&
        user.email &&
        user.name ? (
          <></>
        ) : // <CheckoutSeriesWidget
        //   heading={selectedSeries.name}
        //   leader={leader}
        //   id={selectedSeries.id}
        //   ownerUID={selectedSeries.ownerUID}
        //   seriesKey={selectedSeries.seriesKey}
        //   uid={user.uid}
        //   phone={user.phone}
        //   email={user.email}
        //   price={selectedSeries.cost}
        //   currency="₹"
        // />
        null}

        <div
          id="recaptcha-container"
          ref={element}
          className={hideRecapcha ? "hidden" : ""}
        />

        <div className={!dashVisible(user) && loadComplete ? "" : "hidden"}>
          <PhoneForm
            mobileInteractive={false}
            user={user}
            brandName={leader?.name}
            recaptcha={recaptcha}
          />
        </div>
      </>
    </DefaultLayout>
  );
};

export default CheckoutSeries;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // paths: [{ params: { eventKey: "sample" } }],
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const workoutKey = params ? params.seriesKey : "";

  if (workoutKey) {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const seriesList = await db
      .collection("workouts")
      .where("seriesKey", "==", workoutKey)
      .get();

    if (seriesList.docs.length > 0 && seriesList.docs[0].exists) {
      const selectedSeries = seriesList.docs[0].data() as WorkoutSeries;

      const leader = await db
        .collection("leaderBoard")
        .doc(`leader-${selectedSeries.ownerUID}`)
        .get();

      return {
        revalidate: 1,
        props: {
          selectedSeries,
          leader: leader.data() as LeaderBoard,
        },
      };
    }
  }

  return {
    revalidate: 1,
    props: {
      leader: null,
    },
  };
};
