<script lang="ts" setup>
import { Header, Footer, Wrapper } from './layout'
import { onMounted, ref } from 'vue'
import { AuthService } from './services/auth-service'
import { VersionService } from './services/version-service'

const loaded = ref(false)

onMounted(async () => {
  await VersionService.fetchVersion()
  await AuthService.getToken()
  loaded.value = true
})

</script>

<template>
  <Header />
  <Wrapper>
    <RouterView v-if="loaded" />
    <template v-else>Loading... </template>
  </Wrapper>
  <Footer />
</template>
