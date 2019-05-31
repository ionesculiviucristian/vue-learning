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

    <h3>Computed</h3>

    <textarea v-model="formattedMessage"></textarea>
    <div :style="{ color: 'red' }">Original: <span v-html="message"></span></div>
    <div>Formatted: <span v-html="formattedMessage"></span></div>

    <h3>Conditional rendering</h3>

    <!-- v-show is better suited for frequent toggles -->
    <div v-show="condition < 10">Condition 0</div>

    <!-- v-if is better suited for values that are unlikely to change at runtime -->
    <div v-if="condition < 10">Condition 1</div>
    <div v-else-if="condition === 10">Condition 2</div>
    <div>Condition 3</div>

    <h3>Loops</h3>

    <ul>
      <li v-for="item in sampleData" :key="item.id">{{ item.title }}</li>
    </ul>

    <!-- If HTML hierarchy is important ... -->
    <ul>
      <template v-for="item in sampleData">
        <li>{{ item.title }}</li>
        <li class="divider" role="presentation"></li>
      </template>
    </ul>

    <h3>Events</h3>

    <button @click="logEvent($event)">Push me</button>

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
        message: 'Lorem ipsum sin dolor',
        condition: 10,
        sampleData: [
          {
            id: 1,
            title: 'Title #1',
          }, {
            id: 2,
            title: 'Title #2',
          }, {
            id: 3,
            title: 'Title #3',
          }
        ]
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
    },
    methods: {
      logEvent(evt) {
        console.log(evt);
      }
    }
  }
</script>
