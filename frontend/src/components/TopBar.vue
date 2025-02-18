<template>
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
  </template>
  
  <script>
  export default {
    methods: {
      toggleSidebar() {
        this.$emit('toggleSidebar');
      },
      logout() {
        console.log("User logged out");
      }
    }
  };
  </script>
  