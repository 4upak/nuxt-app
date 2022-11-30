<template>

  <v-container class="lighten-5">
    <!-- title -->
    <h1 class="text-center rates_page_title" v-if="fromCurrencyName && toCurrencyName">Exchange <span class="blue_span">{{fromCurrencyName}}</span> to <span class="blue_span">{{toCurrencyName}}</span></h1>
    <!-- 3 rows of articles -->
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

const currency_store = useCurrencyStore()

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
      if(name === 'setSelection'){
        rates_store.rates = []
      }

      after((result) => {
        console.log('after action', name, args, result)
        if(name === 'setSelection' && currency_store.from_code_selected && currency_store.to_code_selected){
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
    currencyStore.loadSelection(route.params.from_code, route.params.to_code)

    return {
      fromCurrencyName: currencyStore.fromCurrencyName,
      toCurrencyName: currencyStore.toCurrencyName
    }



  },



  name: "MainPage",
  components: {
    'left-bar': LeftBar,
    'rates-table': RatesTable,
  },
  data () {
    return {
      name: 'Currency Converter',
      from_direction: this.$route.params.from_code,
      to_direction: this.$route.params.to_code,
    }
  },
  computed: {

  },

  methods: {
  },
  created() {

  },


  mounted() {


  },




}
</script>

<style scoped>
.text-center {
  text-align: center;
  color:#4070f4
}

</style>
