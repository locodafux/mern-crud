<template>
  <div>
    <input type="text" v-model="role.roleName">
    <input type="text" v-model="role.slug">
    <button @click="addRole(role)">Add Role</button>
  </div>

  

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
            </tr>
        </tbody>
    </table>
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
     this.getRoles();
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

    async getRoles () {
      try {
        const response = await axios.get('http://127.0.0.1:8080/api/getRoles');
      } catch (error) {

      }
    }

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