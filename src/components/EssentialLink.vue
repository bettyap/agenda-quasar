<template>
  <q-item
    clickable
    tag="a"
    target="_self"
    v-bind="itemProps"
    v-on="itemEventos"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: ''
    },
    
    click: {
      type: Function
    }
  },
  computed: {
    itemProps(){
      if(!!this.link) {
        return { href: this.link }
      }

      return {}
    },
    itemEventos() {
      if(!!this.click) {
        return {click: this.click}
      }
      return {}
    }
  }
})
</script>
