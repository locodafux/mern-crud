<template>
  <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Add New User</h2>

    <div class="space-y-4">
      <input type="text" v-model="user.username" placeholder="Username"
        class="w-full px-4 py-2 border rounded-lg bg-gray-100" />
      <input type="text" v-model="user.password" placeholder="Password"
        class="w-full px-4 py-2 border rounded-lg bg-gray-100" />
      <input type="text" v-model="user.fullName" placeholder="Full Name"
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      <input type="text" v-model="user.role" placeholder="Role"
        class="w-full px-4 py-2 border rounded-lg bg-gray-100" />
      <button @click="registerUser" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        Add Role
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        fullName: null,
        role: null,
        username: null,
        password: null,
      },
      apiUrl: 'http://127.0.0.1:8080/api/',
    }
  },
  methods: {
    async registerUser(){
      const response = await axios.post(`${this.apiUrl}registerUser`, this.user);
    }
  }
}
</script>