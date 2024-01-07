
import Container from "@components/Container";
import HeroSuperWomenRight from "./HeroSuperWomenRight";
import HeroSuperWomenLeft from "./HeroSuperWomenLeft";
import { RoundInterface } from "@models/Event/Round";
import { BackUpImage } from "./ImageConstant";

interface Props {
  route?: string;
  btnText: string;
  round?: RoundInterface;
}

const HeroV4: React.FC<Props> = ({ route, btnText, round }) => {
  // const router = useRouter();
  // const onPlansClick = () => {
  //   weEventTrack("landingPage_clickPlans", { pageName: router.pathname });
  // };

  const heroImage = round?.img ? round.img : BackUpImage;

  return (
    <Container className="flex flex-col lg:flex-row justify-between max-w-screen-xl lg:h-screen lg:px-8 pb-safe px-2">
      <div className="h-16 py-5 order-1 lg:hidden">Hello</div>
      <div className="flex flex-col justify-evenly xs:w-[90%] md:w-[70%] m-auto lg:h-full sm:-mt-5 lg:mt-5 lg:w-1/2 order-3 lg:order-1">
        <HeroSuperWomenLeft
          route={route}
          btnText={btnText}
          roundName={round?.name}
          start={round?.start || Date.now()}
          end={round?.end || Date.now() + 86400000}
          shortDescription={round?.shortDescription}
        />
      </div>
      <div className="flex items-center justify-center relative z-0 xs:w-[100%] pixelXl:w-[80%] pixelXlPro:w-[70%] sm:w-[70%] md:w-[50%] lg:h-full lg:w-1/2 mx-auto order-2 lg:order-2">
        <HeroSuperWomenRight heroImg={heroImage} />
      </div>
    </Container>
  );
};

export default HeroV4;
