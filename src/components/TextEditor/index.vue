<template>
  <div class="text-editor" :style="{ width, height }" style="border: 1px solid #768d40">
    <div class="text-editor-main" :style="{ width, height }">
      <text-editor-left />
      <text-editor-content :width="`calc(${width} - 50px`" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import options from './options'
import TextEditorLeft from './components/TextEditorLeft'
import TextEditorContent from './components/TextEditorContent'

export default {
  name: 'TextEditor',
  provide() {
    return {
      editor: this
    }
  },
  components: { TextEditorLeft, TextEditorContent },
  data() {
    return {
      width: '700px',
      height: '500px',
      text: '',
      observer: {
        rowNum: 1
      }
    }
  },
  computed: {
    options() {
      return options
    }
  },
  methods: {
    setData(key, value) {
      Vue.set(this.observer, key, value)
    },
    getData(key) {
      return this.observer[key]
    },
    updateData(key, value) {
      if (this.getData(key) !== value) {
        this.setData(key, value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text-editor  {
  overflow: hidden;
  & > .text-editor-main {
    position: relative;
    overflow: hidden;
    //overflow: hidden auto;
  }
}
</style>
