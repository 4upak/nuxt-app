<template>
  <v-text-field
    label="To currency"
    v-model="ToSearchItem"
    @input="searchTo"

  >
  </v-text-field>
  <template
      v-if="ToSearchItem.length > 0"
  >
    <template
        v-for="(item, i) in getCurrenciesToLists"

    >
      <template

          v-if="getCurrenciesToLists.length > 0 && item.active == true"
      >
        <v-list density="compact"
                :key="i"
        >
          <template v-for="(currency, j) in item.tag_currencies">
            <v-list-item
                :key="j"
                :value="currency"
                active-color="primary"
                @click="this.setToCode(currency.code_name)"
                v-if = "currency.active == true"
            >
              <v-list-item-title v-text="currency.name"></v-list-item-title>
            </v-list-item>
          </template>
        </v-list>

      </template>
    </template>
  </template>




</template>

<script>

export default {
  name: "ToList",
  data: () => ({
    fromSelectedItem: 0,
    ToSearchItem: "",
  }),
  computed: {
    ...mapGetters(["getCurrenciesToLists"]),
  },
  methods: {
    ...mapActions(["setToCode"]),
    searchTo() {
      this.$store.dispatch("searchTo", this.ToSearchItem);
    },
  },

}
</script>

<style scoped>

</style>
