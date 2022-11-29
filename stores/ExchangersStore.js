import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('exchangers', {
    state: () => ({
        api_domain:'https://services.digichanger.pro/',

    }),
    actions: {

    }
})