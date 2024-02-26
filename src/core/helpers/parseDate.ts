export function parseDate(date: Date): string{
    return date.toLocaleString("es-ES", { timeZone: "America/Bogota", day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
}