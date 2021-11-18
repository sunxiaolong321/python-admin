<template>
    <div class="task-editor">
        <el-switch
            v-model="switchbutton"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="Markdown 编辑器"
            inactive-text="富文本编辑器"
            @change="switchChange"
        />
        <md-editor v-if="switchbutton" :text="text"></md-editor>
        <rich-editor v-else :text="text"></rich-editor>
    </div>
</template>

<script>
import MdEditor from '@/utils/editor/MdEditor.vue'
import RichEditor from '@/utils/editor/RichEditor.vue'
import { toRefs, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/api'

export default {
    name: 'TaskEditor',
    components: {
        MdEditor,
        RichEditor
    },
    setup() {
        const route = useRoute();
        const router = useRouter();

        const status = reactive({
            switchbutton: true,
            text: ''
        })

        const switchChange = (val) => {
            status.switchbutton = val
        }

        axios.get('/task', {
            params: {
                id: route.params.taskId
            }
        }).then(res=>{
            console.log(res)
        })
        return {
            ...toRefs(status),
            switchChange
        }
    }
}
</script>
