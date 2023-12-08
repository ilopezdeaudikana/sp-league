<script lang="ts" setup>
import svg from '@/assets/images/logo.svg'

console.log(svg)
</script>
<template>
  <div class="bar">
    <div class="logo">
      <img :src="svg" alt="logo" />
    </div>
    <div class="links">
      <router-link to="/schedule" class="link"><img src="@/assets/images/schedule.png" alt="Schedule" /> Schedule</router-link>
      <router-link to="/leaderboard" class="link"><img src="@/assets/images/leaderboard.png" alt="Leader Board" /> Leader Board</router-link>
    </div>
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  flex-direction: row;
  padding: 0 40px;
  align-items: center;
  background-color: #025feb;
  height: 60px;
}
.logo {
  display: flex;
  align-items: center;
  flex: 1;
}
.links {
  max-width: 350px;
  display: flex;
  flex-direction: row;
  gap: 40px;
}

.link {
  color: white;
  text-decoration: none;
  height: 25px;
  > img {
    height: 25px;
    vertical-align: middle;
  }
}
</style>
