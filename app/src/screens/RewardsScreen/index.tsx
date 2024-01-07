import { useState } from "react";
// import { UserProvider } from "@providers/user/UserProvider";
import Header from "@modules/Header";
import Rewards from "@modules/Rewards";
import { BadgeProvider } from "@providers/badges/BadgeProvider";
import HeaderText from "@modules/Header/HeaderText";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

const RewardsScreen = () => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useScreenTrack();

  return (
    // <UserProvider>
    <>
      <Header
        titleNode={<HeaderText text="Rewards" />}
        headerColor={"transparent"}
        tone="dark"
        headerType="transparent"
        title="Rewards"
        defaultOption={true}
        setHeaderHeight={setHeaderHeight}
      />
      <BadgeProvider allCards={true}>
        <Rewards headerHeight={headerHeight} />
      </BadgeProvider>
    </>
    // </UserProvider>
  );
};

export default RewardsScreen;
