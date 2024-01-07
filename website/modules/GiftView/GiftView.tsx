import { getPrefixSuffix } from "@constants/organization";
import { useGifts } from "@hooks/gifts/useGifts";
import clsx from "clsx";

interface Props {}

const GiftView: React.FC<Props> = ({}) => {
  const { gifts } = useGifts();
  return (
    <div className="h-full flex flex-wrap">
      {gifts.map((item) => {
        const duration = getPrefixSuffix(
          item.plan?.durationInDays ? item.plan?.durationInDays : 0
        );
        return (
          <div key={item.id} className="border p-4 w-[300px] m-4">
            <p>From: {item.fromName}</p>
            <p>From UID: {item.fromUID}</p>
            <p>From Email: {item.fromEmail}</p>
            <p>To: {item.toName}</p>
            <p>Message{item.toMessage}</p>
            <p className="font-bold text-red-500">{item.status}</p>
            <p>Plan Cost{item.plan?.cost}</p>
            <p>Plan Cost: USD: {item.plan?.usdCost}</p>
            <p className="font-bold text-green-500">
              Days {duration.prefix} {duration.suffix}
            </p>
            <div className="grid gap-2 p-3">
              {item.plan &&
                item.plan.descList?.map((desc) => (
                  <p key={desc} className={clsx("text-black text-xs")}>
                    {desc}
                  </p>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GiftView;
