<template>
  <v-text-field
      :label="$t('Get currency')"
      v-model="ToSearchItem"
      @input="searchTo"
      id="to-list"
      v-if="!to_code_selected || !from_code_selected"
  >
  </v-text-field>


    <v-expansion-panels
      v-model="to_list_panel"
      multiple
      v-if="currencies_to_data.length > 0"
      variant="accordion"
  >
    <template
        v-for="(item, i) in currencies_to_data"
    >

        <v-expansion-panel
          :key="i"
          v-if="item.active == true"
          color="primary"

          aria-expanded="true"
      >
        <v-expansion-panel-title
            color="blue"
        >
          {{$t(item.name)}}
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <div
              :key="i"
              v-if="currencies_to_data.length > 0 && item.active == true"

          >
            <v-list
                density="compact"


            >
              <template v-for="(currency, j) in item.tag_currencies">
                <div
                    :key="j"
                    :value="currency"

                    @click="selectItem(currency.code_name, currency.name);"

                    @touchstart="selectItem(currency.code_name, currency.name);"
                    v-if = "currency.active == true"
                    :class="currency.selected == true ? 'v-list-item--active--selected currency_item':'v-list-item--active--unselected currency_item'"
                    active-color="primary"
                    variant="plain"

                >
                  <div class="item_name">
                    {{ currency.name }}
                  </div>

                </div>
              </template>
            </v-list>
          </div>

        </v-expansion-panel-text>
      </v-expansion-panel>
    </template>
  </v-expansion-panels>




  <v-progress-circular
      indeterminate
      color="primary"
      v-else
      align-center
  ></v-progress-circular>

</template>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia'
import {useCurrencyStore} from '@/stores/CurrencyStore'
import {useMainStore} from "../stores/MainStore";

export default {
  setup() {
    const main_store = useMainStore()
    main_store.to_list_panel = [0]
  },

  name: "ToList",

  data: () => ({
    toSelectedItem: 0,

  }),
  computed: {
    ...mapWritableState(useMainStore, ['to_list_panel']),
    ...mapWritableState(useCurrencyStore, ['currencies_to_data','to_code_selected', 'from_code_selected','toCurrencyName']),
    ...mapWritableState(useCurrencyStore, ['ToSearchItem']),
  },
  methods: {
    ...mapActions(useCurrencyStore, ['searchingTo', 'setSelection']),
    searchTo() {
      this.searchingTo(this.ToSearchItem)
    },
    selectItem(code,name){
      //console.log("to code:"+code)
      this.setSelection(code,name,"to",this.$i18n.locale)
    }
  },
  mounted() {
    this.to_list_panel = [0,1,2,3,4,5,6]
  }

}
</script>
