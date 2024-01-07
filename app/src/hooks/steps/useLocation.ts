import { useEffect, useState } from "react";
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";
import { coordsType } from "@models/User/StepsDoc";

export const useLocation = () => {
  const [coords, setCoords] = useState<coordsType[]>([]);

  useEffect(() => {
    (async () => {
      let permission = await requestForegroundPermissionsAsync();
      if (permission.status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let sub = await watchPositionAsync(
        {
          accuracy: Accuracy.Highest,
          distanceInterval: 10,
        },
        (location) => {
          setCoords((prev) => [
            ...prev,
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          ]);
        }
      );

      return () => {
        sub.remove();
      };
    })();
  }, []);

  return { coords };
};
