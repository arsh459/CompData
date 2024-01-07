import { useActivitesCurrentMonth } from "./useActivitesCurrentMonth";
import { useGraphParameters } from "./useGraphParameters";

export const useGraphData = (uid: string) => {
    const { data } = useActivitesCurrentMonth(uid);

    const { peak, XAxisTicks, YAxisTicks } = useGraphParameters(data);

    return {
        data,
        peak,
        XAxisTicks,
        YAxisTicks,
    };
};
