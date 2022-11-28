<template>

  <v-container class="lighten-5">
    <!-- title -->
    <h1 class="text-center rates_page_title">Exchange <span class="blue_span">{{getFromCurrencyName}}</span> to <span class="blue_span">{{getToCurrencyName}}</span></h1>
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
import { mapGetters } from "vuex";

export default {
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
      rates:[],
    }
  },
  mounted() {
    this.$store.dispatch('fetchCurrenciesLists')
    this.$store.dispatch('fetchRates', {
      from_code: this.from_direction,
      to_code: this.to_direction,
    })

    this.$store.dispatch('setFromCurrencyName',localStorage.getItem('fromCurrencyName'))
    this.$store.dispatch('setToCurrencyName',localStorage.getItem('toCurrencyName'))

    this.$store.dispatch('setFromCodeNoRedirect',localStorage.getItem('FromCodeSelected'))
    this.$store.dispatch('setToCodeNoRedirect',localStorage.getItem('ToCodeSelected'))
  },
  computed: {
    ...mapGetters([
      'getFromCurrencyName','getToCurrencyName'
    ]),
  },



}
</script>

<style scoped>
.text-center {
  text-align: center;
  color:#4070f4
}

</style>
