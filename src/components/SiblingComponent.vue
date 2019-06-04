<template>
  <div>
    <h1>Sibling component</h1>
    <h5>Component model</h5>
    <input type="text" :value="value" @input="$emit('input', $event.target.value)">
    <hr>
    <input type="text" :value="siblingValue">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'sibling-component',
    props: {
      text: String,
      value: String,
      siblingValue: {
        type: String,
        default: 'Sibling text'
      }
    }
  }
</script>
