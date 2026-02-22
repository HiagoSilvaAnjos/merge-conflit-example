// src/components/clock.tsx
import { useEffect, useState } from "react";
import { formatTime } from "../utils/time-format";

export function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <p className="text-center text-xl mt-5 font-bold">Hora atual: {formatTime(time)}</p>
        </div>
    );
}