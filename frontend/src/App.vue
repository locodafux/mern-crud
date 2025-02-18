<template>
  <div class="flex h-screen">
    <TopBar @toggleSidebar="toggleSidebar" />
    <SideBar 
      :isSidebarOpen="isSidebarOpen" 
      @closeSidebar="closeSidebar" 
    />
    <!-- Main Content -->
    <main class="flex-1 mt-16 lg:mt-18 p-4">
      <RouterView />
    </main>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue';
import SideBar from './components/SideBar.vue';

export default {
  name: "SidebarLayout",
  components: {
    TopBar,
    SideBar
  },
  data() {
    return {
      isSidebarOpen: false // Tracks sidebar visibility for mobile
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen; // Toggles the sidebar
    },
    closeSidebar() {
      this.isSidebarOpen = false; // Closes the sidebar
    }
  }
};
</script>
