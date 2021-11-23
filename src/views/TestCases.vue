<template>
    <el-table empty-text="暂无题目" :data="tableData" height-currrent-row="true">
        <el-table-column type="selection" />
        <el-table-column label="索引" type="index" width="100" />
        <el-table-column prop="module_name" label="所属模块" sortable />
        <el-table-column prop="task_name" label="题目名称" />
        <el-table-column prop="topic_difficulty" label="题目难度" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button @click="editor(scope.$index, scope.row)">编辑</el-button>
            </template>
        </el-table-column>
        <router-view></router-view>
    </el-table>
    <el-pagination
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :page-sizes="[10, 15, 20, 50]"
        :total="totalNum"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        @prev-click="prevClick"
        @next-click="nextClick"
    ></el-pagination>
</template>

<script>
import axios from '@/api'
import { toRefs, reactive } from "vue";
import { useRouter } from 'vue-router'

export default {
    name: 'TestCases',
    setup() {

        const router = useRouter()
        const state = reactive({
            currentPage: 1,
            tableData: [],
            totalNum: 0,
            pageSize: 10,
        })

        const getTestCases = async () => {
            await axios.get('/testcases', {
                params: {
                    page_num: state.currentPage,
                    page_size: state.pageSize,
                }
            }).then(res => {
                state.tableData = []
                state.totalNum = res.data.total_num
                state.totalNum = res.total_num
                res.data.forEach(item => {
                    state.tableData.push({
                        'module_name': '默认',
                        'task_name': item.task_name,
                        'topic_difficulty': item.task_weight,
                        '_id': item._id
                    })
                })
            })
        }

        const prevClick = () => {
            state.currentPage--
            state.tableData = []
            getTestCases()
        }

        const handleCurrentChange = (val) => {
            state.currentPage = val
            getTestCases()
        }

        const nextClick = () => {
            state.currentPage++
            getTestCases()
        }

        const editor = (index, row) => {
            router.push({
                path: '/edit',
                query: {
                    taskId: row._id
                }
            })
        }

        getTestCases()

        return {
            ...toRefs(state),
            handleCurrentChange,
            prevClick,
            nextClick,
            editor
        }
    }
}
</script>