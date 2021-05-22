<template>
  <div v-show="visibility" ref="cursor" :style="style" class="text-editor-cursor">|</div>
</template>

<script>
import { cursorLocation } from './locate'

export default {
  name: 'TextEditorCursor',
  inject: ['editor'],
  data() {
    return {
      visibility: false,
      frequency: 600
    }
  },
  computed: {
    cursor() {
      return this.$refs['cursor']
    },
    style() {
      const contentStyle = this.editor.options.styles.content
      return {
        color: this.editor.options.styles.cursor.color,
        fontSize: contentStyle.lineHeight,
        lineHeight: contentStyle.lineHeight
      }
    }
  },
  created() {
    cursorLocation.setHandler(this)
    const self = this
    let beginTime = 0
    !(function flashAnim(time) {
      if (time >= beginTime + 500) {
        beginTime = time
        self.visibility = !self.visibility
      }
      self.__ticker__ = requestAnimationFrame(flashAnim)
    }())
  },
  beforeDestroy() {
    cancelAnimationFrame(this.__ticker__)
  },
  methods: {
    /**
     * 设置光标位置
     * @param {Location} location 坐标
     */
    setLocate(location) {
      const y = location.y > 2 ? location.y + 2 : 2
      this.cursor.style.setProperty('transform', `translate(${location.x - 2}px, ${y}px)`)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-editor-cursor {
  position: absolute;
  left: 0;
  top: 1px;
  font-weight: 100;
  box-sizing: content-box;
  user-select: none;
  pointer-events: none;
  z-index: 1;
}
</style>
