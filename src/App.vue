<template>
  <div id="app">
    <div id="nav">
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/cars/new">New Cars</router-link> |
      <router-link to="/posts/new">New Posts</router-link>  |
      <router-link to="/">Technologies</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  background-color: #f0f2f5;;
}

#nav {
  text-align: center;
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
