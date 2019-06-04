<template>
  <div>
    <h1 class="header">Child component</h1>
    <div>{{ text }}</div>
    <button @click="$emit('change-text')">Change text</button>

    <h5>Component model</h5>
    <input type="text" v-model="value2">

    <slot :child-to-parent-value="toParentValue"></slot>

    <slot name="subheader">Default subheader</slot>
  </div>
</template>
<script>
  export default {
    name: 'child-component',
    props: {
      text: String,
      value: String
    },
    computed: {
      toParentValue() {
        return this.value + '!!!';
      },
      value2: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit('input', v);
        }
      }
    }
  }
</script>
