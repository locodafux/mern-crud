<template>
  <div class="flex h-screen">
    <!-- Top Bar -->
    <div class="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center z-40">
      <!-- Logo and Hamburger Button for Mobile -->
      <div class="flex items-center">
        <!-- Hamburger Button for Mobile -->
        <button 
          @click="toggleSidebar" 
          class="lg:hidden text-white p-2 focus:outline-none bg-gray-800 rounded"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            class="w-6 h-6"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>

        <!-- Logo -->
        <div class="hidden lg:flex items-center ml-4">
          <img src="https://via.placeholder.com/150" alt="Logo" class="w-8 h-8 rounded-full">
          <span class="ml-2 text-xl font-bold">Admin Panel</span>
        </div>
      </div>

      <!-- Logout Button -->
      <button 
        @click="logout" 
        class="text-white p-2 focus:outline-none bg-gray-800 rounded hover:bg-gray-700 transition duration-200"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
          />
        </svg>
      </button>
    </div>

    <!-- Sidebar -->
    <nav 
      class="w-64 bg-gray-800 text-white p-4 flex flex-col lg:block fixed lg:relative h-screen mt-6"
      :class="{'hidden': !isSidebarOpen, 'lg:block': true}"
    >
      <!-- Navigation Links -->
      <div class="space-y-2 mt-16 lg:mt-8">
        <RouterLink 
          to="/" 
          @click="closeSidebar" 
          class="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Home
        </RouterLink>
        <RouterLink 
          to="/roles" 
          @click="closeSidebar" 
          class="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          Roles
        </RouterLink>
        <RouterLink 
          to="/users" 
          @click="closeSidebar" 
          class="flex items-center py-2 px-4 hover:bg-gray-700 rounded transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          Users
        </RouterLink>
      </div>
    </nav>

    <main class="flex-1 mt-16 lg:mt-18 p-4">
      <RouterView />
    </main>
  </div>
</template>

<script>
export default {
  name: "SidebarLayout",
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
    },
    logout() {
      console.log("User logged out");
    }
  }
};
</script>

<style scoped>
nav {
  transition: transform 0.3s ease;
}
</style>
