import { UserInterface } from "@models/User/User";
import UserImage from "@templates/listing/Header/UserImage";
import React, { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { usePaidStatus } from "@hooks/paidStatus/usePaidStatus";
import clsx from "clsx";

interface Props {
  userObj: UserInterface;
  onSignOut: () => void;
  hideName?: boolean;
  containerTw?: string;
  children?: React.ReactNode;
}

const UserProfileDropdownV2: React.FC<Props> = ({
  userObj,
  onSignOut,
  hideName,
  containerTw,
  children,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { status } = usePaidStatus(userObj.uid);
  const isPro = status !== "LOADING" && status === "ACTIVE";

  return (
    <Menu as="div" className="relative z-0 select-none">
      <Menu.Items
        static
        className={clsx(
          "focus:outline-none  bg-white/80 ",
          containerTw ? containerTw : "rounded-full"
        )}
      >
        <div
          className="py-1 flex justify-between mx-1 items-center cursor-pointer"
          onClick={() => setIsDropdownOpen((p) => !p)}
        >
          <UserImage
            image={userObj?.profileImage}
            name={userObj?.name}
            boxHeight="w-8"
            boxWidth="w-8"
          />
          {hideName ? null : (
            <p className="truncate text-[#494949] text-base md:text-lg font-nunitoB px-2">
              {userObj.name}
            </p>
          )}
          {isDropdownOpen ? (
            <ChevronUpIcon className="h-5 w-5" color="#000" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" color="#000" />
          )}
          <div className="w-2 aspect-1" />
        </div>
      </Menu.Items>

      <Transition
        show={isDropdownOpen}
        enter="transition duration-100"
        enterFrom="transform opacity-0 h-0"
        enterTo="transform opacity-100 h-max"
        leave="transition duration-100"
        leaveFrom="transform opacity-100 h-max"
        leaveTo="transform opacity-0 h-0"
        className="absolute left-0 right-0 top-0 -z-10 bg-white rounded-2xl focus:outline-none"
      >
        <div className={clsx("opacity-0", containerTw)}>
          <div className="h-10" />
        </div>
        {children ? (
          children
        ) : (
          <>
            <Menu.Item>
              <Link href={isPro ? "/proplan" : "/plans"}>
                <p
                  className={`whitespace-nowrap py-2 text-[#494949] text-sm px-4 text-center border-t font-nunitoM border-[#00000026] cursor-pointer`}
                >
                  {isPro ? "My Plan" : "Subscribe Now"}
                </p>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                target="_blank"
                href="https://api.whatsapp.com/send?phone=919958730020&text=Hi!"
              >
                <p
                  className={`whitespace-nowrap py-2 text-[#494949] text-sm text-center border-t font-nunitoM border-[#00000026] cursor-pointer`}
                >
                  Contact Us
                </p>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <p
                onClick={onSignOut}
                className={`whitespace-nowrap text-[#494949] px-4 py-2 text-sm cursor-pointer text-center border-t font-nunitoM border-[#00000026]`}
              >
                Log Out
              </p>
            </Menu.Item>
          </>
        )}
      </Transition>
    </Menu>
  );
};
export default UserProfileDropdownV2;
