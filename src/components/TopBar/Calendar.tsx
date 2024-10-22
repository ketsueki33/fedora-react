import { useState } from "react";
import useCloseFromOutsideClick from "../../hooks/useCloseFromOutsideClick";
import {
    addDays,
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isSameDay,
    isSameMonth,
    isThisYear,
    startOfMonth,
    subDays,
} from "date-fns";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

interface Props {
    closeCalendar: () => void;
    time: Date;
}

const Calendar = ({ closeCalendar, time }: Props) => {
    const containerId = "calendar-container";
    useCloseFromOutsideClick(containerId, closeCalendar);

    const [renderMonth, setRenderMonth] = useState(time);

    const nextMonth = () => {
        setRenderMonth((prev) => addMonths(prev, 1));
    };

    const prevMonth = () => {
        setRenderMonth((prev) => addMonths(prev, -1));
    };

    const firstDayOfMonth = startOfMonth(renderMonth);
    const lastDayOfMonth = endOfMonth(renderMonth);
    const startingDayIdx = getDay(firstDayOfMonth);

    const daysToRender = eachDayOfInterval({
        start: subDays(firstDayOfMonth, startingDayIdx === 0 ? 7 : startingDayIdx),
        end: firstDayOfMonth,
    });

    daysToRender.pop();

    daysToRender.push(
        ...eachDayOfInterval({
            start: firstDayOfMonth,
            end: lastDayOfMonth,
        })
    );

    const remDays = 42 - daysToRender.length;

    daysToRender.push(
        ...eachDayOfInterval({
            start: addDays(lastDayOfMonth, 1),
            end: addDays(lastDayOfMonth, remDays),
        })
    );

    const day = format(time, "EEEE");
    const date = format(time, "MMMM d yyyy");

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            id={containerId}
            className="w-96 absolute bg-graphite top-12 right-1/2 translate-x-1/2 p-5 rounded-xl"
        >
            <div
                onClick={() => setRenderMonth(time)}
                className={cn(
                    "p-2 rounded-lg",
                    isSameDay(renderMonth, time) ? "" : "hover:bg-gray-600/50"
                )}
            >
                <p className="text-lg">{day}</p>
                <p className="font-thin text-2xl">{date}</p>
            </div>
            <div className="p-2 mt-3">
                <div className="flex justify-between">
                    <ChevronLeft
                        onClick={prevMonth}
                        size={30}
                        className="p-1 hover:bg-gray-600 rounded-full"
                    />
                    <p>
                        {format(
                            renderMonth,
                            isThisYear(renderMonth) ? "MMMM" : "MMMM yyyy"
                        )}
                    </p>
                    <ChevronRight
                        onClick={nextMonth}
                        size={30}
                        className="p-1 hover:bg-gray-600 rounded-full"
                    />
                </div>
                <div className="grid grid-cols-7 gap-4 ">
                    {weekdays.map((e, i) => (
                        <p
                            className="mt-4 mb-2 text-center text-lg font-bold text-gray-400"
                            key={i}
                        >
                            {e}
                        </p>
                    ))}
                    {daysToRender.map((day) => (
                        <p
                            key={day.toDateString()}
                            onClick={() => setRenderMonth(day)}
                            className={cn(
                                "flex justify-center items-center size-9 rounded-full hover:bg-gray-700",
                                isSameMonth(day, renderMonth)
                                    ? "text-white"
                                    : "text-gray-600",
                                isSameDay(day, renderMonth)
                                    ? "bg-gray-600 hover:bg-gray-600"
                                    : "",
                                isSameDay(day, time)
                                    ? isSameDay(day, renderMonth)
                                        ? "bg-metablue hover:bg-metablue"
                                        : "bg-gray-600/40"
                                    : ""
                            )}
                        >
                            {format(day, "dd")}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Calendar;
