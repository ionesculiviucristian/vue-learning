<template>
  <div id="app">
    <router-link to="/page-1">Page #1</router-link>
    <router-link to="/page-2">Page #2</router-link>
    <router-link :to="{ name: 'user.show', params: { id: Math.floor(Math.random() * 100) }}">Random user</router-link>

    <router-view/>

    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  </div>
</template>
