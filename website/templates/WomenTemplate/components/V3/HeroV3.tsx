import { weEventTrack } from "@analytics/webengage/user/userLog";
import { useRouter } from "next/router";
import Container from "@components/Container";
import HeroV3Right from "./HeroV3Right";
import HeroV3Left from "./HeroV3Left";

interface Props {
  route?: string;
  btnText: string;
}

const HeroV3: React.FC<Props> = ({ route, btnText }) => {
  const router = useRouter();

  const onPlansClick = () => {
    weEventTrack("landingPage_clickPlans", { pageName: router.pathname });
  };

  return (
    <Container className="flex flex-col lg:flex-row max-w-screen-xl h-screen lg:px-8 pb-safe">
      <div className="flex flex-col bg- justify-evenly w-full  h-1/3 lg:h-full lg:w-1/2">
        <div className="h-12 lg:hidden" />
        <HeroV3Left route={route} btnText={btnText} />
      </div>
      <div className="flex items-center justify-center relative z-0  w-full h-2/3 lg:h-full lg:w-1/2 mx-auto">
        <HeroV3Right
          route={route}
          btnText={btnText}
          onPlansClick={onPlansClick}
        />
      </div>
    </Container>
  );
};

export default HeroV3;
