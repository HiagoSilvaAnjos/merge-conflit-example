// formato 24h — usado pelo Clock (Dev 1)
export function formatTime24h(date: Date): string {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}

// formato 12h — usado pelo DateDisplay (Dev 2)
export function formatTime12h(date: Date): string {
    const period = date.getHours() >= 12 ? "PM" : "AM";
    const hours = (date.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes} ${period}`;
}

// formatação de data — Dev 2
export function formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}