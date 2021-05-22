<template>
  <el-table
    :key="key"
    ref="table"
    :class="{'draggable-table__is-drag': isDrag}"
    class="draggable-table"
    cell-class-name="draggable-handle"
    :cell-style="{cursor: 'move'}"
    :data="data"
    v-bind.sync="$attrs"
  >
    <el-table-column label="拖动" align="center" width="60px">
      <i class="el-icon-d-caret" />
    </el-table-column>
    <slot />
  </el-table>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: 'DraggableTable',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDrag: false,
      key: 1
    }
  },
  mounted() {
    const setTableDrag = async() => {
      const tbody = this.$el.querySelector('.el-table__body-wrapper > table > tbody')
      const sortable = Sortable.create(tbody, {
        animation: 300,
        handle: '.draggable-handle',
        onStart: () => (this.isDrag = true),
        onChange({ clone }) {
          clone.focus()
          console.log(arguments)
        },
        onEnd: ({ newIndex, oldIndex, item }) => {
          if (newIndex === oldIndex) {
            return
          }
          this.isDrag = false
          const curRow = this.data.splice(oldIndex, 1)
          this.data.splice(newIndex, 0, ...curRow)
          if (this.$attrs.rowKey) {
            return
          }
          this.key++
          this.$nextTick(() => setTableDrag())
          sortable.destroy()
        }
      })
    }
    setTableDrag()
  }
}
</script>

<style lang="scss" scoped>
.draggable-table.draggable-table__is-drag /deep/ .el-table__body {
  tr.sortable-chosen > td {
    border-top: 1px solid #409EFF;
  }
  tr:hover>td {
    background-color: inherit;
  }
}
</style>
