import { Gift } from "@models/Gift/Gift";
import RedeemTemplate from "./Redeem/RedeemTemplate";

interface Props {
  gift: Gift;
}

const GiftCardTemplate: React.FC<Props> = ({ gift }) => {
  return (
    <div className=" ">
      {gift.status === "REDEEMED" ? (
        <RedeemTemplate gift={gift} />
      ) : gift.status === "PAID" ? (
        <RedeemTemplate gift={gift} />
      ) : null}
    </div>
  );
};

export default GiftCardTemplate;
