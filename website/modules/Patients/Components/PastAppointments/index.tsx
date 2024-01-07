import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useUserAppointments } from "@hooks/appointments/useUserAppointments";
import { UserInterface } from "@models/User/User";
import clsx from "clsx";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ViewAppointmentsInventory from "./AppointmentInventory/ViewAppointmentsInventory";
interface Props {
  remoteUser: UserInterface | null;
}
const PastAppointments: React.FC<Props> = ({ remoteUser }) => {
  const { appointments } = useUserAppointments(remoteUser?.uid);
  const router = useRouter();
  const onBack = () => {
    router.back();
  };
  return (
    <div className="w-screen h-screen relative z-0">
      <div className="fixed inset-0 bg-[#F6F6F6] -z-10" />
      <div className="w-full max-w-screen-lg h-full mx-auto ">
        <div className="flex flex-1 items-center justify-between py-4">
          <div onClick={onBack} className="cursor-pointer">
            <ChevronLeftIcon className="w-8 h-8" color="#23262F" />
          </div>

          <p className="text-[#23262F] text-base font-popSB flex-1 px-4 md:text-center">
            {`${remoteUser?.name}'s Profile`}
          </p>
        </div>
        <div className="  bg-[#FFECF5]  mx-4 rounded-3xl   overflow-y-scroll">
          <div className="md:bg-white  py-4 pl-4 rounded-2xl  md:rounded-[45px]  md:m-4">
            <div className="flex pb-2 px-3 items-center">
              <p className="text-[#383838]    font-popM  text-base flex justify-self-center ">
                Summary
              </p>

              <Link
                href={`/admin/patients/${remoteUser?.uid}/appointments/edit`}
              >
                <p className="text-[#383838]  text-xs pl-4 underline">
                  Edit Inventory
                </p>
              </Link>
            </div>
            {remoteUser ? (
              <div className="p-4 pb-10 border-b-[1px]">
                <ViewAppointmentsInventory user={remoteUser} />
              </div>
            ) : null}

            <div className="flex border-b-[1px] py-4 px-3 items-center">
              <p className="text-[#383838]    font-popM  text-base flex justify-self-center ">
                All appointments
              </p>

              <Link
                href={`/admin/patients/${remoteUser?.uid}/appointments/add`}
              >
                <p className="text-[#383838]  text-xs pl-4 underline">
                  Add new
                </p>
              </Link>
            </div>

            {appointments?.map((item, idx) => {
              return (
                <a href={`/admin/appointments/${item.id}`} key={item.id}>
                  <div
                    className={clsx(
                      "items-center flex-1  cursor-pointer border-b-[1px]   p-3 flex justify-between ",
                      appointments?.length - 1 === idx && "border-none"
                    )}
                  >
                    <p className="hidden md:block"></p>
                    <div className="flex">
                      <p className="text-[#383838] font-popR  text-xs  flex justify-self-center ">
                        {item?.startSlot
                          ? format(item.startSlot, "hh:mma do MMMM yyyy")
                          : null}
                      </p>
                      {item.category ? (
                        <p className="text-[#383838] font-bold capitalize font-popR  text-xs  flex justify-self-center pl-2">
                          {` | ${item.category}`}
                        </p>
                      ) : null}
                    </div>
                    <div onClick={onBack} className="cursor-pointer">
                      <ChevronRightIcon className="w-5 h-5" color="#23262F" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastAppointments;
