import Button from "@components/button";
import LinkInput from "@templates/editEvent/Form/SocialMedia/LinkInput";
import {
  externalLinkIcon,
  fbIcon,
  instaIcon,
  linkedInIcon,
  youtubeIcon,
} from "./constants";

interface Props {
  heading: string;
  helperText: string;
  instagramLink: string | undefined;
  linkedInLink: string | undefined;
  youtubeLink: string | undefined;
  externalLink: string | undefined;
  facebookProfile: string | undefined;
  onSocialMediaChange: (
    handle:
      | "instagramLink"
      | "linkedInLink"
      | "youtubeLink"
      | "externalLink"
      | "facebookProfile",
    value: string
  ) => void;
  //   value: string | undefined;
  //   onChangeText: (newVal: string) => void;
  buttonText: string;
  onButtonPress: () => void;
  leftButtonText?: string;
  leftButtonOnPress?: () => void;
  //   multiline?: boolean;
  //   placeholder: string;
}

const SocialLinkInput: React.FC<Props> = ({
  heading,
  helperText,
  instagramLink,
  linkedInLink,
  youtubeLink,
  externalLink,
  facebookProfile,
  buttonText,
  onButtonPress,
  onSocialMediaChange,
  leftButtonOnPress,
  leftButtonText,
  //   multiline,
  //   placeholder,
}) => {
  return (
    <div>
      <div className="pb-4">
        <div className="pb-4">
          <p className="text-4xl text-gray-600 font-medium">{heading}</p>
          <p className="text-sm text-gray-600 font-light pt-1">{helperText}</p>
        </div>

        <div className="">
          <LinkInput
            autofocus={true}
            iconAlt="Instagram"
            icon={instaIcon}
            value={instagramLink}
            onChangeText={(value) =>
              onSocialMediaChange("instagramLink", value)
            }
            placeholder="https://instagram.com/yourhandle"
          />
        </div>
        <div className="pt-4">
          <LinkInput
            autofocus={false}
            iconAlt="Facebook"
            icon={fbIcon}
            value={facebookProfile}
            onChangeText={(value) =>
              onSocialMediaChange("facebookProfile", value)
            }
            placeholder="https://facebook.com/yourPage"
          />
        </div>
        <div className="pt-4">
          <LinkInput
            autofocus={false}
            iconAlt="YouTube"
            icon={youtubeIcon}
            value={youtubeLink}
            onChangeText={(value) => onSocialMediaChange("youtubeLink", value)}
            placeholder="https://youtube.com/yourChannel"
          />
        </div>
        <div className="pt-4">
          <LinkInput
            autofocus={false}
            iconAlt="LinkedIn"
            icon={linkedInIcon}
            value={linkedInLink}
            onChangeText={(value) => onSocialMediaChange("linkedInLink", value)}
            placeholder="https://linkedin.com/yourProfile"
          />
        </div>
        <div className="pt-4">
          <LinkInput
            autofocus={false}
            iconAlt="Website"
            icon={externalLinkIcon}
            value={externalLink}
            onChangeText={(value) => onSocialMediaChange("externalLink", value)}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      <div className="flex">
        {leftButtonOnPress && leftButtonText ? (
          <div className="pr-2">
            <Button appearance="control" onClick={leftButtonOnPress}>
              <div className="pl-2 pr-2">
                <p className="capitalize text-gray-700 font-medium">
                  {leftButtonText}
                </p>
              </div>
            </Button>
          </div>
        ) : null}
        <Button appearance="contained" onClick={onButtonPress}>
          <div className="pl-2 pr-2">
            <p className="capitalize">{buttonText}</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SocialLinkInput;
