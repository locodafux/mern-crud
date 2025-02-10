<template>
  <div>
    <input type="text" v-model="role.roleName">
    <input type="text" v-model="role.slug">
    <button @click="addRole(role)">Add Role</button>
  </div>
</template>

<script>
import axios from 'axios';
import { watch } from 'vue';

export default {
  data() {
    return {
      role: {
        roleName: null,
        slug: null,
      }
    };
  },
  created() {
    // this.addRole();
  },
  methods: {
    // Example of fetching friends list
    async addRole({ roleName, slug }) {
      try {
        const response = await axios.post('http://127.0.0.1:8080/api/addRole', {  roleName, slug });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },

  },
  watch: {
    'role.roleName': function (newValue) {
      this.role.slug = newValue
        .toLowerCase() 
        .replace(/\s+/g, '-') 
        .replace(/[^a-z0-9-]/g, ''); 
    }
  },

};
</script>

<style scoped>
/* Add any styling here */
</style>