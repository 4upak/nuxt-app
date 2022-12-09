<template>
    <v-menu
        open-on-hover
        class="lang_selector"

    >
    <template v-slot:activator="{ props }">
      <v-btn
          color="primary"
          v-bind="props"
      >
        <country-flag country="gb" size='normal' v-if="$i18n.locale=='en'"/>
        <country-flag country="ua" size='normal' v-if="$i18n.locale=='uk'"/>
        <country-flag country="ru" size='normal' v-if="$i18n.locale=='ru'"/>
        <div class="current_language">{{ $t('lang_name') }}</div>
      </v-btn>
    </template>

    <v-list class="flags_list">
      <v-list-item
          @click="selectLang('en')"
      >
        <div class="country_flag"><country-flag country="gb" size='normal'/></div>
        <v-list-item-title>
          English
        </v-list-item-title>
      </v-list-item>
      <v-list-item
          @click="selectLang('ru')"
      >
        <div class="country_flag"><country-flag country="ru" size='normal'/></div>
        <v-list-item-title>
          Русский
        </v-list-item-title>

      </v-list-item>
      <v-list-item
          @click="selectLang('uk')"
      >
        <div class="country_flag"><country-flag country="ua" size='normal'/></div>
        <v-list-item-title>
          Украинский
        </v-list-item-title>

      </v-list-item>
    </v-list>
    </v-menu>
</template>
<script>
import CountryFlag from 'vue-country-flag-next'
import { mapState} from 'pinia'
import {useMainStore} from '../stores/MainStore'

export default {
  methods: {
    selectLang(locale) {
      console.log('selecting lang')
      this.$i18n.locale = locale
      localStorage.setItem('lang', locale)
      var url = new URL(location.href)
      var path = url.pathname

      var lang = path.split('/').length >= 3 ? path.split('/')[1] : ''

      if (this.$i18n.availableLocales.includes(lang)) {

        path = path.replace('/' + lang, substring => '/' + locale + '/')

      } else {
        path = '/' + locale +'/'+ path
      }


      var new_url =  path.replace('///','/').replace('/en','').replace('//','/')
      console.log(new_url)
      //nuxt redirect to path
      this.$router.push(new_url)



    },
  },
  components:{
    CountryFlag
  },
}
</script>