<template>

  <v-container class="lighten-5">
    <!-- title -->
    <h1 class="text-center">White <span class="blue_span">Exchangers</span> TopList</h1>
    <!-- 3 rows of articles -->
    <v-row
        class="mt-5"

    >
      <v-col cols="12" md="5">
        <left-bar />
      </v-col>
      <v-col cols="12" md="7" v-if="!isMobile">
            <exchanges-full-list />
      </v-col>
      <v-col cols="12" md="7" v-else>
        <exchanges-full-list-mobile />
      </v-col>





    </v-row>


  </v-container>
</template>

<script>
import { mapActions, mapState } from 'pinia'


import LeftBar  from "@/components/LeftBar";
import ExchangesFullList from "@/components/ExchangesFullList";
import ExchangesFullListMobile from "@/components/ExchangesFullListMobile";
import {useMainStore} from "@/stores/MainStore";

export default {

  name: "ExchangesPage",
  components: {
    'left-bar': LeftBar,
    'exchanges-full-list': ExchangesFullList,
    'exchanges-full-list-mobile': ExchangesFullListMobile,
  },
  computed: {
    ...mapState(useMainStore, ['isMobile'])
  },
}
</script>

<style scoped>

</style>