import Header from "../components/header";
import clsx from "clsx";
import FooterV2 from "@modules/footer/Footer";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO } from "@constants/seo";
import { GetStaticProps } from "next";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import BoatsTemplate from "@templates/boats/boatsTemplate";
// import { useAuth } from "@hooks/auth/useAuth";

interface Props {
  leaders: LeaderBoard[];
}
const Boats: React.FC<Props> = ({ leaders }) => {
  // return <div className={clsx("bg-green-300 w-screen h-screen")}></div>;
  // const { uid } = useAuth();
  // const [selectedData, setSelectedData] =
  //   useState<ProfileProps>(homeYogaProfileData);

  // useEffect(() => {
  //   setSelectedData(returnSelectedData(selectedNumber));
  // }, [selectedNumber]);

  // console.log("selected", selectedNumber);
  // console.log("leaders", leaders);

  return (
    <DefaultLayout
      title={boatsSEO.title}
      link={boatsSEO.link}
      canonical={boatsSEO.link}
      img={boatsSEO.img}
      noIndex={boatsSEO.noIndex}
      description={boatsSEO.description}
    >
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className={clsx("w-screen", "max-w-screen-xl mx-auto")}>
          <div className="fixed left-0 right-0 top-0 z-50 bg-white">
            <Header menuVisible={true} noShadow={true} />
          </div>

          <div className="pt-24 ">
            <BoatsTemplate boats={leaders} />
          </div>
        </div>
        <div className="pt-8 bg-gradient-to-b from-white to-gray-100 shadow-lg">
          <FooterV2 />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Boats;

export const getStaticProps: GetStaticProps = async ({}) => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const allLeaders = await db
    .collection("leaderBoard")
    .where("socialBoat", "==", true)
    .get();

  const returnLeaders: LeaderBoard[] = [];
  for (const leader of allLeaders.docs) {
    const tmpLeader = leader.data() as LeaderBoard;

    if (typeof tmpLeader.manualRank === "number") {
      // console.log(tmpLeader.externalLink, tmpLeader.instagramLink);
      returnLeaders.push(tmpLeader);
    } else {
    }
  }

  // console.log("returnLeaders", returnLeaders);

  return {
    revalidate: 1,
    props: {
      leaders: returnLeaders.sort((a, b) =>
        a.manualRank && b.manualRank ? a?.manualRank - b?.manualRank : 0
      ),
    },
  };
};
