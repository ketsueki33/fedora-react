import { useEffect, useState } from "react";
import useBaseStore from "../../store";
import { format } from "date-fns";
import Calendar from "./Calendar";
import { cn } from "../../lib/utils";

export const Time = () => {
    const [isOpen, setIsOpen] = useState(false);

    const time = useBaseStore((state) => state.time);
    const updateTime = useBaseStore((state) => state.updateTime);

    const formattedDate = format(time, "MMM dd");

    const formattedTime = format(time, "KK:mm");

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateTime();
        }, 30000); // Update every 30 seconds

        return () => clearInterval(intervalId);
    }, [updateTime]);

    const closeCal = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <div
                className={cn(
                    "font-bold flex gap-3 top-transition",
                    isOpen ? "top-open" : "top-hover"
                )}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>
                {isOpen ? <Calendar time={time} closeCalendar={closeCal} /> : null}
            </div>
        </div>
    );
};
