<template>
  <v-text-field
      label="Give currency"
      v-model="ToSearchItem"
      @input="searchTo"
      id="to-list"
  >
  </v-text-field>


    <v-expansion-panels
      v-model="panel"
      multiple
      v-if="currencies_to_data.length > 0"
      aria-expanded="true"
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
          {{item.name}}
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
                <v-list-item
                    :key="j"
                    :value="currency"

                    @click="selectItem(currency.code_name, currency.name);"
                    @touchstart="selectItem(currency.code_name, currency.name);"
                    v-if = "currency.active == true"
                    active-color="green"

                    :class="{ 'v-list-item--active': currency.selected == true }"


                >
                  <v-list-item-title >
                    {{ currency.name }}
                  </v-list-item-title>

                </v-list-item>
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

export default {

  name: "ToList",

  data: () => ({
    toSelectedItem: 0,
    ToSearchItem: "",
    panel: [0],

  }),
  computed: {
    ...mapState(useCurrencyStore, ['currencies_to_data']),
    ...mapWritableState(useCurrencyStore, ['to_code_selected', 'toCurrencyName']),
  },
  methods: {
    ...mapActions(useCurrencyStore, ['searchingTo', 'setSelection']),
    searchTo() {
      this.searchingTo(this.ToSearchItem)
    },
    selectItem(code,name){
      console.log("to code:"+code)
      this.setSelection(code,name,"to")
    }
  },

}
</script>
