<template>
    <el-card class="box-card" :style="{height: '220px', width: '400px'}" shadow="hover">
        <pie></pie>
    </el-card>
</template>

<script>
import { defineComponent } from 'vue'
import Pie from '@/utils/charts/Pie.vue'

export default defineComponent({
    name: 'BaseCharts',
    components: {
        Pie
    },
    setup() {
    }
})


</script>