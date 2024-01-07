import HeaderItem from "./HeaderItem";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { getAnchorLink } from "./constants";
import clsx from "clsx";
import { Link } from "@mui/material";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import UserImage from "./UserImage";

interface Props {
  name?: string;
  userKey?: string;
  headerItems: (string | null)[];
  viewStyle?: "mobile" | "desktop";
  signedInUserImage?: CloudinaryMedia;
  signedInUserKey?: string;
}

const Header: React.FC<Props> = ({
  name,
  headerItems,
  viewStyle,
  userKey,
  signedInUserImage,
  signedInUserKey,
}) => {
  return (
    <>
      <div className="flex pt-4 pb-4 justify-between items-center border-b">
        {userKey ? (
          <Link href={`/${userKey}`}>
            {/* <a target="_blank"> */}
            <div>
              <HeaderItem name={name} textSize="2xl" font="medium" />
            </div>
            {/* </a> */}
          </Link>
        ) : (
          <div>
            <HeaderItem name={name} textSize="2xl" font="medium" />
          </div>
        )}
        <div
          className={clsx(viewStyle === "mobile" ? "hidden" : "hidden sm:flex")}
        >
          {headerItems.map((item, index) => {
            if (item)
              return (
                <Link key={item} href={getAnchorLink(item)}>
                  <div
                    className={clsx(
                      index === headerItems.length - 1 ? "" : "pr-4"
                    )}
                  >
                    <HeaderItem name={item} textSize="base" font="normal" />
                  </div>
                </Link>
              );
          })}
        </div>
        {headerItems.length > 0 ? (
          <div className={clsx(viewStyle ? "" : "sm:hidden")}>
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="">
                <img src="/menu-outline.svg" className="h-10" alt="menu" />
                {/* <UserImage image={signedInUserImage} urlKey={signedInUserKey} /> */}
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    {headerItems.map((item) => {
                      if (item)
                        return (
                          <div key={item}>
                            <Menu.Item>
                              {({ active }) => (
                                <Link href={getAnchorLink(item)}>
                                  <div
                                    className={`${
                                      active
                                        ? "bg-gray-200 text-orange-500  font-medium"
                                        : "text-gray-900"
                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                  >
                                    <div
                                      className="w-0 h-5 mr-2"
                                      aria-hidden="true"
                                    />
                                    {item}
                                  </div>
                                </Link>
                              )}
                            </Menu.Item>
                          </div>
                        );
                    })}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Header;
