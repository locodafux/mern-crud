<template>
  <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Add New Role</h2>

    <div class="space-y-4">
      <input type="text" v-model="role.roleName" placeholder="Role Name"
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      <input type="text" v-model="role.slug" placeholder="Slug" disabled
        class="w-full px-4 py-2 border rounded-lg bg-gray-100" />
      <button @click="addRole" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        Add Role
      </button>
    </div>
  </div>

  <div class="max-w-4xl mx-auto mt-6 overflow-x-auto">
    <table class="w-full text-sm text-left border-collapse border border-gray-200 shadow-md rounded-lg">
      <thead class="bg-blue-600 text-white text-xs uppercase">
        <tr>
          <th class="px-4 py-3 border text-left">Role Name</th>
          <th class="px-4 py-3 border text-left">Slug</th>
          <th class="px-2 py-3 border text-center w-32">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id" class="bg-white border-b hover:bg-gray-100">
          <td class="px-4 py-3 border text-left">{{ role.role_name }}</td>
          <td class="px-4 py-3 border text-left">{{ role.slug }}</td>
          <td class="px-2 py-3 border text-center w-32">
            <div class="flex justify-center gap-1">
              <button @click="editRole(role)"
                class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                Edit
              </button>
              <button @click="deleteRole(role.id)"
                class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      role: {
        roleName: '',
        slug: '',
      },
      roles: [],
      apiUrl: 'http://127.0.0.1:8080/api/',
    };
  },
  mounted() {
    this.getRoles();
  },
  methods: {
    async getRoles() {
      try {
        const response = await axios.get(`${this.apiUrl}getRoles`);
        this.roles = response.data.data;

      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    },

    async addRole() {
      if (!this.role.roleName) {
        alert('Role Name is required.');
        return;
      }

      const lastId = this.roles.length > 0 ? Math.max(...this.roles.map(role => role.id)) : 0;
      const newRole = {
        id: lastId + 1,
        role_name: this.role.roleName,
        slug: this.role.roleName.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      };
      const previousRoles = [...this.roles];
      this.roles.push(newRole);
      try {
        const response = await axios.post(`${this.apiUrl}addRole`, this.role);
        this.roles = response.data.data;
      } catch (error) {
        console.error('Error adding role:', error);
        this.roles = previousRoles;
        alert('Failed to add role. Please try again.');
      } finally {
        this.role.roleName = '';
        this.role.slug = '';
      }
    }

  },
  watch: {
    'role.roleName': function (newValue) {
      this.role.slug = newValue.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
  },
};
</script>

<style scoped>
/* No extra styles needed since Tailwind is used */
</style>