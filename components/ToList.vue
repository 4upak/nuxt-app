<template >

  <v-text-field
    label="Get currency"
    v-model="ToSearchItem"
    @input="searchTo"
    id="to-list"
  >

  </v-text-field>

  <v-expansion-panels
      v-model="panel"
      multiple
      variant="accordion"
      v-if="getCurrenciesToLists.length > 0"

  >
    <template
        v-for="(item, i) in getCurrenciesToLists"
    >
      <v-expansion-panel
          :key="i"
          v-if="item.active == true"
      >
        <v-expansion-panel-title
            color="blue"
        >{{item.name}}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <div
              :key="i"
              v-if="getCurrenciesToLists.length > 0 && item.active == true"
          >
            <v-list
                density="compact"
            >
              <template v-for="(currency, j) in item.tag_currencies">
                <v-list-item
                    :key="j"
                    :value="currency"
                    active-color="green"
                    @click="this.setToCode(currency.code_name); scrollTo()"
                    v-if = "currency.active == true"

                    :class="{ 'v-list-item--active': currency.code_name == this.$route.params.to_code }"

                >
                  <v-list-item-title>
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

import { mapActions, mapGetters } from "vuex";
export default {
  name: "ToList",
  data: () => ({
    fromSelectedItem: 0,
    ToSearchItem: "",
    panel: [0,1,2,3,4,5,6],
  }),
  computed: {
    ...mapGetters(["getCurrenciesToLists"]),
  },
  methods: {
    ...mapActions(["setToCode"]),
    searchTo() {
      this.$store.dispatch("searchTo", this.ToSearchItem);
    },
    scrollTo() {
      document.getElementById("from-list").scrollIntoView( { behavior: "smooth" } );
    },
  },

}
</script>

<style scoped>

</style>
