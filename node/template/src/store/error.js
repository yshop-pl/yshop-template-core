import {defineStore} from "pinia";

export const useError = defineStore('errors', {
    state: () => ({
        message: '',
        show: false
    }),
    actions: {
        showError(message) {
            this.show = true
            this.message = message
        },
        hideError() {
            this.show = false
        }
    }
})