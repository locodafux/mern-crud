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
              <button @click="openEditModal(role)"
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

  <!-- Modal -->
  <div v-if="showModal"
    class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
    <div class="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow-sm dark:bg-gray-700">
      <!-- Modal header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          Edit Role
        </h3>
        <button @click="closeModal"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>
      </div>

      <!-- Modal body -->
      <div class="p-4 space-y-4">
        <input type="text" v-model="editRole.roleName" placeholder="Role Name"
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        <input type="text" v-model="editRole.slug" placeholder="Slug" disabled
          class="w-full px-4 py-2 border rounded-lg bg-gray-100" />
      </div>

      <!-- Modal footer -->
      <div class="flex items-center p-4 border-t border-gray-200 dark:border-gray-600">
        <button @click="saveRole"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Save
        </button>
        <button @click="closeModal"
          class="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      showModal: false,
      role: {
        roleName: '',
        slug: '',
      },
      editRole: {
        id: null,
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

      const newRole = {
        role_name: this.role.roleName,
        slug: this.role.slug,
      };

      try {
        const response = await axios.post(`${this.apiUrl}addRole`, newRole);
        this.roles.push(response.data.data);
        this.role.roleName = '';
        this.role.slug = '';
        this.getRoles();

      } catch (error) {
        console.error('Error adding role:', error);
        alert('Failed to add role. Please try again.');
      }
    },

    openEditModal(role) {
      this.editRole = { ...role, roleName: role.role_name };
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.editRole = { id: null, roleName: '', slug: '' };
    },

    async saveRole() {
      if (!this.editRole.roleName) {
        alert('Role Name is required.');
        return;
      }

      const updatedRole = {
        roleName: this.editRole.roleName, // Send roleName to the backend
        slug: this.editRole.slug
      };

      try {
        const response = await axios.put(`${this.apiUrl}editRole/${this.editRole.id}`, updatedRole);
        const index = this.roles.findIndex(role => role.id === this.editRole.id);
        this.roles.splice(index, 1, response.data.data); // Update the roles list
        this.closeModal(); // Close the modal after successful update
        this.getRoles();
      } catch (error) {
        console.error('Error updating role:', error);
        alert('Failed to update role. Please try again.');
      }
    },

    async deleteRole(id) {
      if (confirm('Are you sure you want to delete this role?')) {
        try {
          await axios.delete(`${this.apiUrl}deleteRole/${id}`);
          this.roles = this.roles.filter(role => role.id !== id);
          this.getRoles();
        } catch (error) {
          console.error('Error deleting role:', error);
          alert('Failed to delete role. Please try again.');
        }
      }
    }
  },
  watch: {
    'role.roleName': function (newValue) {
      this.role.slug = newValue.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    },
    'editRole.roleName': function (newValue) {
      this.editRole.slug = newValue.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
  },
};
</script>

<style scoped>
/* No extra styles needed since Tailwind is used */
</style>