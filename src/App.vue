<script lang="ts" setup>
import { Header, Footer, Wrapper } from './layout'
import { onMounted, ref } from 'vue'
import { AuthService } from './services/auth-service'
import { VersionService } from './services/version-service'
import { LeagueService } from './services/league-service'
import { useVersionStore } from './stores/version'
import { useMatchesStore } from './stores/matches'

const loaded = ref(false)
const { setVersion } = useVersionStore()
const { setMatches } = useMatchesStore()


onMounted(async() => {
  const token = await AuthService.getToken()
  const [version, matches] = await Promise.all([VersionService.getVersion(), LeagueService.getMatches(token)])
  setVersion(version)
  setMatches(matches)
  loaded.value = true
})
</script>

<template>
  <Header />
  <Wrapper> 
      <RouterView v-if="loaded"/> 
      <template v-else> Loading... </template>
  </Wrapper>
  <Footer />
</template>
