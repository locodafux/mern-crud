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
    this.intervalId = setInterval(this.fetchJoke, 5000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId); // Clear interval when component is destroyed
  },
  methods: {
    async fetchJoke() {
      this.joke = null
      const id = Math.floor(Math.random() * 500)
      try {
        const response = await axios.get('https://api.sampleapis.com/jokes/goodJokes');
          this.joke = response.data[id]
      } catch (error) {
        console.log(error)
      }
    },
  },
  };
  </script>
  
  <style scoped>
  /* Add any styling here */
  </style>