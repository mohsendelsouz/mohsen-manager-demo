<template>
  <div class="page-wrapper">
    <template v-if="$route.name !== 'login'">
      <div class="wrapper">

        <!-- Preloader -->
        <div class="preloader flex-column justify-content-center align-items-center">
          <img class="animation__shake" :src="baseUrl+'img/AdminLTELogo.png'" alt="AdminLTELogo" height="60" width="60">
        </div>

        <header-component></header-component>
        <sidebar-component></sidebar-component>

        <div class="content-wrapper">
          <router-view></router-view>
        </div>

        <footer-component></footer-component>
      </div>
    </template>

    <router-view v-else></router-view>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent';
import FooterComponent from '@/components/FooterComponent';
import SidebarComponent from '@/components/SidebarComponent';

export default {
  name: 'App',
  components: {HeaderComponent, SidebarComponent, FooterComponent},
  watch: {
    $route() {
      if (this.$route.name === 'login') {
        document.body.classList.add('login-page')
        document.body.classList.remove('sidebar-mini', 'layout-fixed')
      } else {
        document.body.classList.remove('login-page')
        document.body.classList.add('sidebar-mini', 'layout-fixed')
      }
    }
  }
}
</script>
