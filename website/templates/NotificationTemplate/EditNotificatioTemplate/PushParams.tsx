import {
  NavigationScreen,
  NotficationTypeV2,
  RemoteNotifeeData,
} from "@models/Notifications";
import { Checkbox, MenuItem, TextField } from "@mui/material";
import { useState } from "react";

const intialNavigateToParamsObj = { key: "", val: "" };

interface Props {
  pushParams?: RemoteNotifeeData;
  onUpdatePushParamsStringVal: (
    val: string | number,
    key: "imageUrl" | "title" | "body" | "subtitle" | "badgeId" | "badgeDay"
  ) => void;
  onUpdatePushParamsNotificationType: (val: NotficationTypeV2) => void;
  onUpdatePushParamsNavigateTo: (val: NavigationScreen) => void;
  onAddPushParamsNavigateToParams: (val: { [key: string]: string }) => void;
  onRemovePushParamsNavigateToParams: (key: string) => void;
  onUpdatePushParamsImgRounded: (val: boolean) => void;
}

const PushParams: React.FC<Props> = ({
  pushParams,
  onUpdatePushParamsStringVal,
  onUpdatePushParamsNotificationType,
  onUpdatePushParamsNavigateTo,
  onAddPushParamsNavigateToParams,
  onRemovePushParamsNavigateToParams,
  onUpdatePushParamsImgRounded,
}) => {
  const [navigateToParamsObj, setNavigateToParamsObj] = useState<{
    key: string;
    val: string;
  }>(intialNavigateToParamsObj);

  const onAddNavigateToParamsObj = () => {
    if (navigateToParamsObj.key !== "" && navigateToParamsObj.val !== "") {
      onAddPushParamsNavigateToParams({
        [navigateToParamsObj.key]: navigateToParamsObj.val,
      });
      setNavigateToParamsObj(intialNavigateToParamsObj);
    }
  };

  return (
    <div style={{ width: "100%" }} className="pt-4 flex flex-col">
      <TextField
        select
        style={{ flex: 1 }}
        placeholder={"Push Notification Type"}
        label={"Push Notification Type"}
        variant="outlined"
        onChange={(e) =>
          onUpdatePushParamsNotificationType(
            e.target.value as NotficationTypeV2
          )
        }
        value={pushParams?.notificationType || "NO ENTRY"}
      >
        <MenuItem value={"text"}>Text</MenuItem>
        <MenuItem value={"image"}>Image</MenuItem>
        <MenuItem value={"message"}>Message</MenuItem>
        <MenuItem value={"NO ENTRY"}>NO ENTRY</MenuItem>
      </TextField>

      <div className="w-8 aspect-1" />

      <TextField
        select
        style={{ flex: 1 }}
        placeholder={"Push Navigate To"}
        label={"Notification Navigate To"}
        variant="outlined"
        onChange={(e) =>
          onUpdatePushParamsNavigateTo(e.target.value as NavigationScreen)
        }
        value={pushParams?.navigateTo || "NO ENTRY"}
      >
        <MenuItem value={"Home"}>Home</MenuItem>
        <MenuItem value={"Period"}>Period</MenuItem>
        <MenuItem value={"BlogScreen"}>BlogScreen</MenuItem>
        <MenuItem value={"Upgrade"}>Upgrade</MenuItem>
        <MenuItem value={"ReelView"}>ReelView</MenuItem>
        <MenuItem value={"Workout"}>Workout</MenuItem>
        <MenuItem value={"RecipeeDetailScreen"}>RecipeeDetailScreen</MenuItem>
        <MenuItem value={"SakhiExplainer"}>Sakhi Explainer</MenuItem>
        <MenuItem value={"ChatRoom"}>Sakhi Chatroom</MenuItem>
        <MenuItem value={"StartNewChat"}>Sakhi New Chat</MenuItem>
        <MenuItem value={"ProScreen"}>Pro Screen</MenuItem>
        <MenuItem value={"ChallengeDetailScreen"}>
          ChallengeDetailScreen
        </MenuItem>
        <MenuItem value={"NO ENTRY"}>NO ENTRY</MenuItem>
      </TextField>

      <div className="w-8 aspect-1" />

      <div style={{ flex: 1 }} className="border p-1">
        <p className="text-base">Notification Navigate To Params</p>
        <div className="flex items-center py-4">
          <TextField
            style={{ flex: 1 }}
            placeholder={"Params Key"}
            label={"Params Key"}
            variant="outlined"
            value={navigateToParamsObj.key}
            onChange={(val) =>
              setNavigateToParamsObj((prev) => ({
                ...prev,
                key: val.target.value,
              }))
            }
            type="string"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{ flex: 1, marginInline: 8 }}
            placeholder={"Params Value"}
            label={"Params Value"}
            variant="outlined"
            value={navigateToParamsObj.val}
            onChange={(val) =>
              setNavigateToParamsObj((prev) => ({
                ...prev,
                val: val.target.value,
              }))
            }
            type="string"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <button
            onClick={onAddNavigateToParamsObj}
            className="bg-red-500 text-white px-4 py-1"
          >
            Add
          </button>
        </div>
        {pushParams?.navigateToParams &&
        Object.keys(pushParams?.navigateToParams).length ? (
          <div className="p-1 border">
            {Object.keys(pushParams.navigateToParams).map((key, index) => (
              <div
                key={`${key}-${index}`}
                className="border flex justify-between items-center p-1 m-1"
              >
                <span>
                  {key}:{" "}
                  {pushParams.navigateToParams &&
                    pushParams.navigateToParams[key]}
                </span>
                <button onClick={() => onRemovePushParamsNavigateToParams(key)}>
                  &#10060;
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="w-8 aspect-1" />

      {pushParams?.notificationType === "image" ? (
        <>
          <TextField
            style={{ flex: 1 }}
            placeholder={"Push Image Url"}
            label={"Push Image Url"}
            variant="outlined"
            value={pushParams?.imageUrl}
            onChange={(val) =>
              onUpdatePushParamsStringVal(val.target.value, "imageUrl")
            }
            type="string"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className="flex items-center pb-8">
            <p className="text-base">Push Image Rounded</p>
            <Checkbox
              value={pushParams?.imgRounded}
              onChange={() =>
                onUpdatePushParamsImgRounded(!pushParams?.imgRounded)
              }
            />
          </div>
        </>
      ) : null}

      <TextField
        style={{ flex: 1 }}
        placeholder={"Push Title"}
        label={"Push Title"}
        variant="outlined"
        value={pushParams?.title}
        onChange={(val) =>
          onUpdatePushParamsStringVal(val.target.value, "title")
        }
        type="string"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <div className="w-8 aspect-1" />

      <TextField
        style={{ flex: 1 }}
        placeholder={"Push Subtitle"}
        label={"Push Subtitle"}
        variant="outlined"
        value={pushParams?.subtitle}
        onChange={(val) =>
          onUpdatePushParamsStringVal(val.target.value, "subtitle")
        }
        type="string"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <div className="w-8 aspect-1" />

      <TextField
        style={{ flex: 1 }}
        placeholder={"Message Body"}
        label={"Message Body"}
        variant="outlined"
        value={pushParams?.body}
        onChange={(val) =>
          onUpdatePushParamsStringVal(val.target.value, "body")
        }
        type="string"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        style={{ flex: 1 }}
        placeholder={"See from dashboard"}
        label={"Badge Id (Workout Reminder)"}
        variant="outlined"
        value={pushParams?.badgeId}
        onChange={(val) =>
          onUpdatePushParamsStringVal(val.target.value, "badgeId")
        }
        type="string"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <div className="w-8 aspect-1" />

      <TextField
        style={{ flex: 1 }}
        placeholder={"See from dashboard"}
        type="number"
        label={"Badge Day (Workout Reminder)"}
        variant="outlined"
        value={pushParams?.badgeDay}
        onChange={(val) =>
          onUpdatePushParamsStringVal(parseInt(val.target.value), "badgeDay")
        }
        InputLabelProps={{
          shrink: true,
        }}
      />

      <div className="w-8 aspect-1" />
    </div>
  );
};

export default PushParams;
