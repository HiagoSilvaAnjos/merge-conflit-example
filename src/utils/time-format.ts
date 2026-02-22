// src/utils/time-format.ts

export function formatTime(date: Date): string {
    const period = date.getHours() >= 12 ? "PM" : "AM";
    const hours = (date.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes} ${period}`;
}

export function formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}