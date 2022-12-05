import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import ru from '../locales/ru.json'
import uk from '../locales/uk.json'

export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'en',
        messages: {
            en,
            ru,
            uk,
        }
    })

    vueApp.use(i18n)

})