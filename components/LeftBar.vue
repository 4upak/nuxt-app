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
              <v-alert
                  density="comfortable"
                  type="success"
                  variant="tonal"
                  v-if="getFromCurrencyName"
              >
                {{getFromCurrencyName}}
              </v-alert>
                <from-list />

            </v-col>
            <v-col :cols="cols_num" :md="md" >
              <v-alert
                  density="comfortable"
                  type="success"
                  variant="tonal"
                  v-if="getToCurrencyName"
              >
                {{getToCurrencyName}}
              </v-alert>
                <to-list />

            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="two">
          <v-row
            class="mt-5">
            <v-col :cols="cols_num" :md="md">
              <v-alert
                  density="comfortable"
                  type="success"
                  variant="tonal"
                  v-if="getFromCurrencyName"
              >
                {{getFromCurrencyName}}
              </v-alert>
              <two-from-list />
            </v-col>
            <v-col :cols="cols_num" :md="md">
              <v-alert
                  density="comfortable"
                  type="success"
                  variant="tonal"
                  v-if="getToCurrencyName"
              >
                {{getToCurrencyName}}
              </v-alert>
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
import FromList from "@/components/FromList";
import ToList from "@/components/ToList";

import TwoFromList from "@/components/TwoFromList";
import TwoToList from "@/components/TwoToList";
import {mapGetters} from "vuex";


export default {
  name: "LeftBar",
  components: {
    "from-list" : FromList,
    "to-list" : ToList,
    "two-from-list" : TwoFromList,
    "two-to-list" : TwoToList,


  },
  data: () => ({
    tab: 'one',
    "cols_num": 12,
    "md": 6
  }),
  mounted() {
    this.$store.dispatch('fetchCurrenciesLists')
    this.changeTab()
    this.changeColNum()
    console.log("LocalStorage:" + localStorage.getItem('FromCodeSelected'))
    console.log("LocalStorage:" + localStorage.getItem('ToCodeSelected'))
  },
  computed: {
    ...mapGetters(["getMobileCheck", "getFromCurrencyName", "getToCurrencyName"]),
  },
  methods: {
    changeTab() {
      console.log('Mobile check:' + this.getMobileCheck)
      if(this.getMobileCheck && localStorage.getItem('FromCodeSelected') && localStorage.getItem('ToCodeSelected'))
        this.tab = 'two'

    },
    changeColNum(){
      if(this.getMobileCheck){
        this.cols_num = 6
        this.md = 3
      }

    }
  }
}
</script>

<style scoped>

</style>
