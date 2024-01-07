// import clsx from "clsx";
import HowToPlay from ".";
import Section from "../Containers/Section";
// import ScrollDownComponent from "./ScrollDownComponent";

// interface Props {
//   isSticky?: boolean;
// }

// const WrapperComponent: React.FC<Props> = ({ children, isSticky }) => {
//   return (
//     <div
//       className={clsx(
//         "w-full h-full flex flex-col px-4",
//         isSticky && "sticky top-0 -z-10"
//       )}
//     >
//       <h2
//         className={clsx(
//           "text-xl iphoneX:text-3xl text-center font-bold py-2 iphoneX:py-4 pt-16 iphoneX:pt-20",
//           !isSticky && "opacity-0"
//         )}
//       >
//         How to Win
//       </h2>
//       <div className={clsx("flex-1 flex flex-col my-4 overflow-hidden")}>
//         {children}
//       </div>
//       <div className={clsx(!isSticky && "opacity-0", "pb-16 iphoneX:pb-20")}>
//         <ScrollDownComponent text="Keep Scrolling" />
//       </div>
//     </div>
//   );
// };

const HowToWin = () => {
  return (
    <>
      <Section target="HTP1">
        <HowToPlay
          heading="How it works?"
          imgUrl={`https://ik.imagekit.io/socialboat/Component_2_Suwt1o4R7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657014696054`}
          title="Step 1. Follow the program"
          description="When you signup you get a program especially designed to achieve the goal. Just follow the program each day"
        />
      </Section>
      <Section target="HTP2">
        <HowToPlay
          imgUrl={`https://ik.imagekit.io/socialboat/Component_1__1__NuKHW56Gg.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657209655373`}
          title="Step 2. Earn FitPoints"
          description="Each task in the program gets you FitPoints. This creates the leaderboard ranking"
        />
      </Section>
      <Section target="HTP3">
        <HowToPlay
          imgUrl={`https://ik.imagekit.io/socialboat/Component_1__2__P-F3xwIVZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657209655295`}
          title="Step 3. Unlock Rewards"
          description="Top athletes on the leaderboard win rewards. This is in addition to your fitness."
        />
      </Section>
    </>
  );
};

export default HowToWin;
