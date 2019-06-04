<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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

    <h3>Inputs</h3>

    <label>
      <input type="checkbox" v-model="checkboxes" value="Value #1">Value #1
    </label>

    <label>
      <input type="checkbox" v-model="checkboxes" value="Value #2">Value #2
    </label>

    <label>
      <input type="checkbox" v-model="checkboxes" value="Value #3">Value #3
    </label>

    <div>{{ selectedCheckboxes }}</div>

    <br>

    <select v-model="options" multiple>
      <option value="Option #1">Option #1</option>
      <option value="Option #2">Option #2</option>
      <option value="Option #3">Option #3</option>
    </select>

    <div>{{ selectedOptions }}</div>

    <h3 class="text-lg-right">Components</h3>

    <child-component :text="childText" @change-text="changeText" v-model="childValue" class="sibling-class">
      <template v-slot:default="{ childToParentValue }"></template>

      <template #subheader>New subheader</template>
    </child-component>

    <!-- Suitable when part of ul/table when children are different components but have restrictions -->
    <component is="child-component" :text="childText" @change-text="changeText" v-model="childValue"></component>
    <component is="sibling-component" v-model="siblingValue"></component>

    <!-- Custom model definition -->
    <custom-component
      v-model="lovingVue"
      id="test-checkbox"
      @input="confirmInput"
      v-bind:class.sync="anotherClass"
    ></custom-component>

    <h3>Vuex</h3>

    <button @click="increment">Push me {{ count }}</button>
    <button @click="incrementAsync">Don't push me that hard</button>
    <button @click="decrement">Don't push me</button>

    <div>{{ aState }}</div>
    <div>{{ anotherState }}</div>
    <div>{{ specialItems }}</div>
    <div>{{ firstItem }}</div>
  </div>
</template>
<script>
  import ChildComponent from '@/components/ChildComponent.vue';
  import SiblingComponent from '@/components/SiblingComponent.vue';
  import CustomComponent from '@/components/CustomComponent.vue';
  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';

  export default {
    components: {
      ChildComponent,
      SiblingComponent,
      CustomComponent
    },
    data() {
      return {
        anotherClass: 'another-class',
        lovingVue: false,
        childValue: 'child value',
        siblingValue: 'sibling value',
        childText: 'Child text',
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
        ],
        checkboxes: [],
        options: []
      }
    },
    computed: {
      ...mapState({
        aState() {
          return this.$store.state.aState;
        },
        anotherState() {
          return this.$store.state.anotherState;
        },
        specialItems() {
          return this.$store.getters.specialItems;
        }
      }),
      ...mapGetters([
        'firstItem'
      ]),
      selectedCheckboxes() {
        return this.checkboxes.sort((a, b) => a.localeCompare(b)).join(' ');
      },
      selectedOptions() {
        return this.options.sort((a, b) => a.localeCompare(b)).join(' ');
      },
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
      },
      count() {
        return this.$store.state.count;
      }
    },
    watch: {
      htmlSample(v) {
        console.log('html sample: ' + v);
      }
    },
    methods: {
      ...mapMutations({
        decrement: 'decrement'
      }),
      ...mapActions({
        incrementAsync: 'incrementAsync'
      }),
      logEvent(evt) {
        console.log(evt);
      },
      changeText() {
        this.childText += ' New text.';
      },
      confirmInput() {
        console.log('confirm input');
      },
      increment() {
        this.$store.commit('increment', 1);
      }
    },
  }
</script>
