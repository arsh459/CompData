import { useNotificationTemplate } from "@hooks/notifications/useNotificationTemplate";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { channelType, notificationScheduleType } from "@models/Notifications";
import { MenuItem, TextField } from "@mui/material";
import PushParams from "./PushParams";
import WAParams from "./WAParams";

interface Props {
  templateId: string;
}

const EditNotificatioTemplate: React.FC<Props> = ({ templateId }) => {
  const {
    notificationTemplate,
    onSave,
    onUpdateTemplateName,
    onUpdateChannel,
    onUpdateScheduleType,
    onAddWAParams,
    onRemoveWAParams,
    onUpdatePushParamsStringVal,
    onUpdatePushParamsNotificationType,
    onUpdatePushParamsNavigateTo,
    onAddPushParamsNavigateToParams,
    onRemovePushParamsNavigateToParams,
    onUpdatePushParamsImgRounded,
  } = useNotificationTemplate(templateId);

  return (
    <div className="p-4 flex flex-col">
      <p className="text-xl font-bold">Edit Notification Template</p>
      <div style={{ width: "50%" }} className="flex flex-col">
        <div className="w-8 aspect-1" />

        <TextField
          disabled={true}
          style={{ flex: 1 }}
          placeholder={"Notification Template Id"}
          label={"Notification Template Id"}
          variant="outlined"
          value={notificationTemplate.id}
          type="string"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <div className="w-8 aspect-1" />

        <TextField
          style={{ flex: 1 }}
          placeholder={"Notification Template Name"}
          label={"Notification Template Name"}
          variant="outlined"
          value={notificationTemplate.templateName}
          onChange={(val) => onUpdateTemplateName(val.target.value)}
          type="string"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <div className="w-8 aspect-1" />

        <TextField
          select
          style={{ flex: 1 }}
          placeholder={"Notification Template Schedule Type"}
          label={"Notification Template Schedule Type"}
          variant="outlined"
          onChange={(e) =>
            onUpdateScheduleType(e.target.value as notificationScheduleType)
          }
          value={notificationTemplate.scheduleType || "NO ENTRY"}
        >
          <MenuItem value={"onDemand"}>On Demand</MenuItem>
          <MenuItem value={"cron"}>CRON</MenuItem>
          <MenuItem value={"onMemberAddCohort"}>On Member Add Cohort</MenuItem>
          <MenuItem value={"NO ENTRY"}>NO ENTRY</MenuItem>
        </TextField>

        <div className="w-8 aspect-1" />

        <TextField
          select
          style={{ flex: 1 }}
          placeholder={"Notification Template Channel"}
          label={"Notification Template Channel"}
          variant="outlined"
          onChange={(e) => onUpdateChannel(e.target.value as channelType)}
          value={notificationTemplate.channel || "NO ENTRY"}
        >
          <MenuItem value={"push"}>Push Notification</MenuItem>
          <MenuItem value={"wa"}>WhatsApp</MenuItem>
          <MenuItem value={"NO ENTRY"}>NO ENTRY</MenuItem>
        </TextField>

        <div className="w-8 aspect-1" />

        <div className="border p-2">
          <p className="text-xl">{`Notification Template ${
            notificationTemplate.channel === "push"
              ? "Push"
              : notificationTemplate.channel === "wa"
              ? "WhatsApp"
              : ""
          } Params`}</p>
          {notificationTemplate.channel === "push" ? (
            <PushParams
              pushParams={notificationTemplate.pushParams}
              onUpdatePushParamsStringVal={onUpdatePushParamsStringVal}
              onUpdatePushParamsNotificationType={
                onUpdatePushParamsNotificationType
              }
              onUpdatePushParamsNavigateTo={onUpdatePushParamsNavigateTo}
              onAddPushParamsNavigateToParams={onAddPushParamsNavigateToParams}
              onRemovePushParamsNavigateToParams={
                onRemovePushParamsNavigateToParams
              }
              onUpdatePushParamsImgRounded={onUpdatePushParamsImgRounded}
            />
          ) : notificationTemplate.channel === "wa" ? (
            <WAParams
              waParams={notificationTemplate.waParams}
              onAddWAParams={onAddWAParams}
              onRemoveWAParams={onRemoveWAParams}
            />
          ) : null}
        </div>
      </div>

      <div className="w-20 aspect-1" />

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavComV2 cta={"Save Notification Template"} onClick={onSave} />
      </div>
    </div>
  );
};

export default EditNotificatioTemplate;
