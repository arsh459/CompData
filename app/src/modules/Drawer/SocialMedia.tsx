import SvgIcons from "@components/SvgIcons";
import { socialmediaLinks } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { View, Linking, Pressable } from "react-native";

export type socialMediaIconTypes = "instagram" | "linkedin" | "facebook";

export type SocialMediaTypes = {
  item: socialMediaIconTypes;
  action: () => void;
};

interface Props {
  contentColor?: string;
}

const SocialMedia: React.FC<Props> = ({ contentColor }) => {
  const socialMediaItems: SocialMediaTypes[] = [
    {
      item: "instagram",
      action: () => {
        Linking.openURL(socialmediaLinks.instagram);
        weEventTrack("drawer_clickInsta", {});
      },
    },
    {
      item: "linkedin",
      action: () => {
        Linking.openURL(socialmediaLinks.linkedin);
        weEventTrack("drawer_clickLinkedIn", {});
      },
    },
    {
      item: "facebook",
      action: () => {
        Linking.openURL(socialmediaLinks.facebook);
        weEventTrack("drawer_clickFB", {});
      },
    },
  ];

  return (
    <View
      className="flex flex-row justify-evenly items-center py-4 border-b"
      style={{ borderBottomColor: `${contentColor}60` }}
    >
      {socialMediaItems.map((each) => (
        <Pressable
          key={each.item}
          onPress={each.action}
          className="w-5 iphoneX:w-7 aspect-square"
        >
          <SvgIcons iconType={each.item} color={contentColor} />
        </Pressable>
      ))}
    </View>
  );
};

export default SocialMedia;
