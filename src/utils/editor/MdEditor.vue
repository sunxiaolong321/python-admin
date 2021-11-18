<template>
    <md-editor v-model="text" />
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
    components: {
        MdEditor
    },
    props: {
        text: {
            type: String,
            default: '这是一个空的 markdown 编辑器'
        }
    },
    setup(props) {
        const state = reactive({
            text: props.text || ''
        });
        return {
            ...toRefs(state)
        }
    }
});
</script>