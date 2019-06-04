<template>
  <div>
    <h1>Custom component</h1>

    <input
      v-bind="$attrs"
      type="checkbox"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    >

    <input
      type="text"
      v-on="inputListeners"
    >
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
    name: 'custom-component',
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: Boolean
    },
    computed: {
      inputListeners: function () {
        var vm = this;
        // `Object.assign` merges objects together to form a new object
        return Object.assign({},
          // We add all the listeners from the parent
          this.$listeners,
          // Then we can add custom listeners or override the
          // behavior of some listeners.
          {
            // This ensures that the component works with v-model
            input: function (event) {
              vm.$emit('input', event.target.value);
            }
          }
        )
      }
    }
  }
</script>
