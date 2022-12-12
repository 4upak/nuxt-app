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

import {mapActions, mapState } from 'pinia'
import {useMainStore} from '@/stores/MainStore'
import {useCurrencyStore} from "./stores/CurrencyStore";
import { useI18n } from 'vue-i18n'

export default {
  setup(){
    const route = useRoute()
    const {t, locale} = useI18n({useScope: 'global'})
    console.log("Locale:"+route.params.lang)

    if (route.params.lang)
      locale.value = route.params.lang

    const main_store = useMainStore()
    main_store.locale = locale.value

  },
  name: 'App',
  components: {
    topnavbar: TopNavbar,
    bottomnavbar: BottomNavbar
  },

  methods:{
    ...mapActions(useMainStore, ['getMobileCheck']),
  },
  computed: {
    ...mapState(useMainStore, ["isMobile"]),
  },
  created() {

  },
  mounted() {

  },


}
</script>


