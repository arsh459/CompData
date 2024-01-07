import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import Loading from "@components/loading/Loading";
import { Button } from "@mui/material";
import { useBootcamp } from "@hooks/bootcamps/useBootcamp";

import { MenuItem, TextField } from "@mui/material";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useRouter } from "next/router";
import BackIcon from "public/icons/BackIcon";
import { useState } from "react";
import { iconList, inclusionTypes } from "@models/Bootcamp/interface";
import { saveBootcamp } from "@models/Bootcamp/createUtils";

interface Props {
  id: string;
}

const BootcampFormTemplate: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    bootcamp,
    onMediaUpload,
    onMediaDelete,
    onStringUpdate,
    onNumberUpdate,
    onIncludesAdd,
    onIncludesRemove,
    onIncludesUpdateStr,
    onMainMediaDelete,
    onMainMediaUpdate,
  } = useBootcamp(id);

  const handleSave = async () => {
    if (bootcamp && !loading && bootcamp.id) {
      setLoading(true);
      await saveBootcamp(bootcamp);
    }

    router.back();
  };

  return (
    <div className="p-4">
      <div className="pb-3">
        <p className="text-gray-700 text-4xl font-semibold flex items-center">
          <span onClick={() => router.back()}>
            <BackIcon style={{ height: "30", width: "30", fill: "gray" }} />{" "}
          </span>
          &nbsp; Add Bootcamp
        </p>
      </div>
      <hr />
      {loading ? (
        <div className="flex justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : (
        <>
          <div className="pt-4">
            <UppyWidgetContainer
              media={
                bootcamp && bootcamp.landingMedia ? [bootcamp.landingMedia] : []
              }
              leftButtonText="ADD Landing Image"
              onDelete={() => onMainMediaDelete("landingMedia")}
              uid={bootcamp?.id ? bootcamp.id : "boot"}
              onUpload={(newFiles) =>
                onMainMediaUpdate(newFiles[0], "landingMedia")
              }
              onRemove={() => onMainMediaDelete("landingMedia")}
              screenName="admin"
              taskName="admin"
              heading=""
              helperText=""
              height="none"
              filterButton={true}
              tileHeight="small"
              bgWhite={true}
              styles="rounded-none bg-red-500 border-none text-white"
              containerStyles=" border border-dashed border-2 border-slate-500 bg-gray-100 h-64 flex justify-center items-center"
            />
          </div>

          <div className="pt-4">
            <UppyWidgetContainer
              media={bootcamp && bootcamp.mainMedia ? [bootcamp.mainMedia] : []}
              leftButtonText="ADD Details Image"
              onDelete={() => onMainMediaDelete("mainMedia")}
              uid={bootcamp?.id ? bootcamp.id : "boot"}
              onUpload={(newFiles) =>
                onMainMediaUpdate(newFiles[0], "mainMedia")
              }
              onRemove={() => onMainMediaDelete("mainMedia")}
              screenName="admin"
              taskName="admin"
              heading=""
              helperText=""
              height="none"
              filterButton={true}
              tileHeight="small"
              bgWhite={true}
              styles="rounded-none bg-red-500 border-none text-white"
              containerStyles=" border border-dashed border-2 border-slate-500 bg-gray-100 h-64 flex justify-center items-center"
            />
          </div>

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"What people will call this Bootcamp"}
              label={"Name of Bootcamp"}
              variant="outlined"
              onChange={(val) => onStringUpdate("name", val.target.value)}
              value={bootcamp?.name || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"2"}
              label={"Length of bootcamp"}
              variant="outlined"
              type="number"
              onChange={(val) =>
                onNumberUpdate("length", parseFloat(val.target.value))
              }
              value={bootcamp?.length || 0}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              label={"Epoch of badge Start"}
              variant="outlined"
              type="number"
              onChange={(val) =>
                onNumberUpdate("start", parseFloat(val.target.value))
              }
              value={bootcamp?.start || Date.now()}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <p className="text-red-500 text-xs font-bold pt-1">
              CONTACT ADMIN ASAP, IF YOU CHANGE TIME POST USER INVITE
            </p>
          </div>

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"UID of host"}
              label={"UID of host"}
              variant="outlined"
              onChange={(val) => onStringUpdate("creatorId", val.target.value)}
              value={bootcamp?.creatorId || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"ID of badge users follow"}
              label={"Workout Badge"}
              variant="outlined"
              onChange={(val) => onStringUpdate("badgeId", val.target.value)}
              value={bootcamp?.badgeId || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-8">
            <TextField
              style={{ width: "100%" }}
              placeholder={"ID of badge users follow"}
              label={"Nutrition of Bootcamp"}
              variant="outlined"
              onChange={(val) =>
                onStringUpdate("nutritionBadgeId", val.target.value)
              }
              value={bootcamp?.nutritionBadgeId || ""}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className="pt-4">
            <Button onClick={onIncludesAdd} variant="contained">
              Add Inclusion
            </Button>
          </div>

          {bootcamp?.includes.map((item, index) => {
            return (
              <div className="p-4 border bg-gray-100" key={`bootcamp-${index}`}>
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"Text"}
                  label={"Text of inclusion"}
                  variant="outlined"
                  onChange={(val) =>
                    onIncludesUpdateStr(val.target.value, "text", index)
                  }
                  value={item.text || ""}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <div className="pt-4">
                  <TextField
                    style={{ width: "100%" }}
                    placeholder={"Text"}
                    label={"Link of inclusion"}
                    variant="outlined"
                    onChange={(val) =>
                      onIncludesUpdateStr(val.target.value, "link", index)
                    }
                    value={item.link || ""}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>

                <div className="pt-4">
                  <TextField
                    style={{ width: "100%" }}
                    placeholder={"Text"}
                    label={"Text in Done screen"}
                    variant="outlined"
                    onChange={(val) =>
                      onIncludesUpdateStr(val.target.value, "linkText", index)
                    }
                    value={item.linkText || ""}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>

                <div className="pt-4">
                  <TextField
                    select
                    style={{ width: "100%" }}
                    placeholder={"Icon"}
                    label={"Icon"}
                    variant="outlined"
                    onChange={(e) =>
                      onIncludesUpdateStr(e.target.value, "icon", index)
                    }
                    value={item.icon}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {iconList.map((groupId) => (
                      <MenuItem key={groupId} value={groupId}>
                        {groupId}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <div className="pt-4">
                  <TextField
                    select
                    style={{ width: "100%" }}
                    placeholder={"Inclusion Type"}
                    label={"Type of inclusion"}
                    variant="outlined"
                    onChange={(e) =>
                      onIncludesUpdateStr(e.target.value, "type", index)
                    }
                    value={item.type}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {inclusionTypes.map((groupId) => (
                      <MenuItem key={groupId} value={groupId}>
                        {groupId}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <div className="pt-4">
                  <UppyWidgetContainer
                    media={item && item.img ? [item.img] : []}
                    leftButtonText="ADD Award Image (dimention:100*100)"
                    onDelete={() => onMediaDelete(index)}
                    uid={bootcamp.id}
                    onUpload={(newFiles) => onMediaUpload(newFiles[0], index)}
                    onRemove={() => onMediaDelete(index)}
                    screenName="admin"
                    taskName="admin"
                    heading=""
                    helperText=""
                    height="none"
                    filterButton={true}
                    tileHeight="small"
                    bgWhite={true}
                    styles="rounded-none bg-red-500 border-none text-white"
                    containerStyles=" border border-dashed border-2 border-slate-500 bg-gray-100 h-64 flex justify-center items-center"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => onIncludesRemove(index)}
                    variant="contained"
                  >
                    Remove inclusion
                  </Button>
                </div>
              </div>
            );
          })}
        </>
      )}

      <div className="py-20" />

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavComV2 cta={"Save Bootcamp"} onClick={handleSave} />
      </div>
    </div>
  );
};

export default BootcampFormTemplate;
