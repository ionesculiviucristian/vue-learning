<template>
  <div>
    <h1>User menu</h1>

    <router-link :to="detailsRoute">Details</router-link>
    <router-link to="/tbd">TBD</router-link>
    <router-link to="/tbd">TBD</router-link>
  </div>
</template>
<script>
export default {
  name: 'user-menu',
  props: ['id'],
  computed: {
    detailsRoute () {
      return { name: 'user.details', params: { id: this.id } }
    }
  }
}
</script>
