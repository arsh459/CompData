// import { weEventTrack } from "@analytics/webengage/user/userLog";
// import { universities } from "@constants/organization";
// import { boatParamQueryV5 } from "@hooks/joinBoat/V5/useSection";
// import { weEventTrack } from "@analytics/webengage/user/userLog";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { LocalUser } from "@models/User/User";
import { TextField } from "@mui/material";
// import { useRouter } from "next/router";
// import { useState } from "react";
import JoinBoatWrapperV2 from "../../JoinBoatWrapper";

interface Props {
  localUser?: LocalUser | undefined;
  onEmailUpdate: (val: string) => void;

  onGiftCreate: (fromEmail: string) => Promise<void>;
}

const GiftDetails: React.FC<Props> = ({
  localUser,
  onEmailUpdate,

  onGiftCreate,
}) => {
  // const [guestName, setGuestName] = useState<string>("");
  // const [guestPhone, setGuestPhone] = useState<string>("");
  // const [guestEmail, setGuestEmail] = useState<string>("");
  // const [yourEm]

  const onProceed = () => {
    onGiftCreate(localUser?.email ? localUser.email : "");

    weEventTrack("giftGifterDetails_clickNext", {});
  };

  // const router = useRouter();

  return (
    <JoinBoatWrapperV2
      headText="Gift SocialBoat"
      title="What's your email?"
      current={6}
      onNext={onProceed}
      disabled={false}
    >
      <div className="JoinBoatField py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"abc@gmail.com"}
          label={"Your email"}
          variant="outlined"
          onChange={(newVal) => onEmailUpdate(newVal.target.value)}
          value={localUser?.email}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </JoinBoatWrapperV2>
  );
};

export default GiftDetails;
