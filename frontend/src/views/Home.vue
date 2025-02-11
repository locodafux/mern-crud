<template>
  <h1>Home</h1>
</template>

<script>
import axios from 'axios';

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