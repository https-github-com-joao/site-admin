<template>
  <div id="app" class="wrapper">
    <app-header v-if="this.isAuthenticated" />
    <app-sidebar v-if="this.isAuthenticated" />
    <app-content />
    <app-footer v-if="this.isAuthenticated" />
  </div>
</template>

<script>
/* eslint-disable */
import AppHeader from "./pages/components/Header";
import AppSidebar from "./pages/components/Sidebar";
import AppContent from "./pages/components/Content";
import AppFooter from "./pages/components/Footer";
import Menus from "./../config/menus";
import ActionsLogin from "./actions/LoginActions";

export default {
  name: "App",
  data() {
    return {
      isAuthenticated: ActionsLogin.isAuthenticated(),
      menus: Menus
    };
  },
  replace: false,
  components: {
    "app-header": AppHeader,
    "app-sidebar": AppSidebar,
    "app-content": AppContent,
    "app-footer": AppFooter
  }
};
</script>
