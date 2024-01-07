import React, { useState } from "react";
import { MyPurchase, redeemedProps } from "@models/MyPurchases";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { format } from "date-fns";
import { Radio } from "@mui/material";
import { updateRedeemStatus } from "./utils";

interface Props {
  card: MyPurchase;
}
export const MyPurchaseCard: React.FC<Props> = ({ card }) => {
  const [item, setItem] = useState<MyPurchase>(card);

  const handleChange = (newVal: redeemedProps) => {
    setItem((p) => ({ ...p, isRedeemed: newVal ? newVal : card.isRedeemed }));
  };

  return (
    <div
      // key={`${item.voucherId}+${index}`}
      key={item.purchaseId}
      className="p-4 text-gray-700 min-w-[300px] max-w-[300px] border shadow-sm"
    >
      {/* <Link href={`/admin/games/${gameId}/${item.id}`}> */}
      <div>
        <div className="max-w-[375px]">
          {item.media ? (
            <MediaTile
              media={item.media}
              alt={item?.name ? item.name : "voucher"}
              width={375}
              height={223}
            />
          ) : null}
        </div>
        <p className="text-lg">Name: {item.name}</p>
        <p className="text-sm  ">uid: {item.uid}</p>
        <p className="text-sm  ">Value: {item.value}</p>
        <p className="text-sm pb-2 ">purchaseId: {item.purchaseId}</p>
        <p className="text-sm font-medium text-blue-700">
          userName: {item?.user?.name}
        </p>
        <p className="text-sm text-blue-700">email: {item?.user?.email}</p>
        <p className="text-sm pb-4 text-blue-700">
          purchasedOn:
          {item.purchasedOn
            ? format(new Date(item.purchasedOn), "h:mmaaa d MMM")
            : null}
        </p>

        {item.user?.city ? (
          <div className="border bg-gray-150 p-4">
            <p>City: {item.user.city}</p>
            <p>State: {item.user.state}</p>
            <p>Pincode: {item.user.pincode}</p>
            <p>Address: {item.user.fullAddress}</p>
          </div>
        ) : null}

        {item.user?.selectedProductVariant ? (
          <div className="border bg-gray-150 p-4">
            <p>Product Variant: {item.user.selectedProductVariant}</p>
          </div>
        ) : null}
      </div>

      <div
        className="flex items-center flex-col border border-red-500"
        key={item.purchaseId}
      >
        <p className="text-sm font-semibold text-blue-700">isRedeemed:</p>
        <div>
          <label className="text-sm font-semibold">{"requested"}</label>
          <Radio
            checked={"requested" === item.isRedeemed}
            onChange={() => handleChange("requested")}
            value={item.isRedeemed}
            name="radio-buttons"
            inputProps={{ "aria-label": "requested" }}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">{"pending"} :</label>
          <Radio
            checked={"pending" === item.isRedeemed}
            onChange={() => handleChange("pending")}
            value={item.isRedeemed}
            name="radio-buttons"
            inputProps={{ "aria-label": "pending" }}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">{"redeemed"} :</label>
          <Radio
            checked={"redeemed" === item.isRedeemed}
            // onChange={handleChange}
            onChange={() => handleChange("redeemed")}
            value={item.isRedeemed}
            name="radio-buttons"
            inputProps={{ "aria-label": "redeemed" }}
          />
        </div>
        <div>
          {item && card && item.isRedeemed !== card.isRedeemed ? (
            <button
              className="m-4 px-8 py-1 border bg-[#ff725c] text-lg rounded-md"
              onClick={() => updateRedeemStatus(item)}
            >
              Update Status
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
