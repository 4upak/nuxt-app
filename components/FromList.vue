<template>
  <v-text-field
      label="Give currency"
      v-model="FromSearchItem"
      @input="searchFrom"
      id="from-list"
  >
  </v-text-field>


  <v-expansion-panels
      v-model="panel"
      multiple
      variant="accordion"
      v-if="currencies_from_data.length > 0"
  >
    <template
        v-for="(item, i) in currencies_from_data"
    >

      <v-expansion-panel
          :key="i"
          v-if="item.active == true"
          color="primary"
      >

        <v-expansion-panel-title
            color="blue"
        >{{item.name}}</v-expansion-panel-title>

          <div
              :key="i"
              v-if="currencies_from_data.length > 0 && item.active == true"
          >
            <v-list
                density="compact"
            >
              <template v-for="(currency, j) in item.tag_currencies">
                <v-list-item
                    :key="j"
                    :value="currency"

                    @click="selectItem(currency.code_name, currency.name);"
                    v-if = "currency.active == true"
                    active-color="green"

                    :class="{ 'v-list-item--active': currency.selected == true }"

                >
                  <v-list-item-title>
                    {{ currency.name }}
                  </v-list-item-title>

                </v-list-item>
              </template>
            </v-list>
          </div>


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

  name: 'FromList',




data: () => ({
  fromSelectedItem: 0,
  FromSearchItem: "",
  panel: [0, 1,2,3,4,5,6],
}),
computed: {
  ...mapState(useCurrencyStore, ['currencies_from_data']),
  ...mapWritableState(useCurrencyStore, ['from_code_selected', 'fromCurrencyName']),
},
methods: {
  ...mapActions(useCurrencyStore, ['searchingFrom','setSelection']),
  searchFrom() {
    this.searchingFrom(this.FromSearchItem)
  },

  selectItem(code,name){
    this.setSelection(code,name,"from")



  },
  mounted() {
    console.log("get router params", this.$route.params.from_code)
    console.log(this.$route.params)
  }

},

}
</script>
