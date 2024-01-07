import { useState } from "react";

export const useLastLimit = () => {
    const [actLimit, setActLimit] = useState<number>(5);

    const onNext = () => setActLimit((prev) => prev + 5);

    return {
        onNext,
        actLimit,
    };
};
