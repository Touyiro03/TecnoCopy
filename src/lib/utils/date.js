export function formatoFecha(fechaObj) {
    let fecha = new Date(fechaObj)
    let opt = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timestamp: 'numeric'
    }
    return fecha.toLocaleDateString("es-MX", opt);
}