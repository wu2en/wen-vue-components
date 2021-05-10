<template>
  <textarea ref="input" v-model="text" class="text-editor-input" @keydown="keydown" @blur="setFocus(false)" />
</template>

<script>
import { cursorLocation } from '../TextEditorCursor/locate'
import { hasFuncCode, stopDefault } from './keyboard'

export default {
  name: 'EditorContentInput',
  inject: ['editor', 'content'],
  props: {
    rows: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      text: ''
    }
  },
  computed: {
    isFocus() {
      return this.content.isFocus
    }
  },
  watch: {
    text: {
      immediate: true,
      handler(text) {
        if (text) {
          this.text = ''
          const { rowIndex, colIndex } = cursorLocation.getCoordinate()
          if (this.rows[rowIndex]) {
            this.rows[rowIndex].insertText(text, colIndex)
          }
        }
      }
    }
  },
  created() {
    cursorLocation.setInput(this)
    this.editor.$on('contentFocus', this.focus)
  },
  methods: {
    /**
     * 获取焦点事件
     */
    focus() {
      this.setFocus(true)
    },
    setFocus(isFocus) {
      if (this.isFocus !== isFocus) {
        this.content.isFocus = isFocus
        this.$refs['input'][isFocus ? 'focus' : 'blur']()
      }
    },
    keydown(e) {
      if (hasFuncCode(e)) {
        stopDefault(e)
      }
      // console.log(e)
    },
    /**
     * 设置光标位置
     * @param {Location} location 坐标
     */
    setLocate(location) {
      if (this.$refs['input']) {
        this.$refs['input'].style.setProperty('transform', `translate(${location.x - 2}px, ${location.y}px)`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.text-editor-input {
  position: absolute;
  left: 0;
  top: 1px;
  resize: none;
  height: $lineHeight;
  z-index: -1;
}
</style>
