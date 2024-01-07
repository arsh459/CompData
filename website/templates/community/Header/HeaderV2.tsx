// import HeaderItem from "@templates/listing/Header/HeaderItem";
// import { Menu, Transition } from "@headlessui/react";
// import { Fragment } from "react";
// import { getAnchorLink } from "@templates/listing/Header/constants";
import clsx from "clsx";
// import { Link } from "@mui/material";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "@mui/material";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import UserImage from "@templates/listing/Header/UserImage";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import WarningModal from "./WarningModal";
// import { navLevels } from "@hooks/community/useCommunityParams";
// import { navLevelsV2 } from "@hooks/community/v2/useCommunityParamsV2";
// import clsx from "clsx";
// import UserImage from "./UserImage";

interface Props {
  // name?: string;
  // userKey?: string;
  headerItems?: (string | null)[];
  // viewStyle?: "mobile" | "desktop";
  signedInUserImage?: CloudinaryMedia | AWSMedia;
  signedInUserKey?: string;
  signedInUserName?: string;
  uid?: string;
  eventId?: string;
  onSignIn: () => void;
  onSignOut?: () => void;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  // onNavChange: (navLevel: navLevelsV2) => void;
  onGoBack?: () => void;
  noSignIn?: boolean;
}

const HeaderV2: React.FC<Props> = ({
  // name,
  headerItems,
  // viewStyle,
  // userKey,
  signedInUserImage,
  onGoBack,
  signedInUserKey,
  noSignIn,
  signedInUserName,
  uid,
  onSignIn,
  eventId,
  onSignOut,
  authStatus,
  // onNavChange,
}) => {
  const router = useRouter();

  const handleMenuClick = (item: string) => {
    if (item === "My Profile") {
      router.push(`/p/${uid}`);
    } else if (item === "Leave Team") {
      toggleWarning(true);
    }
  };

  const [showWarning, toggleWarning] = useState<boolean>(false);

  const onSuccess = () => {
    router.push(`/teams`);
  };

  // console.log("headerItems", headerItems, uid);
  // console.log("uid", uid);
  return (
    <div className="">
      {uid && eventId ? (
        <WarningModal
          uid={uid}
          onSuccess={onSuccess}
          eventId={eventId}
          isOpen={showWarning}
          onClose={() => toggleWarning(false)}
        />
      ) : null}
      <div className="flex px-4 py-4 h-20  justify-between items-center">
        {onGoBack ? (
          <div onClick={onGoBack} className="cursor-pointer">
            <img
              className="w-8 h-8  object-cover"
              src="https://img.icons8.com/ios-filled/100/000000/left.png"
            />
          </div>
        ) : (
          <div />
        )}
        {noSignIn ? null : uid && onSignOut ? (
          <div onClick={onSignOut} className="cursor-pointer">
            <p className="text-orange-500">Sign out</p>
          </div>
        ) : uid && !headerItems ? (
          <Link href={`/p/${uid}`}>
            <UserImage image={signedInUserImage} name={signedInUserName} />
          </Link>
        ) : !uid && authStatus === "FAILED" ? (
          <div onClick={onSignIn} className="cursor-pointer">
            <p className="text-orange-500">Sign in</p>
          </div>
        ) : null}

        {/* {userKey ? (
          <Link href={`/${userKey}`}>
            <div>
              <HeaderItem name={name} textSize="2xl" font="medium" />
            </div>
          </Link>
        ) : (
          <div>
            <HeaderItem name={name} textSize="2xl" font="medium" />
          </div>
        )} */}

        {headerItems ? (
          <Menu as="div" className="relative  inline-block text-left">
            <Menu.Button className="p-0 m-0">
              <UserImage image={signedInUserImage} name={signedInUserName} />
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
              <Menu.Items className="absolute  right-0 w-56 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="">
                  {headerItems.map((item) => {
                    if (item)
                      return (
                        <div key={item}>
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={() => handleMenuClick(item)}
                                className={clsx(
                                  `${
                                    active
                                      ? "bg-gray-200 text-orange-500 font-medium"
                                      : item !== "Leave Team"
                                      ? "text-gray-900"
                                      : ""
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`,
                                  item === "Leave Team"
                                    ? "text-red-500 font-semibold"
                                    : ""
                                )}
                              >
                                <div
                                  className="w-0 h-5 mr-2"
                                  aria-hidden="true"
                                />
                                {item}
                              </div>
                            )}
                          </Menu.Item>
                        </div>
                      );
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : null}

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

        {/* {headerItems.length > 0 && uid ? (
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="p-0 m-0">
              <UserImage image={signedInUserImage} name={signedInUserName} />
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
                              <div
                                onClick={() => handleMenuClick(item)}
                                className={`${
                                  active
                                    ? "bg-gray-200 text-orange-500 font-medium"
                                    : "text-gray-900"
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                              >
                                <div
                                  className="w-0 h-5 mr-2"
                                  aria-hidden="true"
                                />
                                {item}
                              </div>
                            )}
                          </Menu.Item>
                        </div>
                      );
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : !uid && authStatus === "FAILED" ? (
          <div onClick={onSignIn} className="cursor-pointer">
            <p className="text-orange-500">Sign in</p>
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

export default HeaderV2;
