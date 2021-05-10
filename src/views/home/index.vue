<template>
  <el-row type="flex" align="middle" justify="center" style="height: 100vh;">
    <text-editor />
  </el-row>
</template>

<script>
import TextEditor from '@/components/TextEditor'

export default {
  name: 'Home',
  components: { TextEditor }
}
</script>

<style>
body {
  margin: 0;
}
</style>
