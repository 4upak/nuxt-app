<template>
  <div>
    <Head>
      <Title v-if="seo_data.title">{{seo_data.title}}</Title>
      <Title v-else>{{ $t('Exchange') }} {{fromCurrencyName}} {{ $t('to') }} {{toCurrencyName}}</Title>

      <Meta v-if="seo_data.meta_description" name="description" :content="seo_data.meta_description"/>
      <Meta v-else name="description" :content="$t('Exchange') + ' ' + fromCurrencyName + ' ' + $t('to') + ' ' + toCurrencyName"/>

      <Meta v-if="seo_data.meta_keywords" name="keywords" :content="seo_data.meta_keywords"/>
      <Meta v-else name="keywords" :content="$t('Exchange') + ', ' + fromCurrencyName + ', ' + $t('to') + ', ' + toCurrencyName"/>

    </Head>
    <!-- -->
  </div>
  <h1 v-if="seo_data.title_h1" class="text-center rates_page_title">{{seo_data.title_h1}}</h1>
  <h1 v-else  v-if="fromCurrencyName && toCurrencyName">{{ $t('Exchange') }} <span class="blue_span">{{fromCurrencyName}}</span> {{ $t('to') }}  <span class="blue_span">{{toCurrencyName}}</span></h1>
  <v-container class="lighten-5">

    <v-row
      class="mt-5"

    >
      <v-col cols="12" md="5">
        <left-bar />
      </v-col>
      <v-col cols="12" md="7">
        <v-card v-if="seo_data.seo_teaser && !isMobile" class="seo_teaser">
          <v-card-title v-if="seo_data.title_h2">
            {{seo_data.title_h2}}
          </v-card-title>
          <v-card-text>
            <div v-html="seo_data.seo_teaser"></div>

          </v-card-text>
        </v-card>

        <v-card v-if="seo_data.seo_teaser && isMobile" class="seo_teaser_mobile">

          <h2>{{seo_data.title_h2}}</h2>

          <div v-html="seo_data.seo_teaser"></div>


        </v-card>

        <v-card v-if="!isMobile">
          <v-responsive >
              <rates-table />
          </v-responsive>
        </v-card>
        <v-card v-else>
          <v-responsive >
            <rates-table-mobile />
          </v-responsive>
        </v-card>
        <v-card v-if="seo_data.seo_text" class="seo_full_text">

          <v-card-text>
            <div v-html="seo_data.seo_text"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>


  </v-container>
</template>


<script>


import LeftBar  from "@/components/LeftBar";
import RatesTable from "@/components/RatesTable";
import RatesTableMobile from "@/components/RatesTableMobile";

import { mapState, mapActions } from 'pinia'
import {useCurrencyStore} from '@/stores/CurrencyStore'
import {useRatesStore} from "@/stores/RatesStore";
import {useMainStore} from "@/stores/MainStore";
import { useI18n } from 'vue-i18n'

const currency_store = useCurrencyStore()
const rates_store = useRatesStore()
const main_store = useMainStore()

const unsubscribe = currency_store.$onAction(
    ({
       name, // name of the action
       store, // store instance, same as `someStore`
       args, // array of parameters passed to the action
       after, // hook after the action returns or resolves
       onError, // hook if the action throws or rejects
     }) => {

      const startTime = Date.now()
      //console.log('before action', name, args)


      after((result) => {
        //console.log('after action', name, args, result)
        if(name === 'getCurrencies'){
          const route = useRoute()
          currency_store.loadSelection(route.params.from_code, route.params.to_code)
        }
        if(name === 'setSelection'){
          //console.log('setSelection action')
          rates_store.rates = []
          rates_store.getRates(currency_store.from_code_selected, currency_store.to_code_selected)
          //console.log('Getting locale from store')

          //console.log('Get seo data '+ main_store.locale)
          rates_store.getSeoData(currency_store.from_code_selected, currency_store.to_code_selected, main_store.locale)
          //console.log('Get seo data '+ main_store.locale)
        }



      })

      onError((error) => {
        //console.error(error)
      })
    }
)


export default {

  setup() {
    const {t, locale} = useI18n({useScope: 'global'})
    const currencyStore = useCurrencyStore()
    const RatesStore = useRatesStore()
    const route = useRoute()

    currencyStore.currencyInfo(route.params.from_code,"from")
    currencyStore.currencyInfo(route.params.to_code,"to")

    RatesStore.getSeoData(route.params.from_code,route.params.to_code,locale.value)



  },


  name: "MainPage",
  components: {
    'left-bar': LeftBar,
    'rates-table': RatesTable,
    'rates-table-mobile': RatesTableMobile,
  },
  data () {
    return {


    }
  },

  computed: {
    ...mapState(useCurrencyStore,["fromCurrencyName", "toCurrencyName"]),
    ...mapState(useRatesStore,["seo_data"]),
    ...mapState(useMainStore,["isMobile"]),

  },
  methods: {
    ...mapActions(useCurrencyStore,["loadSelection"]),
    ...mapActions(useRatesStore,["getSeoData"]),
  },
  created() {


  },
  mounted() {
    this.loadSelection(this.$route.params.from_code, this.$route.params.to_code)

    this.getSeoData(this.$route.params.from_code, this.$route.params.to_code, this.$i18n.locale)

  },


}
</script>

<style scoped>
.text-center {
  text-align: center;
  color:#4070f4
}

</style>
