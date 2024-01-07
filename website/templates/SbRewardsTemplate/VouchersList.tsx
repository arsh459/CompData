import React from "react";

// import Header from "../Header";
// import { useAdminGames } from "./useAdminGames";
import { useVouchers } from "@hooks/sbRewards/useVouchers";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import Button from "@components/button";
import { Link } from "@mui/material";
import { deleteVoucher } from "./utils";

// import GameBadges from "./GameBadges";

interface Props {}

const VouchersList: React.FC<Props> = ({}) => {
  const { vouchers } = useVouchers(100);
  return (
    <>
      <div className="py-8 px-4 flex">
        <Link href={`/admin/vouchers/addNew`}>
          <Button appearance="contained">Add Voucher</Button>
        </Link>
      </div>
      <div className="p-4 flex flex-wrap">
        {vouchers?.map((item) => {
          return (
            <div
              key={item.id}
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
                <p className="text-base">Value: {item.value}</p>
                <p className="text-sm font-semibold text-blue-700">
                  itemLeft: {item.itemLeft}
                </p>
                <p className="text-sm font-semibold text-blue-700">
                  Priority: {item.priority}
                </p>
                <p className="text-sm font-semibold text-blue-700">
                  Description: {item.description}
                </p>
              </div>
              {/* </Link> */}
              <div className="pt-2 flex justify-between">
                <Link href={`/admin/vouchers/${item.id}/`}>
                  <p className="text-lg underline">Edit Vouchers</p>
                </Link>
                <p
                  className="text-lg cursor-pointer"
                  onClick={() => deleteVoucher(item.id)}
                >
                  ❌
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default VouchersList;
