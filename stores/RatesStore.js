import { defineStore } from 'pinia'

export const useRatesStore = defineStore('rates', {
    state: () => ({
        api_domain:'https://services.digichanger.pro/',
        rates: [],

    }),
    actions: {
        async getRates(from_code, to_code) {

            //from_code to uper case
            if(from_code && to_code){
                console.log("[get rates store] get rates:"+from_code+"->"+to_code)
                from_code = from_code.toUpperCase()
                to_code = to_code.toUpperCase()
                const res = await useFetch(this.api_domain + 'digimon/api/exchanges/'+from_code+'/'+to_code+'/')
                this.rates = res.data._rawValue
            }
        }
    }
})