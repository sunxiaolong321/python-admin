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
        <md-editor v-if="switchbutton" :text="description" @listen="textChange"></md-editor>
        <rich-editor v-else :text="description" @listen="textChange"></rich-editor>
        <code-editor></code-editor>
    </div>
</template>

<script>
import { toRefs, reactive, ref, onBeforeMount,watch } from 'vue'
import MdEditor from '@/utils/editor/MdEditor.vue'
import RichEditor from '@/utils/editor/RichEditor.vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/api'
import { marked } from 'marked'
import turndown from 'turndown'
import CodeEditor from '@/utils/editor/CodeEditor.vue'

export default {
    name: 'TaskEditor',
    components: {
        MdEditor,
        RichEditor,
        CodeEditor
    },
    setup() {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            switchbutton: true,
            description: ''
        })

        const switchChange = (val) => {
            if (val === false){
                state.description = marked.parse(state.description, {
                    renderer: new marked.Renderer(),
                    gfm: true,
                    tables: true,
                    breaks: false,
                    pedantic: false,
                    smartLists: true,
                    smartypants: false
                });
            } else {
                state.description = turndown().turndown(state.description)
                state.switchbutton = true;
            }
            state.switchbutton = val
        }

        const textChange = (val) => {
            state.description = val
        }

        onBeforeMount(async () => {
            axios.get('/edit', {
                params: {
                    taskId: route.query['taskId']
                }
            }).then(res => {
                state.description = res.data.task_description
            })
        })

        return {
            ...toRefs(state),
            switchChange,
            textChange
        }
    }
}
</script>
