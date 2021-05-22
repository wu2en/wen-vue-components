<template>
  <span :class="{'text-editor-content__tabs': isTabs, 'text-editor-content__space': isSpace}" class="text-editor-content__cell" v-on.stop="{mousedown: click, mouseup: click}" v-text="text" />
</template>

<script>
import { cursorLocation } from '../TextEditorCursor/locate'
import { EditorCell } from './parseText'

export default {
  name: 'EditorContentCell',
  inject: ['editor'],
  props: {
    cell: {
      type: EditorCell,
      required: true
    }
  },
  computed: {
    width() {
      return this.$el ? this.$el.offsetWidth : 9
    },
    x() {
      return this.$el ? this.$el.offsetLeft : this.cell.colIndex * this.width + 3
    },
    y() {
      return this.cell.row.$vm ? this.cell.row.$vm.y : this.cell.row.rowIndex * 26
    },
    isSpace() {
      return this.cell.text === ' '
    },
    isTabs() {
      return this.cell.text === '\t'
    },
    text() {
      return this.isSpace || this.isTabs ? '' : this.cell.text
    }
  },
  created() {
    this.cell.$vm = this
  },
  mounted() {
    if (this.cell.isActive) {
      cursorLocation.toCell(this.x + this.width, this.y, this.cell)
    }
  },
  methods: {
    coordinateX() {
      return this.$el ? this.$el.offsetLeft : this.cell.colIndex * this.width + 3
    },
    coordinateY() {
      return this.cell.row.$vm ? this.cell.row.$vm.y : this.cell.row.rowIndex * 26
    },
    click(e) {
      const coordinateX = this.coordinateX()
      const coordinateY = this.coordinateY()
      let x = 0
      let isBefore = false
      if (e && e.offsetX < coordinateX + this.width / 2) {
        x = coordinateX
        isBefore = true
      } else {
        x = coordinateX + this.width
      }
      this.cell.isTriggerBefore = isBefore
      cursorLocation.toCell(x, coordinateY, this.cell)
    }
  }
}
</script>
