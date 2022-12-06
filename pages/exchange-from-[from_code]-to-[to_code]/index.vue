<template>
  <h1 class="text-center rates_page_title" v-if="fromCurrencyName && toCurrencyName">Exchange <span class="blue_span">{{fromCurrencyName}}</span> to  <span class="blue_span">{{toCurrencyName}}</span></h1>
  <v-container class="lighten-5">

    <v-row
      class="mt-5"

    >
      <v-col cols="12" md="5">
        <left-bar />
      </v-col>
      <v-col cols="12" md="7">
        <v-card>
          <v-responsive >
              <rates-table />
          </v-responsive>
        </v-card>
      </v-col>
    </v-row>


  </v-container>
</template>


<script>


import LeftBar  from "@/components/LeftBar";
import RatesTable from "@/components/RatesTable";

import { mapState, mapActions } from 'pinia'
import {useCurrencyStore} from '@/stores/CurrencyStore'
import {useRatesStore} from "@/stores/RatesStore";

const currency_store = useCurrencyStore()
const rates_store = useRatesStore()

const unsubscribe = currency_store.$onAction(
    ({
       name, // name of the action
       store, // store instance, same as `someStore`
       args, // array of parameters passed to the action
       after, // hook after the action returns or resolves
       onError, // hook if the action throws or rejects
     }) => {

      const startTime = Date.now()
      console.log('before action', name, args)


      after((result) => {
        console.log('after action', name, args, result)
        if(name === 'getCurrencies'){
          const route = useRoute()
          currency_store.loadSelection(route.params.from_code, route.params.to_code)
        }
        if(name === 'setSelection'){
          console.log('setSelection action')
          rates_store.rates = []
          rates_store.getRates(currency_store.from_code_selected, currency_store.to_code_selected)
        }


      })

      onError((error) => {
        console.error(error)
      })
    }
)


export default {

  setup() {

    const currencyStore = useCurrencyStore()
    const route = useRoute()

    currencyStore.currencyInfo(route.params.from_code,"from")
    currencyStore.currencyInfo(route.params.to_code,"to")


  },


  name: "MainPage",
  components: {
    'left-bar': LeftBar,
    'rates-table': RatesTable,
  },
  data () {
    return {
      name: 'Currency Converter',
    }
  },
  computed: {
    ...mapState(useCurrencyStore,["fromCurrencyName", "toCurrencyName"]),

  },
  methods: {
    ...mapActions(useCurrencyStore,["loadSelection"]),
  },
  created() {


  },
  mounted() {
    this.loadSelection(this.$route.params.from_code, this.$route.params.to_code)
  },

}
</script>

<style scoped>
.text-center {
  text-align: center;
  color:#4070f4
}

</style>
