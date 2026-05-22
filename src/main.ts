import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)

app.use(VueQueryPlugin)

app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'primevue, app-styles'
      }
    }
  }
})
app.mount('#app')
