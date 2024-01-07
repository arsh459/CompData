import SettingIcon from "@components/SvgIcons/SettingIcon";
import { Menu, Transition } from "@headlessui/react";
import { useState } from "react";
import { useChangePlan } from "@templates/CoursePageTemplate/useChangePlan";
import ChangePlanModalComp from "@templates/CoursePageTemplate/ChangePlanModalComp";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { useBadge } from "@hooks/badges/useBadge";
import { UserInterface } from "@models/User/User";

interface Props {
  remoteUser: UserInterface;
}

const SettingMenu: React.FC<Props> = ({ remoteUser }) => {
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { badge } = useBadge(TEAM_ALPHABET_GAME, remoteUser.badgeId);

  const {
    noModal,
    section,
    onSetUnknown,
    onGoToSection,
    modalProps,
    setModalProps,
  } = useChangePlan();

  return (
    <>
      <Menu
        as="div"
        className="relative z-0 select-none"
        onBlur={() => setIsDropdownOpen(false)}
      >
        <Menu.Items static className="focus:outline-none">
          <button
            className="py-1 flex justify-between mx-1 items-center cursor-pointer"
            onClick={() => setIsDropdownOpen((p) => !p)}
          >
            <div className="w-5 aspect-1 mr-2">
              <SettingIcon color="#23262F" />
            </div>
          </button>
        </Menu.Items>

        <Transition
          show={isDropdownOpen}
          enter="transition duration-100"
          enterFrom="transform opacity-0 h-0"
          enterTo="transform opacity-100 h-max"
          leave="transition duration-100"
          leaveFrom="transform opacity-100 h-max"
          leaveTo="transform opacity-0 h-0"
          className="absolute right-0 top-full -z-10 rounded-2xl focus:outline-none bg-white"
        >
          {/* <Menu.Item>
            <button
              onClick={() => onGoToSection("changeProgram")}
              className={`w-full whitespace-nowrap py-2 text-[#494949] text-sm px-4 text-center font-nunitoM cursor-pointer`}
            >
              Change Program
            </button>
          </Menu.Item> */}
          <Menu.Item>
            <button
              onClick={() => onGoToSection("dateOfStartProgram")}
              className={`w-full whitespace-nowrap py-2 text-[#494949] text-sm text-center border-t font-nunitoM border-[#00000026] cursor-pointer`}
            >
              Change Date Start
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              onClick={() => onGoToSection("preferWorkoutDays")}
              className={`w-full whitespace-nowrap text-[#494949] px-4 py-2 text-sm cursor-pointer text-center border-t font-nunitoM border-[#00000026]`}
            >
              Prefer Workout Days
            </button>
          </Menu.Item>
        </Transition>
      </Menu>

      {badge ? (
        <ChangePlanModalComp
          section={section}
          modalProps={modalProps}
          setModalProps={setModalProps}
          badge={badge}
          user={remoteUser}
          loading={loading}
          setLoading={setLoading}
          onSetUnknown={onSetUnknown}
          onGoToSection={onGoToSection}
          onProceed={async () => {
            onSetUnknown();
          }}
          noModal={noModal}
        />
      ) : null}
    </>
  );
};

export default SettingMenu;
