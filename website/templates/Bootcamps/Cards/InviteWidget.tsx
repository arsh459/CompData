import { TextField } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import { UserInterface } from "@models/User/User";

interface Props {
  id: string;
}

const InviteWidget: React.FC<Props> = ({ id }) => {
  const [uid, setUID] = useState<string>("");

  const onInvite = async () => {
    if (uid) {
      const remoteUser = await getDoc(doc(db, "users", uid));

      const toInvite = remoteUser.data() as UserInterface | undefined;
      if (toInvite) {
        if (toInvite.bootcampDetails?.bootcampId) {
          alert(
            `User already in bootcamp with id: ${toInvite.bootcampDetails?.bootcampId}`
          );
        } else {
          await updateDoc(doc(db, "users", uid), {
            bootcampDetails: {
              bootcampId: id,
            },
          });

          setUID("");
        }
      } else {
        alert("Wrong UID");
      }
    }
  };

  return (
    <div className="pt-8 px-4">
      <p>To Invite New User</p>
      <div className="flex py-2">
        <TextField
          style={{ width: "50%" }}
          label={"UID to invite"}
          variant="outlined"
          onChange={(val) => setUID(val.target.value)}
          value={uid}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className="pl-4">
          <Button onClick={onInvite} variant="contained">
            Invite User
          </Button>
        </div>
      </div>
      <p className="pt-0 text-red-500">THIS WILL NOT SEND A NOTIFICATION</p>
    </div>
  );
};

export default InviteWidget;
