<template>
<div ref='editor'></div>
<button @click='syncHTML'>同步内容</button>
<div :innerHTML='html'></div>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, ref, reactive, toRefs } from "vue";
import wangeditor from 'wangeditor';

export default defineComponent({
    name: 'RichTextEditor',
    props: {
        text: {
            type: String,
            default: '初始化Rich编辑器'
        }
    },
    setup(props) {
        const editor = ref(null);
        const status = reactive({
            text: '',
            html: ''
        });
        let instance;
        onMounted(()=>{
            instance = new wangeditor(editor.value);
            Object.assign(instance.config, {
                onchange() {
                    console.log('change');
                }
            })
            instance.create();
            instance.txt.html(props.text);
        })
        onBeforeUnmount(()=>{
            instance.destroy();
            instance = null;
        })
        const syncHTML = () => {
            status.html = instance.txt.html();
        }
        return {
            editor,
            ...toRefs(status),
            syncHTML
        }
    }
});


</script>