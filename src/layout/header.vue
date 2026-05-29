<script lang="ts" setup>
import svg from '@/assets/images/logo.svg'

</script>
<template>
  <div class="bar">
    <div class="logo">
      <img
        :src="svg"
        alt="logo"
      />
    </div>
    <div class="links">
      <router-link
        to="/teams"
        class="link"
      ><img
          src="@/assets/images/teams.png"
          alt="Teams"
        />
        <span>Teams</span>
      </router-link>
      <router-link
        to="/schedule"
        class="link"
      ><img
          src="@/assets/images/schedule.png"
          alt="Schedule"
        />
        <span>Schedule</span>
      </router-link>
      <router-link
        to="/leaderboard"
        class="link"
      ><img
          src="@/assets/images/leaderboard.png"
          alt="Leader Board"
        />
        <span>Leader Board</span>
      </router-link>
      <router-link
        to="/stats"
        class="link"
      >
        <i
          title="Stats"
          class="icon pi pi-chart-bar"
        />
        <span>Stats</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  flex-direction: row;
  padding: 0 40px;
  align-items: center;
  background-color: var(--vt-c-indigo);
  height: 60px;
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  flex: 1;
}

.links {
  max-width: 30rem;
  display: flex;
  flex-direction: row;
  gap: 40px;
}

.link {
  color: var(--vt-c-white-soft);
  text-decoration: none;
  height: 25px;
  display: flex;
  gap: 0.5rem;

  > img {
    height: 25px;
    vertical-align: middle;
  }

  .icon {
    align-self: center;
  }
}
</style>
