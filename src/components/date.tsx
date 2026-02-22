// src/components/date.tsx
import { useState, useEffect } from "react";
import { formatDate, formatTime } from "../utils/time-format";

export function DateDisplay() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <p>Data: {formatDate(now)}</p>
            <p>Hora: {formatTime(now)}</p>
        </div>
    );
}