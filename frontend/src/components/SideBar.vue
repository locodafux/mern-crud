<template>
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
  </template>
  
  <script>
  export default {
    props: ['isSidebarOpen'],
    methods: {
      closeSidebar() {
        this.$emit('closeSidebar');
      }
    }
  };
  </script>
  