import Header from "../components/header";
import clsx from "clsx";
import FooterV2 from "@modules/footer/Footer";
import DefaultLayout from "@layouts/DefaultLayout";
import { coursesSEO } from "@constants/seo";
import { GetStaticProps } from "next";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import BoatsTemplate from "@templates/boats/boatsTemplate";
import { EventInterface } from "@models/Event/Event";
import CoursesTemplate from "@templates/courses/coursesTemplate";
// import { useAuth } from "@hooks/auth/useAuth";

interface Props {
  eventObjs: EventInterface[];
}
const Events: React.FC<Props> = ({ eventObjs }) => {
  // return <div className={clsx("bg-green-300 w-screen h-screen")}></div>;
  // const { uid } = useAuth();
  // const [selectedData, setSelectedData] =
  //   useState<ProfileProps>(homeYogaProfileData);

  // useEffect(() => {
  //   setSelectedData(returnSelectedData(selectedNumber));
  // }, [selectedNumber]);

  // console.log("selected", selectedNumber);
  // console.log("eventObjs", eventObjs.length);

  return (
    <DefaultLayout
      title={coursesSEO.title}
      link={coursesSEO.link}
      canonical={coursesSEO.link}
      img={coursesSEO.img}
      noIndex={coursesSEO.noIndex}
      description={coursesSEO.description}
    >
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className={clsx("w-screen", "max-w-screen-xl mx-auto")}>
          <div className="fixed left-0 right-0 top-0 z-50 bg-white">
            <Header menuVisible={true} noShadow={true} />
          </div>

          <div className="pt-24 ">
            <CoursesTemplate courses={eventObjs} />
          </div>
        </div>
        <div className="pt-8 bg-gradient-to-b from-white to-gray-100 shadow-lg">
          <FooterV2 />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Events;

export const getStaticProps: GetStaticProps = async ({}) => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const allEvents = await db
    .collection("sbEvents")
    .orderBy("updatedOn", "desc")
    .get();

  const returnEvents: EventInterface[] = [];
  for (const eventObj of allEvents.docs) {
    returnEvents.push(eventObj.data() as EventInterface);
  }

  return {
    revalidate: 1,
    props: {
      eventObjs: returnEvents.filter(
        (item) =>
          item.name &&
          item.description &&
          typeof item.cost === "number" &&
          item.media &&
          item.media.length > 0
      ),
    },
  };
};
