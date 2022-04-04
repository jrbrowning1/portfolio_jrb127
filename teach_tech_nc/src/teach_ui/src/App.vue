<template>
  <div id="app">
    <nav-bar/>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
// eslint-disable-next-line import/no-unresolved
import NavBar from '@/components/NavBar.vue';

export default {
    name: 'App',
    components: {
        NavBar,
    },
};
</script>

<style>
@font-face {
  font-family: "AstroSpace";
  src: local("AstroSpace"),
    url(./assets/fonts/AstroSpace-eZ2Bg.ttf) format("truetype");
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F7F8FC;
  min-height: 100vh;
  overflow: auto;
}

@media only screen and (max-width: 960px) {
  #app {
    background-color: lightblue;
  }
}

@media only screen and (max-width: 640px) {
  #app {
    background-color: lightpink;
  }
}

@media only screen and (max-width: 500px) {
  #app {
    background-color: white;
  }
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
