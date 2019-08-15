<template>
  <div id="app">
      <router-link to="/"></router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  ul,li{ list-style: none;}
  a { text-decoration: none;}
html,body{
  height: 100%;
  width: 100%;
}
  .container {
  padding: 20px 0 40px 20px;
}
</style>
