import CirclePercentV2 from "@components/CirclePercent/CirclePercentV2";
import ArrowDirectionIcon from "@components/SvgIcons/ArrowDirectionIcon";
// import { managePcosIcon } from "@constants/icons/iconURLs";
// import { ArrowRightIcon } from "@heroicons/react/solid";
import { getUserFitnessGoal } from "@models/User/parseUtils";
import { UserInterface } from "@models/User/User";
import Link from "next/link";
import { getMyGoalObj } from "../utils/myGoalUtils";
interface Props {
  user: UserInterface;
}
const ManagePcos: React.FC<Props> = ({ user }) => {
  const myGoalObj = getMyGoalObj(getUserFitnessGoal(user));
  const roadmapProgress = Math.round(
    ((user?.completedTargets ? user?.completedTargets : 0) /
      (user?.totalTargets ? user?.totalTargets : 1)) *
      100
  );

  return (
    <div className="w-full aspect-[416/152] flex  rounded-3xl  bg-[#FFC6E2]">
      <div className="flex-[.7] flex items-center gap-4 pl-11">
        {myGoalObj.iconUrl ? (
          <img
            src={myGoalObj.iconUrl}
            alt=""
            className="w-14 aspect-[54/61] object-contain"
          />
        ) : null}

        <p className="font-nunitoEB text-[28px] text-[#323232] leading-8">
          {myGoalObj.title}
        </p>
      </div>
      <div className="flex-[.3] flex flex-col items-center justify-around">
        {/* <div className="w-10 aspect-[55/31] px-4 bg-white text-black"> */}
        <Link href={`/admin/u/${user.uid}/path`}>
          <div className="w-14  aspect-[55/30] rounded-xl bg-white py-2">
            <div className="w-full aspect-[20/5]">
              <ArrowDirectionIcon color={"#000"} />
            </div>
          </div>
        </Link>
        {/* </div> */}
        <div className="w-10 h-10  text-black">
          <CirclePercentV2
            circleSize={46}
            strokeWidthNum={5}
            percent={roadmapProgress / 100 || 0}
            activeColor={myGoalObj.textColor}
            inactiveColor={`${myGoalObj.textColor}1e`}
          >
            <div className="flex-1 flex justify-center items-center">
              <p
                style={{
                  color: myGoalObj.textColor,
                  fontSize: 12,
                  fontFamily: "Nunito-Bold",
                }}
              >
                {`${roadmapProgress || 0}%`}
              </p>
            </div>
          </CirclePercentV2>
        </div>
      </div>
    </div>
  );
};

export default ManagePcos;
