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
      <v-col cols="12" md="7">
        <v-responsive >
          <!--<top-exchangers />-->
          <exchanges-full-list />
        </v-responsive>
      </v-col>



    </v-row>


  </v-container>
</template>

<script>
import { mapActions } from 'pinia'


import LeftBar  from "@/components/LeftBar";
import ExchangesFullList from "@/components/ExchangesFullList";

export default {

  name: "ExchangesPage",
  components: {
    'left-bar': LeftBar,
    'exchanges-full-list': ExchangesFullList
  }
}
</script>

<style scoped>

</style>