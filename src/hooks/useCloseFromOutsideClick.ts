import { useEffect, useRef } from "react";

const useCloseFromOutsideClick = (containerId: string, closeFn: () => void) => {
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        // Clear any existing timeout
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (!closeFn) return;

            const target = event.target as HTMLElement;
            if (target.closest(`#${containerId}`)) return;
            closeFn();
        };

        // Store the timeout ID
        timeoutRef.current = window.setTimeout(() => {
            window.addEventListener("click", handleClickOutside);
        }, 0);

        return () => {
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
            }
            window.removeEventListener("click", handleClickOutside);
        };
    }, [containerId, closeFn]);
};

export default useCloseFromOutsideClick;
