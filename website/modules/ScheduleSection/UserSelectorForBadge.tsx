import { useBadgeUsersV2 } from "@hooks/badges/useBadgeUsersV2";
import { UserInterface } from "@models/User/User";
import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  badgeId: string;
  selectedUser?: UserInterface;
  setSelectedUser: (newUser: UserInterface) => void;
}

const UserSelectorForBadge: React.FC<Props> = ({
  badgeId,
  selectedUser,
  setSelectedUser,
}) => {
  const [userToggle, setUserToggle] = useState<boolean>(false);
  const { users } = useBadgeUsersV2(badgeId, userToggle);

  const toggleUser = (newId: string) => {
    const filterd = users.filter((item) => item.uid === newId);

    if (filterd.length) {
      setSelectedUser(filterd[0]);
    }
  };

  return (
    <div>
      <div className="pb-4 flex items-center">
        <Button variant="contained" onClick={() => setUserToggle((p) => !p)}>
          {!userToggle ? "Get Users" : "Hide Users"}
        </Button>
      </div>
      {userToggle ? (
        <TextField
          select
          style={{ width: "100%" }}
          placeholder={"Assigned user"}
          label={"Select User"}
          variant="outlined"
          onChange={(e) => {
            toggleUser(e.target.value);
          }}
          value={selectedUser?.uid || "NO ENTRY"}
          className="uppercase"
          InputLabelProps={{
            shrink: true,
          }}
        >
          {users.map((each) => (
            <MenuItem key={each.uid} value={each.uid} className="uppercase">
              {each.name}
            </MenuItem>
          ))}
          <MenuItem value="NO ENTRY">NO ENTRY</MenuItem>
        </TextField>
      ) : null}
    </div>
  );
};

export default UserSelectorForBadge;
