import PrizeBadge from "@templates/community/PersonalKPIs/PrizeBadge";
import { formatWithCommas } from "@utils/number";

interface Props {
  numTeamGold?: number;
  numTeamSilver?: number;
  numTeamBronze?: number;
  numMemberGold?: number;
  numMemberSilver?: number;
  numMemberBronze?: number;
  numTrees?: number;
  numConsistent?: number;
  totalCalories?: number;
}

const HallOfFameContent: React.FC<Props> = ({
  numTeamGold,
  numMemberSilver,
  numTeamSilver,
  numMemberBronze,
  numConsistent,
  numMemberGold,
  numTeamBronze,
  numTrees,
  totalCalories,
}) => {
  return (
    <div>
      <div className="p-2 bg-white rounded-lg shadow-sm">
        <div className="flex justify-center items-center">
          <p className="text-center text-lg text-gray-700 font-semibold">
            Hall of fame
          </p>
        </div>
        <div className="flex flex-wrap justify-evenly pt-4">
          {numTeamGold ? (
            <div>
              <PrizeBadge
                img="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-medal-awards-justicon-lineal-color-justicon.png"
                text="1st"
                subtext="Team"
                isAtStake={false}
              />
            </div>
          ) : null}
          {numTeamSilver ? (
            <div>
              <PrizeBadge
                img="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-medal-awards-justicon-lineal-color-justicon-1.png"
                text="2nd"
                subtext="Team"
                isAtStake={false}
              />
            </div>
          ) : null}
          {numTeamBronze ? (
            <div>
              <PrizeBadge
                img="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-medal-awards-justicon-lineal-color-justicon-2.png"
                text="3rd"
                subtext="Team"
                isAtStake={false}
              />
            </div>
          ) : null}
          {numMemberGold ? (
            <div>
              <PrizeBadge
                img="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-medal-awards-justicon-lineal-color-justicon.png"
                text="1st"
                subtext={"By individual"}
                isAtStake={false}
              />
            </div>
          ) : null}
          {numMemberSilver ? (
            <div>
              <PrizeBadge
                img="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-medal-awards-justicon-lineal-color-justicon-1.png"
                text="2nd"
                subtext={"By individual"}
                isAtStake={false}
              />
            </div>
          ) : null}
          {numMemberBronze ? (
            <div>
              <PrizeBadge
                img="https://img.icons8.com/external-justicon-lineal-color-justicon/64/000000/external-medal-awards-justicon-lineal-color-justicon-2.png"
                text="3rd"
                subtext={"By individual"}
                isAtStake={false}
              />
            </div>
          ) : null}
          {numTrees ? (
            <div>
              <PrizeBadge
                img="https://img.icons8.com/cotton/64/000000/tree.png"
                text={`${numTrees} trees`}
                subtext="planted"
                isAtStake={false}
              />
            </div>
          ) : null}

          {numConsistent ? (
            <div>
              <PrizeBadge
                img="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/000000/external-repeat-arrow-flatart-icons-lineal-color-flatarticons.png"
                text={`${numConsistent} hot`}
                subtext="streaks"
                isAtStake={false}
              />
            </div>
          ) : null}

          {totalCalories ? (
            <div>
              <PrizeBadge
                img="https://img.icons8.com/external-flat-juicy-fish/60/000000/external-calories-gym-life-flat-flat-juicy-fish.png"
                text={`${formatWithCommas(totalCalories)} cals`}
                subtext="burnt"
                isAtStake={false}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HallOfFameContent;
