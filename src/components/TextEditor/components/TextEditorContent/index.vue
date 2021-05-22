<template>
  <div :style="style" class="text-editor-content" @contextmenu.prevent="openContextmenu" @click.prevent.stop="click" @click.capture="focus">
    <section :style="{width}">
      <row v-for="row in rows" :key="row._uid" :row="row">
        <cell v-for="cell in row.cols" :key="cell._uid" :cell="cell" />
      </row>
    </section>
    <keep-alive>
      <text-editor-cursor v-if="isFocus" />
    </keep-alive>
    <text-editor-input ref="input" :rows="rows" />
  </div>
</template>

<script>
import * as utils from '../../utils'
import parseText from './parseText'
import TextEditorInput from '../TextEditorInput'
import TextEditorCursor from '../TextEditorCursor'
import Row from './row'
import Cell from './cell'

export default {
  name: 'TextEditorContent',
  inject: ['editor'],
  provide() {
    return {
      content: this
    }
  },
  components: { Row, Cell, TextEditorCursor, TextEditorInput },
  props: {
    width: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      rows: [],
      isFocus: false
    }
  },
  computed: {
    rowNum() {
      return this.rows.length
    },
    lastRow() {
      return this.rows[this.rowNum - 1]
    },
    style() {
      const { content: contentStyle, sidebar: sidebarStyle } = this.editor.options.styles
      return utils.DataGet([
        'color', 'fontSize', 'backgroundColor'
      ], contentStyle, {
        left: sidebarStyle.width,
        minWidth: `calc(100% - ${sidebarStyle.width})`
      })
    }
  },
  created() {
    this.rows = parseText(this.editor.text)
  },
  methods: {
    click(e) {
      if (this.rows.length === 0) {
        return
      }
      const lastRow = this.lastRow
      if (lastRow.$vm && lastRow.$vm.y + lastRow.$vm.height < e.offsetY) {
        lastRow.$vm.click()
      }
    },
    focus() {
      this.editor.$emit('contentFocus')
    },
    /**
     * 打开右键菜单
     */
    openContextmenu() {
      this.focus()
      console.log('contextmenu')
    }
  }
}
</script>

<style lang="scss" scoped>
.text-editor-content {
  position: absolute;
  min-height: 100%;
  box-sizing: border-box;
  cursor: text;
  letter-spacing: 1px;
  user-select: none;
  //font-family: monospace;
  & > section {
    overflow: hidden;
    //overflow-x: auto;
    //margin-bottom: -17px;
  }
  .text-editor-content__row {
    white-space: nowrap;
    padding: 4px 3px;
  }
  .text-editor-content__cell {
  }
  .text-editor-content__tabs {
    padding-left: 18px;
  }
}
</style>
