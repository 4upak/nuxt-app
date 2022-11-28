<template>
test template
  {{name}} - {{isMobile}}
</template>

<script>
import { mapState, mapActions} from 'pinia'
import { useStore } from '../stores/MainStore'

export default {
  computed: {
    ...mapState(useStore, ['count','name', 'isMobile','items','hasChanged'])

  },
  methods: {
    ...mapActions(useStore, ['getMobileCheck'])
  },
  mounted() {
    this.getMobileCheck()
  }
}
</script>

<style scoped>

</style>