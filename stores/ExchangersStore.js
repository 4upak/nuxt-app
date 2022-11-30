import { defineStore } from 'pinia'

export const useExchangersStore = defineStore('exchangers', {
    state: () => ({
        api_domain:'https://services.digichanger.pro/',
        top_exchangers: [],

    }),
    actions: {
        async getExchangers() {
            const res = await useFetch(this.api_domain + 'digimon/api/exchanges/')
            this.top_exchangers = res.data._rawValue
        }
    }
})