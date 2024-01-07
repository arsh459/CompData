import { useEffect, useState } from "react";
import { monthlyGraphData } from "@components/MonthlyProgressGraph/useActivitesCurrentMonth";

export const useGraphParameters = (data: monthlyGraphData[]) => {
    const [XAxisTicks, setXAxisTicks] = useState<number[]>([]);
    const [YAxisTicks, setYAxisTicks] = useState<number[]>([]);
    const [peak, setPeak] = useState<monthlyGraphData>(data[0]);

    useEffect(() => {
        if (data.length) {
            const remoteXAxisTicks: number[] = [];
            data.forEach((item, index, arr) => {
                if (index % 7 === 0 || index === arr.length - 1) {
                    remoteXAxisTicks.push(item.dayMili);
                }
            });
            setXAxisTicks(remoteXAxisTicks);
            const peakPoint = data.reduce((prev, current) =>
                prev.points > current.points ? prev : current
            );
            if (peakPoint) {
                setPeak(peakPoint);
            }
            const tickGap = Math.ceil(peakPoint.points / 3);
            const tickArr = [];
            for (let i = 0; i < 5; i++) {
                if (tickGap) {
                    tickArr.push(i * tickGap);
                } else {
                    tickArr.push(i);
                }
            }
            setYAxisTicks(tickArr);
        }
    }, [data]);

    return { peak, XAxisTicks, YAxisTicks };
};
