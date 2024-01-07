import clsx from "clsx";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "@mui/material";
import UserImage from "@templates/listing/Header/UserImage";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import WarningModal from "./WarningModal";
import { UserInterface } from "@models/User/User";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  // hideHeader?: boolean;
  headerItems?: (string | null)[];
  signedInUser?: UserInterface;
  eventId?: string;
  onSignIn: () => void;
  onSignOut?: () => void;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  onGoBack?: () => void;
  headingText?: string;
  headingLightText?: string;
  bgClassStr?: string;
  tone?: "dark";
  noSignIn?: boolean;
}

const HeaderV4: React.FC<Props> = ({
  // hideHeader,
  headerItems,
  signedInUser,
  eventId,
  onSignIn,
  onSignOut,
  onGoBack,
  authStatus,
  headingText,
  headingLightText,
  bgClassStr,
  tone,
  noSignIn,
}) => {
  const router = useRouter();
  const [showWarning, toggleWarning] = useState<boolean>(false);

  const handleMenuClick = (item: string) => {
    if (item === "My Profile") {
      router.push(`/p/${signedInUser?.uid}`);
      weEventTrack("headerV4_profile", {
        pageName: `/p/${signedInUser?.uid}`,
        profileName: signedInUser?.name ? signedInUser.name : "no_profileName",
        userLevel: signedInUser?.userLevelV2 ? signedInUser.userLevelV2 : 0,
      });
    } else if (item === "Leave Team") {
      toggleWarning(true);
      weEventTrack("headerV4_leaveTeam", {
        userId: signedInUser?.uid ? signedInUser.uid : "no_userId",
        eventId: eventId ? eventId : "no_eventId",
      });
    }
  };

  const onSuccess = () => {
    router.push(`/teams`);
  };

  return (
    <>
      {signedInUser && eventId ? (
        <WarningModal
          uid={signedInUser.uid}
          onSuccess={onSuccess}
          eventId={eventId}
          isOpen={showWarning}
          onClose={() => toggleWarning(false)}
        />
      ) : null}

      <div
        className={clsx(
          // hideHeader ? "-translate-y-full" : "",
          "max-w-md mx-auto w-full h-16 iphoneX:h-20 px-4 flex items-center sticky -top-0.5 z-50 transition-all",
          bgClassStr ? bgClassStr : ""
        )}
      >
        {onGoBack ? (
          <div className="cursor-pointer" onClick={onGoBack}>
            <img
              src={
                tone === "dark"
                  ? `https://ik.imagekit.io/socialboat/Component_5_BYt6BOh13.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650970656691`
                  : `https://ik.imagekit.io/socialboat/Component_5_ryDeY1pRB.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651822656712`
              }
              alt="Back Icon"
              className="w-6 iphoneX:w-8"
            />
          </div>
        ) : null}

        <div
          className={clsx(
            "flex-1 text-xl iphoneX:text-2xl font-extrabold line-clamp-1",
            onGoBack ? "mx-4" : "mr-4",
            !tone && "text-white"
          )}
        >
          {headingText}
          {headingLightText ? (
            <span className="font-light">{headingLightText}</span>
          ) : null}
        </div>

        {noSignIn ? null : signedInUser && onSignOut ? (
          <div onClick={onSignOut} className="cursor-pointer">
            <p className="text-orange-500">Sign out</p>
          </div>
        ) : signedInUser && !headerItems ? (
          <Link
            href={`/p/${signedInUser.uid}`}
            onClick={() =>
              weEventTrack("headerV4_profile", {
                pageName: `/p/${signedInUser.uid}`,
                profileName: signedInUser.name
                  ? signedInUser.name
                  : "no_profileName",
                userLevel: signedInUser.userLevelV2
                  ? signedInUser.userLevelV2
                  : 0,
              })
            }
          >
            <UserImage
              image={signedInUser.profileImage}
              name={signedInUser.name}
              boxWidth="w-10 iphoneX:w-12"
              boxHeight="h-10 iphoneX:h-12"
            />
          </Link>
        ) : !signedInUser && authStatus === "FAILED" ? (
          <div onClick={onSignIn} className="cursor-pointer z-50">
            <p className="text-orange-500">Sign in</p>
          </div>
        ) : null}

        {headerItems ? (
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="p-0 m-0">
              <UserImage
                image={signedInUser?.profileImage}
                name={signedInUser?.name}
                boxWidth="w-10 iphoneX:w-12"
                boxHeight="h-10 iphoneX:h-12"
              />
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
      </div>
    </>
  );
};

export default HeaderV4;
