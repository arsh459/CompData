import {
  LocationObjectCoords,
  LocationPermissionResponse,
  LocationSubscription,
  watchPositionAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";

export interface locationDp {
  coordsArray: LocationObjectCoords[];
  distance: number;
}

const R = 6371e3;

const distanceFunc = (x1: number, y1: number, x2: number, y2: number) => {
  const φ1 = (x1 * Math.PI) / 180;
  const φ2 = (x2 * Math.PI) / 180;
  const deltaLambda = ((y2 - y1) * Math.PI) / 180;

  const x = deltaLambda * Math.cos((φ1 + φ2) / 2);
  const y = φ2 - φ1;
  const d = Math.sqrt(x * x + y * y) * R;

  return d;
};

export const distTh = 10;

export type locationAppState = "PAUSED" | "FINISHED" | "RUNNING";

export const useLocationValues = (
  status: LocationPermissionResponse | null
) => {
  const [apState, setLocState] = useState<locationAppState>("PAUSED");
  const [watcher, setWatcher] = useState<LocationSubscription>();

  const [locResponse, setLocResponse] = useState<locationDp>({
    coordsArray: [],
    distance: 0,
  });

  useEffect(() => {
    if (status && status.granted && apState === "RUNNING") {
      // watchPositionAsync(
      //   {
      //     accuracy: 6,
      //   },
      //   (loc) => {
      //     // setLocResponse((p) => {
      //     //   let dInc: number = 0;
      //     //   if (p.coordsArray.length) {
      //     //     const lastCoords = p.coordsArray[p.coordsArray.length - 1];
      //     //     const increasedDistance = distanceFunc(
      //     //       lastCoords.latitude,
      //     //       lastCoords.longitude,
      //     //       loc.coords.latitude,
      //     //       loc.coords.longitude
      //     //     );
      //     //     dInc =
      //     //       increasedDistance > 0.2
      //     //         ? p.distance + increasedDistance
      //     //         : p.distance;
      //     //   }
      //     //   return {
      //     //     coordsArray: [...p.coordsArray, loc.coords],
      //     //     distance: dInc,
      //     //   };
      //     // });
      //     // make async call
      //   }
      // );
      watchPositionAsync(
        {
          accuracy: 5,
          distanceInterval: 10,
          timeInterval: 2000,
        },
        (loc) => {
          setLocResponse((p) => {
            // let dInc: number = 0;
            if (p.coordsArray.length) {
              const lastCoords = p.coordsArray[p.coordsArray.length - 1];
              const increasedDistance = distanceFunc(
                lastCoords.latitude,
                lastCoords.longitude,
                loc.coords.latitude,
                loc.coords.longitude
              );

              if (increasedDistance >= distTh) {
                const udInc = p.distance + increasedDistance;

                return {
                  coordsArray: [...p.coordsArray, loc.coords],
                  distance: udInc,
                };
              }

              return p;
            } else {
              return {
                coordsArray: [loc.coords],
                distance: 0,
              };
            }
          });
        }
      )
        .then((locationWatcher) => {
          setWatcher(locationWatcher);
        })
        .catch((err) => {
          console.log(err);
          crashlytics().recordError(err);
        });
    }
  }, [status, apState]);

  const onStart = () => setLocState("RUNNING");
  const onPause = () => {
    setLocState("PAUSED");
    watcher?.remove();
  };
  const onFinish = () => {
    setLocState("FINISHED");
    watcher?.remove();
  };

  const onRemoveSubscription = () => {
    watcher?.remove();
  };

  return {
    locResponse,
    onStart,
    onPause,
    onFinish,
    apState,
    // watcher,
    onRemoveSubscription,
  };
};
