import { defineStore } from 'pinia'

export const useRatesStore = defineStore('rates', {
    state: () => ({
        rates: [],


    }),
    actions: {
        async getRates(from_code, to_code) {

            //from_code to uper case
            if(from_code && to_code){
                this.rates = []
                console.log("[get rates store] get rates:"+from_code+"->"+to_code)
                from_code = from_code.toUpperCase()
                to_code = to_code.toUpperCase()
                //get VUE_APP_API_DOMAIN from .env
                const runtimeConfig = useRuntimeConfig()
                const res = await useFetch(runtimeConfig.public.API_BASE_URL + 'digimon/api/exchanges/'+from_code+'/'+to_code+'/')
                this.rates = res.data._rawValue
            }
        }
    }
})