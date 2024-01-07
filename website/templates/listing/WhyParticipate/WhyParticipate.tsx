import clsx from "clsx";
import NumberedList, { ListItem } from "../NumberedList/NumberedList";

interface Props {}

const whyItems: ListItem[] = [
  {
    heading: "Earn upto 50K/month",
    text: "Launch an on-demand course, live classes or One-on-one coaching with your teammates",
  },
  {
    heading: "Spice up your live classes with rewards",
    text: "Your team members can win exciting rewards worth INR 70k in every challenge.",
  },
  {
    heading: "Increase user retention by 4x",
    text: "Competitions create motivation in people. So, they never leave your boat!",
  },
  {
    heading: "Grow your social media",
    text: "Share transformation stories, run a campaign with large brands and your followers. Creators usually double their following!",
  },
];

const WhyParticipate: React.FC<Props> = ({}) => {
  return (
    <div>
      <div>
        <p
          className={clsx(
            "text-2xl lg:text-2xl ",
            "text-center text-gray-700 font-semibold"
          )}
        >
          Why participate? 🤔
        </p>
      </div>
      <div>
        <NumberedList
          //   vertical={true}
          //   viewStyle="mobile"
          headingSeparateLine={true}
          separator="tick"
          heading=""
          listItems={whyItems}
        />
      </div>
    </div>
  );
};

export default WhyParticipate;
