<template>
  <div>
    <h3>Bi-directional binding</h3>

    <h5>{{ onlyOnce }}</h5>
    <!-- Shows the initial value without changing it any further, despite the binding -->
    <h5 v-once>{{ onlyOnce }}</h5>

    <div>
      <input type="text" v-model="onlyOnce">
    </div>

    <h3>Text vs. raw HTML output</h3>

    <div>
      <input type="text" v-model="htmlSample">
    </div>
    <div>{{ htmlSample }}</div>
    <!-- Output the "unescaped" HTML -->
    <div v-html="htmlSample"></div>

    <h3>Directives</h3>

    <a href="#" @click.prevent="showTag = !showTag">[TOGGLE] </a>

    <a v-if="showTag" :href="tagHref" :[customAttribute]="'button-link'" :class="customClass + ' ' + reversedClass">Tag shown</a>

    <h3>Computedk</h3>

    <div v-html="formattedMessage"></div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        customClass: 'my-custom-class',
        onlyOnce: 'test',
        htmlSample: '<b>Html sample</b>',
        showTag: true,
        tagHref: 'http://google.com',
        customAttribute: 'id',
        message: 'Lorem ipsum sin dolor'
      }
    },
    computed: {
      reversedClass() {
        return this.customClass.split('').reverse().join('');
      },
      formattedMessage: {
        get() {
          return '<i>'+this.message+'</i>';
        },
        set(v) {
          this.message = v.replace(/<[^>]*>?/gm, '');
        }
      }
    },
    watch: {
      htmlSample(v) {
        console.log('html sample: ' + v);
      }
    }
  }
</script>
