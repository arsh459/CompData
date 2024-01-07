import { profileNavTypes } from "@hooks/profile/useProfileParams";
import clsx from "clsx";

interface Props {
    selected: profileNavTypes;
    onProfileSubNav: (newNav: profileNavTypes) => void;
    highlightColor?: string;
    isVersion2?: boolean;
}

const navItems: { text: string; key: profileNavTypes }[] = [
    {
        text: "Activities",
        key: "activities",
    },
    {
        text: "Events",
        key: "events",
    },
    {
        text: "Prizes",
        key: "prizes",
    },
];

const navItemsV2: { text: string; key: profileNavTypes }[] = [
    {
        text: "Activities",
        key: "activities",
    },
    {
        text: "Teams",
        key: "teams",
    },
    {
        text: "Wins",
        key: "wins",
    },
];

const UserNav: React.FC<Props> = ({
    selected,
    onProfileSubNav,
    highlightColor,
    isVersion2,
}) => {
    return (
        <div
            className={clsx(
                isVersion2 ? "flex border-y border-white bg-[#D6D6E4]" : "flex"
            )}
        >
            {(isVersion2 ? navItemsV2 : navItems).map((item) => (
                <div
                    onClick={() => onProfileSubNav(item.key)}
                    key={item.key}
                    className="w-1/3"
                >
                    <p
                        className={clsx(
                            selected === item.key
                                ? "font-bold"
                                : "font-semibold",
                            "text-lg h-12",
                            "grid place-items-center",
                            "cursor-pointer"
                        )}
                        style={{
                            color:
                                selected === item.key
                                    ? highlightColor
                                    : "#6B6B6B",
                        }}
                    >
                        {item.text}
                    </p>
                    <div
                        className="w-full h-1"
                        style={{
                            backgroundColor:
                                selected === item.key ? highlightColor : "",
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default UserNav;
