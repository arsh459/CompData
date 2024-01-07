import { weEventTrack } from "@analytics/webengage/user/userLog";
// import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { UserInterface } from "@models/User/User";
// import { getTeamIdFromParticipating } from "@templates/AdminDashboard/TaskResults/utils";
import Link from "next/link";
import { useRouter } from "next/router";
// import { Background } from "./Background";

interface Props {
  user: UserInterface;
  route: string;
}

const HeroWithUser: React.FC<Props> = ({ user, route }) => {
  // const teamId = getTeamIdFromParticipating(
  //   user.participatingInGameWithTeam,
  //   TEAM_ALPHABET_GAME
  // );

  const router = useRouter();

  const onMainClick = () => {
    weEventTrack("landingPage_ctaClick", {
      pageName: router.pathname,
      user: user.name ? user.name : user.uid,
    });
  };

  return (
    <div className="w-screen h-screen flex relative z-0">
      <div className="absolute inset-0 w-full h-full -z-[5] backdrop-blur-sm"></div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/Screenshot_2022-11-22_at_12.10_1__WFex9Cee.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669124688713"
          className="h-full lg:w-full object-cover"
          alt=""
        />
      </div>
      <div className="w-full md:w-2/3 mx-auto h-2/3 md:h-4/5 self-end md:self-start flex flex-col justify-center items-center p-4">
        {user.name ? (
          <>
            <h1 className="text-white text-3xl md:text-5xl font-baib text-center">
              You&apos;ve been <br className="md:hidden" />
              invited by {user.name}
            </h1>
          </>
        ) : (
          <h1 className="text-white text-3xl md:text-5xl font-baib text-center">
            Become a <br className="md:hidden" /> SuperWoman with{" "}
            {user.name ? user.name : "me"}
          </h1>
        )}

        <h6 className="text-[#BEFF33] text-base md:text-2xl font-baiSb text-center font-extralight py-4">
          Join the 30min X 30day SuperWoman challenge with me and take an oath
          to unlock the better you
        </h6>
        <Link passHref href={route}>
          <div
            className="flex justify-center  bg-white border border-white/10 rounded-full px-10 md:px-12 py-3 md:py-4"
            onClick={onMainClick}
          >
            <span className="font-baiSb text-center text-black">
              Join {user.name ? `${user.name}'s` : "my"} Team
            </span>
            <div className="w-4" />
            <img
              src="https://ik.imagekit.io/socialboat/tr:h-400,c-maintain_ratio,fo-auto/Vector__46__ZLXF5cpfM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669040691694"
              className="w-5 aspect-1 object-contain"
              alt=""
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroWithUser;
