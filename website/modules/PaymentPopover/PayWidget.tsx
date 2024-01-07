import clsx from "clsx";
import { paymentMethods } from "@models/PaymentMethods";
// import Button from "@components/button/index";
import { getCloudinaryURLWithParams } from "@utils/cloudinary";

interface Props {
  paymentMethods: paymentMethods[];
}

export const paytmImg =
  "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2FPaytm-Logo-With-White-Border-PNG-image.png?alt=media&token=c93a69b4-4e43-4a6c-90c5-c64524dec099";

const PayWidget: React.FC<Props> = ({ paymentMethods }) => {
  const method = paymentMethods[0];
  return (
    <div className={clsx("")}>
      {method === "GPay" ? (
        <div>
          {/* <Button appearance="outline"> */}
          <div
            className={clsx(
              "justify-center",
              "bg-gray-50 flex items-center rounded-md p-2 pl-4 pr-4 shadow-lg hover:shadow-xl"
            )}
          >
            <p className={clsx("text-xs text-gray-800", "pr-1")}>Pay with</p>
            <img
              src="./images/search.png"
              className={clsx("w-3 h-3 object-cover")}
            />
            <p className={clsx("text-xs text-gray-800 pl-0.5")}>Pay</p>
          </div>
          {/* </Button> */}
        </div>
      ) : method === "PayTM" ? (
        <div>
          <div
            className={clsx(
              "",
              "bg-gray-50 flex rounded-md p-2 pl-4 pr-4 shadow-lg hover:shadow-xl"
            )}
          >
            <img
              src={getCloudinaryURLWithParams(paytmImg, 320, 100, "c_fill")}
              className={clsx("h-4 object-cover")}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PayWidget;
