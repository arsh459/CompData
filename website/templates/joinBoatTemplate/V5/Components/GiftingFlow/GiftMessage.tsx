// import { weEventTrack } from "@analytics/webengage/user/userLog";
// import { universities } from "@constants/organization";
// import { boatParamQueryV5 } from "@hooks/joinBoat/V5/useSection";
// import { weEventTrack } from "@analytics/webengage/user/userLog";
import { LocalUser } from "@models/User/User";
import { TextField } from "@mui/material";
// import { useRouter } from "next/router";
// import { useState } from "react";
import JoinBoatWrapperV2 from "../../JoinBoatWrapper";

interface Props {
  localUser?: LocalUser | undefined;
  onGiftUpdate: (key: "toName" | "message", val: string) => void;
  onGiftSave: () => void;
}

const GiftMessage: React.FC<Props> = ({
  localUser,
  onGiftUpdate,
  onGiftSave,
}) => {
  // const [guestName, setGuestName] = useState<string>("");
  // const [guestPhone, setGuestPhone] = useState<string>("");
  // const [guestEmail, setGuestEmail] = useState<string>("");
  // const [yourEm]

  // const router = useRouter();

  return (
    <JoinBoatWrapperV2
      headText="Gift SocialBoat"
      title="Who are you gifting?"
      current={8}
      onNext={onGiftSave}
      disabled={false}
    >
      <div className="JoinBoatField py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Katy"}
          label={"Name of person"}
          variant="outlined"
          onChange={(newVal) => onGiftUpdate("toName", newVal.target.value)}
          value={localUser?.email}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          style={{ width: "100%" }}
          placeholder={"A small fitness gift for you"}
          label={"Your message"}
          variant="outlined"
          onChange={(newVal) => onGiftUpdate("message", newVal.target.value)}
          value={localUser?.email}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </JoinBoatWrapperV2>
  );
};

export default GiftMessage;
