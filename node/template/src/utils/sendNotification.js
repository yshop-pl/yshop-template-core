import {useToast} from "vue-toastification";

export default function sendNotification(message, type) {
    const toast = useToast()
    toast(isObject(message) ? Object.values(message)[0][0] : message, {
        type: type
    })
}
function isObject(value) {
    return value instanceof Object && value.constructor === Object;
}