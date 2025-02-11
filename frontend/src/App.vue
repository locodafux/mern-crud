<template>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/roles">Go to Roles</RouterLink>
    <RouterLink to="/users">Go to Users </RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script>
import axios from 'axios';
</script>