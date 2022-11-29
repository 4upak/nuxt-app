<template>

  <v-container class="lighten-5">
    <!-- title -->
    <h1 class="text-center rates_page_title">Exchange <span class="blue_span">{{fromCurrencyName}}</span> to <span class="blue_span">{{toCurrencyName}}</span></h1>
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
              <!--<rates-table />-->
          </v-responsive>
        </v-card>
      </v-col>



    </v-row>


  </v-container>
</template>

<script>

import LeftBar  from "@/components/LeftBar";
//import RatesTable from "@/components/RatesTable";

import { mapState, mapActions } from 'pinia'
import {useCurrencyStore} from '@/stores/CurrencyStore'
//import {useMainStore} from '@/stores/MainStore'


export default {
  name: "MainPage",
  components: {
    'left-bar': LeftBar,
    //'rates-table': RatesTable,
  },
  data () {
    return {
      name: 'Currency Converter',
      from_direction: this.$route.params.from_code,
      to_direction: this.$route.params.to_code,
      rates:[],
    }
  },
  computed: {
    ...mapState(useCurrencyStore, ['fromCurrencyName', 'toCurrencyName']),

  },
  methods: {
  //  ...mapActions(useCurrencyStore, ['loadSelection'])
  },
  mounted() {
    console.log("load selection")
    //this.loadSelection();
    console.log(this.fromCurrencyName + " -> " + this.toCurrencyName)

  }


}
</script>

<style scoped>
.text-center {
  text-align: center;
  color:#4070f4
}

</style>
