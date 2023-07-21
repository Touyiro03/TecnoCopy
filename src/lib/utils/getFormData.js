export function getFormData(target) {
    const formData = new FormData(target);
    const formDataObject = {};

    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    return formDataObject;
}