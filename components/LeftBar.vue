<template

>
<div class="leftbar">
  <v-card
      class="leftbar_card"
      elevation="0"
  >
    <v-tabs
        v-model="leftbar_tab"
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
        {{ $t('tab_title_list') }}
      </v-tab>
      <v-tab value="two" cols="12" md="4">
        <v-icon
            size="large"
            color="blue"
            class="mx-2"
        >
          mdi-text-search
        </v-icon>
        {{ $t('tab_title_search') }}
      </v-tab>
      <v-tab value="three" cols="12" md="4">
        <v-icon
            size="large"
            color="blue"
            class="mx-2"
        >
          mdi-thumb-up
        </v-icon>
        {{ $t('tab_title_popular') }}
      </v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="leftbar_tab">
        <v-window-item value="one">
          <selected-chips />
          <v-row
              class="mt-5">
            <v-col :cols="list_cols_num" :md="list_md" >

              <from-list />

            </v-col>
            <v-col :cols="list_cols_num" :md="list_md" >

              <to-list />

            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="two">
          <selected-chips />
          <v-row
              class="mt-5">
            <v-col :cols="list_cols_num" :md="list_md">

              <two-from-list />
            </v-col>
            <v-col :cols="list_cols_num" :md="list_md">

              <two-to-list />
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
import {mapState, mapWritableState} from 'pinia'
import {useCurrencyStore} from '@/stores/CurrencyStore'
import {useMainStore} from '@/stores/MainStore'

import FromList from "@/components/FromList";
import ToList from "@/components/ToList";
import SelectedChips from "@/components/SelectedChips";



export default {
  setup(){
    const currencyStore = useCurrencyStore()
    currencyStore.getCurrencies()
    const mainStore = useMainStore()
    mainStore.changeColNum()

    return {}
  },
  name: "LeftBar",
  data: () => ({

  }),
  components: {
    "from-list" : FromList,
    "to-list" : ToList,
    "selected-chips" : SelectedChips
  },
  computed: {
    ...mapState(useMainStore, ['isMobile','list_cols_num','list_md']),
    ...mapWritableState(useMainStore, ['leftbar_tab']),
    ...mapState(useCurrencyStore, ['currencies_from_data', 'currencies_to_data', 'from_code_selected', 'to_code_selected','fromCurrencyName', 'toCurrencyName']),
    ...mapWritableState(useCurrencyStore, ['from_code_selected', 'to_code_selected']),
  },
  methods:{

    changeTab() {
      if(this.isMobile && this.from_code_selected != null && this.to_code_selected != null){
        this.leftbar_tab = 'two'
      }
    }
  },

  mounted() {
    this.changeTab()
  }

};
</script>

<style scoped>

</style>
