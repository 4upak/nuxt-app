import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('rates', {
    state: () => ({
        api_domain:'https://services.digichanger.pro/',

    })
})