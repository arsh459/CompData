import clsx from "clsx";
import { TextField } from "@mui/material";
import { Coord } from "@models/Tasks/Task";
import Button from "@components/button";

interface Props {
  onUpdateCoords: (newCoords: Coord[]) => void;
  coords?: Coord[];
  //   addDay: (day: number) => void;
  //   removeDay: (day: number) => void;
  //   days?: number[];
  //   priorityObj?: { [day: number]: number };
}

const CoordsAdder: React.FC<Props> = ({ coords, onUpdateCoords }) => {
  // eventKey why is this needed?
  // console.log("priorityObj", priorityObj);
  const onAddNewCoords = () => {
    onUpdateCoords([...(coords ? coords : []), { latitude: 0, longitude: 0 }]);
  };

  const onLatUpdate = (index: number, lat: number) => {
    // console.log("lat", index, lat);
    if (coords && coords[index]) {
      onUpdateCoords([
        ...coords.slice(0, index),
        {
          ...coords[index],
          latitude: lat,
        },
        ...coords.slice(index + 1, coords.length),
      ]);
    }
  };

  const onLngUpdate = (index: number, lng: number) => {
    // console.log("lng", index, lng);
    if (coords && coords[index]) {
      onUpdateCoords([
        ...coords.slice(0, index),
        {
          ...coords[index],
          longitude: lng,
        },
        ...coords.slice(index + 1, coords.length),
      ]);
    }
  };

  const onCoordRemove = (index: number) => {
    // console.log("index", index);
    if (coords && coords[index]) {
      onUpdateCoords([
        ...coords.slice(0, index),
        ...coords.slice(index + 1, coords.length),
      ]);
    }
  };

  //   console.log("co", coords);

  return (
    <div>
      <div className="flex">
        <Button onClick={onAddNewCoords} appearance="contained">
          Add Coords
        </Button>
      </div>
      <div className="pt-2 flex flex-wrap">
        {coords &&
          coords.map((item, index) => {
            // console.log("index", index);
            return (
              <div
                key={`index-coords-${index}`}
                className={clsx("m-1 border p-2", "border-gray-200")}
              >
                <div className="w-48 py-2">
                  <TextField
                    style={{ width: "100%" }}
                    label={"Latitude"}
                    variant="outlined"
                    onChange={(val) => {
                      onLatUpdate(index, parseFloat(val.target.value));
                    }}
                    value={coords && coords[index] ? coords[index].latitude : 0}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>

                <div className="w-48 py-2">
                  <TextField
                    style={{ width: "100%" }}
                    label={"Longitude"}
                    variant="outlined"
                    onChange={(val) => {
                      onLngUpdate(index, parseFloat(val.target.value));
                    }}
                    value={
                      coords && coords[index] ? coords[index].longitude : 0
                    }
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>

                <div className="pt-1">
                  <button
                    className="underline"
                    onClick={() => onCoordRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CoordsAdder;
