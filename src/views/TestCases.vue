<template>
<el-table empty-text="暂无题目">
    <el-table-column type="selection" width="55" />
    <el-table-column label="索引" width="180" />
    <el-table-column label="所属模块" sortable  width="180" />
    <el-table-column label="题目名称" width="180" />
    <el-table-column label="题目难度" width="180" />
    <el-table-column label="操作">
        <template #default>
            <el-button type="text">
                编辑
            </el-button>
        </template>
    </el-table-column>
</el-table>
</template>

<script>


</script>