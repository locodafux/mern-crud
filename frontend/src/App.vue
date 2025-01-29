<template>
  <div>
    <button @click="fetchJoke">Reload</button>
    <div v-if="joke">
      <h1>Joke</h1>
      <p>Type: {{ joke.type }}</p>
      <p>Setup: {{ joke.setup }}</p>
      <p>Punchline: {{ joke.punchline }}</p>
    </div>
    <div v-else>
      <p>Loading joke...</p>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
  data() {
    return {
      joke: null,
    };
  },
  created() {
    this.fetchJoke();
  },
  beforeDestroy() {
    clearInterval(this.intervalId); // Clear interval when component is destroyed
  },
  methods: {
  // Example of fetching friends list
async fetchJoke() {
  try {
    const response = await axios.get('http://127.0.0.1:8080/friends');
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
  },
  };
  </script>
  
  <style scoped>
  /* Add any styling here */
  </style>