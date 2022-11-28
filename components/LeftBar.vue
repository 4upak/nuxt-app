<template

>
<div class="leftbar">
  <v-card
      class="leftbar_card"
      elevation="0"
  >
    <v-tabs
        v-model="tab"
        bg-color="#f7fafc"
        height="60px"
        class="leftbar"
    >
      <v-tab value="one" cols="12" md="4"
      >
        <v-icon
            size="large"
            color="blue"
            class="mx-2"
        >
          mdi-format-list-text
        </v-icon>
        List
      </v-tab>
      <v-tab value="two" cols="12" md="4">
        <v-icon
            size="large"
            color="blue"
            class="mx-2"
        >
          mdi-text-search
        </v-icon>
        Search
      </v-tab>
      <v-tab value="three" cols="12" md="4">
        <v-icon
            size="large"
            color="blue"
            class="mx-2"
        >
          mdi-thumb-up
        </v-icon>
        Popular
      </v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <v-row
              class="mt-5">
            <v-col :cols="cols_num" :md="md" >

              <from-list />

            </v-col>
            <v-col :cols="cols_num" :md="md" >

              <to-list />

            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="two">
          two
          <v-row
              class="mt-5">
            <v-col :cols="cols_num" :md="md">
              <!--<v-alert
                  density="comfortable"
                  type="success"
                  variant="tonal"
                  v-if="getFromCurrencyName"
              >
                {{getFromCurrencyName}}
              </v-alert>
              <two-from-list /> -->
            </v-col>
            <v-col :cols="cols_num" :md="md">
              <!--<v-alert
                  density="comfortable"
                  type="success"
                  variant="tonal"
                  v-if="getToCurrencyName"
              >
                {{getToCurrencyName}}
              </v-alert>
              <two-to-list />-->
            </v-col>
          </v-row>


        </v-window-item>

        <v-window-item value="three">
          Three
        </v-window-item>
      </v-window>
    </v-card-text>

  </v-card>
</div>
</template>

<script>
import {mapState, mapActions, mapWritableState} from 'pinia'
import {useCurrencyStore} from '@/stores/CurrencyStore'
import {useMainStore} from '@/stores/MainStore'

import FromList from "@/components/FromList";
import ToList from "@/components/ToList";


export default {
  name: "LeftBar",
  data: () => ({
    tab: 'one',
    "cols_num": 12,
    "md": 6

  }),
  components: {
    "from-list" : FromList,
    "to-list" : ToList
  },
  computed: {
    ...mapState(useMainStore, ['isMobile']),
    ...mapState(useCurrencyStore, ['currencies_from_data', 'currencies_to_data']),
    ...mapWritableState(useCurrencyStore, ['from_code_selected', 'to_code_selected']),
  },
  methods:{
    ...mapActions(useCurrencyStore, ['getCurrencies'])
  },
  mounted() {

    this.getCurrencies()

  }

};
</script>

<style scoped>

</style>
