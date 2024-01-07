import HeaderItem from "@templates/listing/Header/HeaderItem";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
// import { getAnchorLink } from "@templates/listing/Header/constants";
// import clsx from "clsx";
import { Link } from "@mui/material";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import UserImage from "@templates/listing/Header/UserImage";
import { navLevels } from "@hooks/community/useCommunityParams";
// import clsx from "clsx";
// import UserImage from "./UserImage";

interface Props {
  name?: string;
  userKey?: string;
  headerItems: (string | null)[];
  viewStyle?: "mobile" | "desktop";
  signedInUserImage?: CloudinaryMedia | AWSMedia;
  signedInUserKey?: string;
  signedInUserName?: string;
  uid?: string;
  onSignIn: () => void;
  onSignOut: () => void;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  onNavChange: (navLevel: navLevels) => void;
}

const Header: React.FC<Props> = ({
  name,
  headerItems,
  viewStyle,
  userKey,
  signedInUserImage,
  signedInUserKey,
  signedInUserName,
  uid,
  onSignIn,
  onSignOut,
  authStatus,
  onNavChange,
}) => {
  const handleMenuClick = (item: string) => {
    if (item === "Programs") {
      onNavChange("program");
    }
    // else if (item === "Progress") {
    // onNavChange("me");
    // }
    else if (item === "Members") {
      onNavChange("members");
    } else if (item === "Log out") {
      onSignOut();
    }
  };

  // console.log("headerItems", headerItems, uid);
  // console.log("uid", uid);
  return (
    <div className="">
      <div className="flex px-4 py-4 md:px-8  justify-between items-center">
        {userKey ? (
          <Link href={`/${userKey}`}>
            <div>
              <HeaderItem name={name} textSize="2xl" font="medium" />
            </div>
          </Link>
        ) : (
          <div>
            <HeaderItem name={name} textSize="2xl" font="medium" />
          </div>
        )}

        {/* {signedInUserImage || signedInUserName ? (
          <UserImage
            name={signedInUserName}
            image={signedInUserImage}
            urlKey={signedInUserKey}
          />
        ) : !uid && authStatus === "FAILED" ? (
          <div onClick={onSignIn} className="cursor-pointer">
            <p className="text-orange-500">Sign in</p>
          </div>
        ) : null} */}

        {headerItems.length > 0 && uid ? (
          // <div className="">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="p-0 m-0">
              <UserImage image={signedInUserImage} name={signedInUserName} />
              {/* <p className="text-orange-500">Menu</p> */}
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
              <Menu.Items className="absolute right-0 w-56 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="">
                  {headerItems.map((item) => {
                    if (item)
                      return (
                        <div key={item}>
                          <Menu.Item>
                            {({ active }) => (
                              // <Link href={getAnchorLink(item)}>
                              <div
                                onClick={() => handleMenuClick(item)}
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
                              // </Link>
                            )}
                          </Menu.Item>
                        </div>
                      );
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : // </div>
        !uid && authStatus === "FAILED" ? (
          <div onClick={onSignIn} className="cursor-pointer">
            <p className="text-orange-500">Sign in</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
