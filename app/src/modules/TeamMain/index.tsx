import { useState } from "react";
import TeamHolder from "./TeamHolder";
import Header from "@modules/Header";
import BlurBG from "@components/BlurBG";

const TeamMain = () => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [isBlured, setIsBlured] = useState<boolean>(false);
  return (
    <>
      <Header
        back={true}
        tone="dark"
        headerColor="#100F1A"
        headerType="transparent"
        setHeaderHeight={setHeaderHeight}
      />
      <TeamHolder headerHeight={headerHeight} setIsBlured={setIsBlured} />
      {isBlured ? (
        <BlurBG
          blurType="dark"
          blurAmount={20}
          fallbackColor="#100F1A"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: headerHeight,
          }}
        />
      ) : null}
    </>
  );
};

export default TeamMain;
