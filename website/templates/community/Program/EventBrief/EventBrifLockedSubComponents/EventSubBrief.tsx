import { nFormatter } from "@utils/number";

interface Props {
  weight?: string;
  workout?: string;
  teams?: string;
  worth?: number;
}

const EventSubBrief: React.FC<Props> = ({ weight, workout, teams, worth }) => {
  return (
    <div className="text-xs iphoneX:text-base font-bold px-4 py-2 iphoneX:py-4">
      <div className="flex items-center py-1 iphoneX:py-2">
        <img
          src={`https://ik.imagekit.io/socialboat/Vector_XQQPEXV_p.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656672931218`}
          className="w-10 h-4 iphoneX:h-5 object-contain"
          alt="dumbbell icon"
        />
        <p className="pl-2">{weight}</p>
      </div>
      <div className="flex items-center py-1 iphoneX:py-2">
        <img
          src={`https://ik.imagekit.io/socialboat/Group_366_pBxup3elb.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656672930778`}
          className="w-10 h-3 iphoneX:h-4 object-contain"
          alt="pushup icon"
        />
        <p className="pl-2">{workout}</p>
      </div>
      {teams ? (
        <div className="flex items-center py-1 iphoneX:py-2">
          <img
            src={`https://ik.imagekit.io/socialboat/Group_175_IP2BYpD2u.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656672930778`}
            className="w-10 h-3 iphoneX:h-4 object-contain"
            alt="team icon"
          />
          <p className="pl-2">{teams}</p>
        </div>
      ) : null}
      <div className="flex items-center py-1 iphoneX:py-2">
        <img
          src={`https://ik.imagekit.io/socialboat/Vector__1__Ejxapnp-h.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656672930911`}
          className="w-10 h-4 iphoneX:h-5 object-contain"
          alt="gift icon"
        />
        <p className="pl-2">Win rewards Upto {nFormatter(worth ? worth : 0)}</p>
      </div>
    </div>
  );
};

export default EventSubBrief;
