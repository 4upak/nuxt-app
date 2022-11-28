<template>
  <v-app>
    <v-main>
      <topnavbar />
      <v-container fluid class="main_container">

        <router-view />
        <slot></slot>
      </v-container>
      <bottomnavbar />
    </v-main>
  </v-app>
</template>

<script setup>


</script>

<script>
import TopNavbar from '@/components/TopNavbar'
import BottomNavbar from "@/components/BottomNavbar";
//import {mapGetters} from "vuex";
import {mapActions } from 'pinia'
import {useMainStore} from '@/stores/MainStore'

export default {
  name: 'App',
  components: {
    topnavbar: TopNavbar,
    bottomnavbar: BottomNavbar
  },

  methods:{
    ...mapActions(useMainStore, ['getMobileCheck']),


  },
  mounted() {
    this.getMobileCheck()

  },
  computed: {
    //...mapGetters(["getMobileCheck"]),
  },

}
</script>


