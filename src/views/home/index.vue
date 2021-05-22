<template>
  <el-row type="flex" align="middle" justify="center" style="height: 100vh;">
    <draggable-table :data="tableData">
      <el-table-column prop="field" label="field" />
    </draggable-table>
  </el-row>
</template>

<script>
import TextEditor from '@/components/TextEditor'
import DraggableTable from '@/components/DraggableTable'

export default {
  name: 'Home',
  components: { TextEditor, DraggableTable },
  data() {
    return {
      tableData: [
        { field: 'field1' },
        { field: 'field2' },
        { field: 'field3' },
        { field: 'field4' }
      ]
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
