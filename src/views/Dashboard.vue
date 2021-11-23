<template>
  <el-row class="row-bg">
    <el-col :span="6">
      <charts></charts>
    </el-col>
    <el-col :span="6">
            <charts></charts>
    </el-col>
    <el-col :span="6">
            <charts></charts>
    </el-col>
        <el-col :span="6">
            <charts></charts>
    </el-col>
  </el-row>
</template>

<script>
import Charts from '@/components/Charts.vue'

export default ({
  name: 'DashBoard',
  components: {
    Charts
  },
  setup() {

  }
})
</script>
