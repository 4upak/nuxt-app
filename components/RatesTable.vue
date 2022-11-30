<template>
  <div v-if="rates.length > 0">
  <v-col
      class="d-flex align-center rate_result_cols"
      v-if="rates.length > 0"
  >
    <v-row class="rate_result_cols_header" v-if="!isMobile">
      <v-col cols="12" md="2">
        Exchange
      </v-col>
      <v-col cols="12" md="5">
        Give
      </v-col>
      <v-col cols="12" md="2">
        Get
      </v-col>
      <v-col cols="12" md="3">
        Reserve
      </v-col>
      <!--<v-col cols="10" md="2">
        Reviews
      </v-col>-->
    </v-row>
  </v-col>
    <template
        v-for="item in rates"
        :key="item.id"

        >
      <v-col v-if = "!isMobile">
        <v-row class="rate_result_cols_header_seccond">
          <v-col cols="12" md="2">
            {{ item.exchange.name }}
          </v-col>
          <v-col cols="12" md="5">
            {{ item.from_rate}} <span class="from_currency">{{item.from_currency.name}}</span><br>
            <span class="min"><b>Min:</b> {{item.min}} -> </span>
            <span class="max"><b>Max:</b> {{item.max}}</span>
          </v-col>
          <v-col cols="12" md="2">
            {{ item.to_rate}}<br><span class="to_currency"> {{item.to_currency.name}}</span>
          </v-col>
          <v-col cols="12" md="3">
            {{ item.reserve}}<br><span class="to_currency"> {{item.to_currency.name}}</span>
          </v-col>
          <!--<v-col cols="10" md="2">
            Reviews
          </v-col>-->
        </v-row>
      </v-col>
      <div class="rate_view_mobile" v-if="isMobile">
        <v-card
            class="rate_card_mobile_view"
        >
          <v-card-item>
            <div>
              <div class="review_count">
                Reviews:
                <v-badge
                  color="info"
                  content="12"
                  inline
              ></v-badge>
              </div>
              <div class="text-h6 mb-1">
                {{ item.exchange.name }}
              </div>
              <div >
                {{ item.from_rate}} <span class="from_currency">{{item.from_currency.name}}</span> ->
                {{ item.to_rate}} <span class="to_currency">{{item.to_currency.name}}</span>
              </div>
              <div>
                <span class="min"><b>Min:</b> {{item.min}} -> </span>
                <span class="max"><b>Max:</b> {{item.max}}</span>
              </div>
              <div class="reserve_mobile_view text-caption">Reserve: {{ item.reserve}} {{item.to_currency.code_name}}</div>
              <v-btn
                  class="mt-2 rate_mobile_button"
                  color="success"
                  :href="item.url"
                  style="margin-top:-25px !important;"
              >
                Exchange
              </v-btn>
            </div>
          </v-card-item>

        </v-card>
        <div style="margin-top: 10px"></div>
      </div>

      <v-divider v-if="!isMobile"></v-divider>
    </template>
  </div>



  <v-progress-linear
    v-else
    indeterminate
    color="primary"
  ></v-progress-linear>
</template>

<script>
import { mapState, mapActions} from 'pinia'
import {useRatesStore} from '../stores/RatesStore'
import {useMainStore} from '@/stores/MainStore'
import {useCurrencyStore} from '@/stores/CurrencyStore'

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
      // a shared variable for this specific action call
      const startTime = Date.now()
      // this will trigger before an action on `store` is executed
      console.log('before action', name, args)
      if(name === 'setSelection'){
        rates_store.rates = []
      }

      // this will trigger if the action succeeds and after it has fully run.
      // it waits for any returned promised
      after((result) => {
        console.log('after action', name, args, result)
        if(name === 'setSelection' && currency_store.from_code_selected && currency_store.to_code_selected){
          rates_store.getRates(currency_store.from_code_selected, currency_store.to_code_selected)
        }


      })

      // this will trigger if the action throws or returns a promise that rejects
      onError((error) => {
        console.error(error)
      })
    }
)


export default {
  name: "RatesTable",
  data () {
    return {

    }
  },
  computed: {
    ...mapState(useRatesStore,["rates"]),
    ...mapState(useMainStore,["isMobile"]),
  },
  methods: {
    ...mapActions(useRatesStore,["getRates"]),
  },
  mounted() {
    console.log('[Ratestable mounted}' + this.$route.params.from_code + " -> " + this.$route.params.to_code)

    this.getRates(this.$route.params.from_code, this.$route.params.to_code)
  }
}
</script>

<style scoped>
  span.from_currency, span.to_currency{
    font-size: 12px;
    color: #888888;
  }
  span.min, span.max{
    font-size: 12px;
    color: #888888;
  }
</style>
