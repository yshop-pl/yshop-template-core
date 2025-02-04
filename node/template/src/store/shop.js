import {defineStore} from "pinia";
import $api from "../utils/$api.js";

export const useShop = defineStore('shops', {
    state: () => ({
        shop: null,
        server: null,
        subpage: null
    }),
    actions: {
        async fetchShop() {
            this.shop = await $api("/license")
        },
        async fetchProducts(serverSlug) {
            this.server = await $api(`/license/server/${serverSlug}`)
        },
        async fetchSubpage(pageSlug) {
            this.subpage = await $api(`/license/subpage/${pageSlug}`)
        },
        async redirectToPayment(productId) {
            const result = await $api('/license/transaction/payment-link', "POST", {
                productId: productId,
                from: window.location.href.replace('localhost', 'localhost.localhost')
            })
            if (result)
                window.location.replace(result['url'])
        }
    }
})