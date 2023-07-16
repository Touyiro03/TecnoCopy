export function getFormData(target) {
    const form = new FormData(target);
    let datosNuevos = {};
    for (let key of form.keys()) {
        datosNuevos = { ...datosNuevos, [key]: form.get(key) }
    }
    return datosNuevos
}