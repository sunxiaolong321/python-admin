<template>
<el-table empty-text="暂无题目" :data="tableData">
    <el-table-column type="selection" width="55" />
    <el-table-column label="索引" type="index" width="180" />
    <el-table-column prop="module_name" label="所属模块" sortable width="180" />
    <el-table-column prop="task_name" label="题目名称" width="180" />
    <el-table-column prop="topic_difficulty" label="题目难度" width="180" />
    <el-table-column label="操作">
        <template #default>
            <el-button type="text">
                编辑
            </el-button>
        </template>
    </el-table-column>
</el-table>
<el-pagination
    background
    :page-size="pageSize"
    layout="prev, pager, next"
    :total="1000"
    :next-click="nextClick"
>
  </el-pagination>
</template>

<script>
import axios from '@/api'
import { reactive, ref, toRefs } from 'vue-demi'

export default {
    name: 'TestCases',
    setup () {
        const state = reactive({
            tableData: [],
            totalNum: 0,
        })

        axios.get('/testcases', {
            params: {
                pageNum: 1,
                pageSize: 10
            }
        }).then(res => {
            res.data.forEach(item => {
                state.totalNum = res.total_num
                state.tableData.push({
                    'module_name': '默认',
                    'task_name': item.task_name,
                    'topic_difficulty': item.task_weight,
                })
            })
        })
        const nextClick = () => {
        axios.get('/testcases', {
            params: {
                pageNum: 1,
                pageSize: 10
            }
        }).then(res => {
            res.data.forEach(item => {
                state.totalNum = res.total_num
                state.tableData.push({
                    'module_name': '默认',
                    'task_name': item.task_name,
                    'topic_difficulty': item.task_weight,
                })
            })
        })
        }
        return {
            ...toRefs(state),
            nextClick
        }
    }
    }
</script>