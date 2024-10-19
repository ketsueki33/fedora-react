import { useEffect } from "react";
import useBaseStore from "../../store";

export const Time = () => {
    const time = useBaseStore((state) => state.time);
    const updateTime = useBaseStore((state) => state.updateTime);

    const formattedDate = time.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

    const formattedTime = time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // For 24-hour format, set to true for 12-hour format
    });

    useEffect(() => {
        console.log("check");

        const intervalId = setInterval(() => {
            updateTime();
        }, 30000); // Update every 30 seconds

        return () => clearInterval(intervalId);
    }, [updateTime]);

    return (
        <div className="font-bold flex gap-3 hover:bg-gray-600/40 py-0.5 px-4 rounded-full transition-all ease-in-out duration-300">
            <p>{formattedDate}</p>
            <p>{formattedTime}</p>
        </div>
    );
};
