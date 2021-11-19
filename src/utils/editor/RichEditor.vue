<template>
    <div ref="editor"></div>
    <button @click="syncHTML">同步内容</button>
    <div :innerHTML="html"></div>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, ref, reactive, toRefs, watch } from "vue";
import wangeditor from 'wangeditor';

export default defineComponent({
    name: 'RichTextEditor',
    props: {
        text: {
            type: String,
            default: '初始化Rich编辑器'
        }
    },
    emits: ['listen'],
    setup(props, { emit }) {
        const editor = ref(null);
        const state = reactive({
            text: '',
            html: ''
        });
        let instance;
        onMounted(() => {
            instance = new wangeditor(editor.value);
            Object.assign(instance.config, {
                onchange() {
                    console.log('change');
                    emit('listen', instance.txt.html());
                }
            })
            instance.create();
            instance.txt.html(props.text);
        })
        onBeforeUnmount(() => {
            instance.destroy();
            instance = null;
        })
        watch(props, (newValue, oldValue) => {
            state.text = newValue.text;
        });
        const syncHTML = () => {
            state.html = instance.txt.html();
        }
        return {
            editor,
            ...toRefs(state),
            syncHTML
        }
    }
});


</script>