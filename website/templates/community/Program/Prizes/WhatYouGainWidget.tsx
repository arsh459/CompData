import { iconGoalType } from "@models/Tasks/SystemKPIs";
import IconSelector from "@modules/WorkoutsV3/GoalProgramContainer/SvgIcons";
// import { ListItem } from "@templates/listing/NumberedList/NumberedList";

interface Props {
  icon: iconGoalType;
  text: string;
  target: number;
}

const WhatYouGainWidget: React.FC<Props> = ({ icon, text, target }) => {
  //   const [isOpen, setIsOpen] = useState<boolean>(false);
  //   const { prizes, isFetched } = usePrizes(parentEvent.id, undefined);

  return (
    <div className="flex flex-col justify-between items-center ">
      <IconSelector iconType={icon} size="small" />
      {/* {icon === "distance" ? (
        <img
          src={`https://ik.imagekit.io/socialboat/Group_386_BzH5nDzqx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656677000136`}
          className="h-12 iphoneX:h-16 w-8 iphoneX:w-12 object-contain"
          alt="lungs icon"
        />
      ) : icon === "pace" ? (
        <img
          src={`https://ik.imagekit.io/socialboat/Vector_511_WClzNqtIO.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656677000348`}
          className="h-12 iphoneX:h-16 w-8 iphoneX:w-12 object-contain"
          alt="arm icon"
        />
      ) : icon === "reps" ? (
        <img
          src={`https://ik.imagekit.io/socialboat/Group_369_0lQWxK8ng.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656677000108`}
          className="h-12 iphoneX:h-16 w-8 iphoneX:w-12 object-contain"
          alt="run icon"
        />
      ) : (
        <img
          src={`https://ik.imagekit.io/socialboat/Group_369_0lQWxK8ng.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656677000108`}
          className="h-12 iphoneX:h-16 w-8 iphoneX:w-12 object-contain"
          alt="run icon"
        />
      )} */}

      <p className="text-xs iphoneX:text-base font-medium text-center leading-none">
        {target} {text}
      </p>
    </div>
  );
};

export default WhatYouGainWidget;
