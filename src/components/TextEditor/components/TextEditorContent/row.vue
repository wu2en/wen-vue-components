<template>
  <div :style="{lineHeight, height: lineHeight}" class="text-editor-content__row" @click.prevent.stop="click" @mousedown.prevent.stop="click" @mouseup.prevent.stop="click">
    <slot />
  </div>
</template>

<script>
import { cursorLocation } from '../TextEditorCursor/locate'
import { EditorRow } from './parseText'

export default {
  name: 'EditorContentRow',
  inject: ['editor', 'content'],
  props: {
    row: {
      type: EditorRow,
      required: true
    }
  },
  computed: {
    height() {
      return this.$el ? this.$el.offsetHeight : 26
    },
    rowIndex() {
      return this.row.rowIndex
    },
    y: {
      get() {
        return this.$el ? this.$el.offsetTop : this.rowIndex * this.height
      }
    },
    lineHeight() {
      return this.editor.options.styles.content.lineHeight
    }
  },
  created() {
    this.row.$vm = this
    this.editor.$on('selectedRow', this.onSelectedRow)
    this.editor.updateData('rowNum', this.row.rows.length)
  },
  methods: {
    click(e) {
      if (this.row.cols.length === 0) {
        cursorLocation.toCell(2, this.y, this.row)
      } else if (this.row.last.$vm) {
        const x = this.row.last.$vm.x + this.row.last.$vm.width
        if (!e || e.offsetX > x) {
          cursorLocation.toCell(x, this.y, this.row.last)
        }
      }
    },
    select() {
      if (this.row.last) {
        this.row.last.$vm.click()
      } else {
        cursorLocation.toCell(2, this.y, this.row)
      }
    },
    /**
     * 选择行数事件
     * @param {number} rowIndex 行索引
     */
    onSelectedRow(rowIndex) {
      if (rowIndex === this.rowIndex) {
        this.select()
        if (!this.content.isFocus) {
          this.content.focus()
        }
      }
    }
  }
}
</script>
