import { defineStore } from 'pinia'

export const useExchangersStore = defineStore('exchangers', {
    state: () => ({

        top_exchangers: [],

    }),
    actions: {
        async getExchangers() {
            // get API_BASE_URL
            const runtimeConfig = useRuntimeConfig()
            const res = await useFetch(runtimeConfig.public.API_BASE_URL + 'digimon/api/exchanges/')
            this.top_exchangers = res.data._rawValue
        }
    }
})