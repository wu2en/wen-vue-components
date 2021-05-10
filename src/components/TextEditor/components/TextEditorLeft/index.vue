<template>
  <div class="text-editor-left" :style="style">
    <div v-for="rowIndex in rowNum" :key="rowIndex" :style="{lineHeight}" class="text-editor-left__row" @click="click(rowIndex)">{{ rowIndex }}</div>
  </div>
</template>

<script>
export default {
  name: 'TextEditorLeft',
  inject: ['editor'],
  computed: {
    rowNum() {
      return this.editor.observer.rowNum
    },
    style() {
      const { borderColor, ...style } = this.editor.options.styles.sidebar
      return Object.assign({ borderRight: `1px solid ${borderColor}` }, style)
    },
    lineHeight() {
      return this.editor.options.styles.content.lineHeight
    }
  },
  methods: {
    click(rowIndex) {
      this.editor.$emit('selectedRow', rowIndex - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-editor-left {
  user-select: none;
  position: absolute;
  min-height: 100%;
  box-sizing: border-box;
  .text-editor-left__row {
    padding: 4px 3px;
  }
}
</style>
