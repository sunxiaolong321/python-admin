<template>
    <md-editor v-model="text" />
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from "vue";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineComponent({
    name: "MarkdownEditor",
    components: {
        MdEditor
    },

    props: {
        text: {
            type: String,
            default: '这是一个空的 markdown 编辑器'
        }
    },
    setup(props, { emit }) {
        const state = reactive({
            text: props.text || ''
        });
        state.text = props.text || '';
        watch(props, (newValue, oldValue) => {
            state.text = newValue.text;
        });
        watch(state, (newValue, oldValue) => {
            emit('listen', newValue.text);
        });
        return {
            ...toRefs(state)
        }
    }
});
</script>