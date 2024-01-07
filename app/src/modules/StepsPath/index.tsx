// import { coordsType } from "@models/User/StepsDoc";
import { useLocationContext } from "@providers/location/LocationProvider";
import { mapStyle } from "@utils/map/mapUtils";
import { useEffect, useState } from "react";
// import { useState } from "react";
import { Platform, useWindowDimensions } from "react-native";
import MapView, {
  // Callout,
  // Marker,
  Polyline,
  Region,
  PROVIDER_GOOGLE,
} from "react-native-maps";
interface Props {
  // coords: coordsType[];
  aspectRatio?: number;
}

// const { latitudeDelta, longitudeDelta } = radiusToDelta(1, 0.092);

const initialRegion = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const StepsPath: React.FC<Props> = ({ aspectRatio }) => {
  const { height, width } = useWindowDimensions();
  // const ASPECT_RATIO = width / height;
  // const LATITUDE_DELTA = 0.0922;
  // const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const { locResponse } = useLocationContext();

  // const [pin, setPin] = useState({
  //   ...coords[coords.length - 1],
  // });
  const [region, updateRegion] = useState<Region>(initialRegion);

  useEffect(() => {
    if (locResponse.coordsArray.length) {
      updateRegion({
        latitude:
          locResponse.coordsArray[locResponse.coordsArray.length - 1].latitude,
        longitude:
          locResponse.coordsArray[locResponse.coordsArray.length - 1].longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [locResponse.coordsArray]);

  const asp = aspectRatio
    ? { aspectRatio: aspectRatio }
    : { height: height / 2 };
  return (
    <>
      {locResponse.coordsArray.length ? (
        <MapView
          style={{ width, ...asp }}
          loadingEnabled={!locResponse.coordsArray.length}
          userInterfaceStyle={"dark"}
          // initialRegion={
          //   locResponse.coordsArray.length
          //     ? {
          //         ...locResponse.coordsArray[0],
          //         latitudeDelta,
          //         longitudeDelta,
          //       }
          //     : undefined
          // }
          region={region}
          // onRegionChange={(reg) => console.log("reg", reg)}
          provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
          customMapStyle={mapStyle}
        >
          {/* <Marker coordinate={coords[coords.length - 1]} draggable={true}>
            <Callout>
              <Text>I'm here</Text>
            </Callout>
          </Marker> */}

          {locResponse.coordsArray.length ? (
            <Polyline
              coordinates={locResponse.coordsArray}
              strokeColor="#F03D5F"
            />
          ) : null}
        </MapView>
      ) : null}
    </>
  );
};

export default StepsPath;
