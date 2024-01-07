import { UserInterface } from "@models/User/User";
import UserImage from "@templates/listing/Header/UserImage";
import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";

interface Props {
  userObj: UserInterface;
  onSignOut: () => void;
}

const UserProfileDropdown: React.FC<Props> = ({ userObj, onSignOut }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Menu as="div" className="relative z-0 select-none">
      <Menu.Items
        static
        className="rounded-full focus:outline-none bg-white/80"
      >
        <div
          className="py-1 flex justify-between mx-1 items-center cursor-pointer"
          onClick={() => setIsDropdownOpen((p) => !p)}
        >
          <p className="truncate text-[#494949] text-base md:text-lg font-nunitoB px-2">
            {userObj.name}
          </p>
          <UserImage
            image={userObj?.profileImage}
            name={userObj?.name}
            boxHeight="w-8"
            boxWidth="w-8"
          />
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
        <div className="opacity-0 h-10" />
        <Menu.Item>
          {({ active }) => (
            <Link target="_blank" href="https://socialboat.app.link/download">
              <p
                className={`whitespace-nowrap py-2 text-[#494949] text-sm text-center border-t font-nunitoM border-[#00000026] cursor-pointer`}
              >
                Download app
              </p>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <p
              onClick={onSignOut}
              className={`whitespace-nowrap text-[#494949] px-4 py-2 text-sm cursor-pointer text-center border-t font-nunitoM border-[#00000026]`}
            >
              Sign-Out
            </p>
          )}
        </Menu.Item>
      </Transition>
    </Menu>
  );
};
export default UserProfileDropdown;
