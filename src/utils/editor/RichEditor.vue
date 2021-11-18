<template>
<div ref='editor'></div>
<button @click='syncHTML'>同步内容</button>
<div :innerHTML='content.html'></div>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, ref, reactive } from "vue";
import wangeditor from 'wangeditor';

export default defineComponent({
    setup() {
        const editor = ref(null);
        const content = reactive({
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
        })
        onBeforeUnmount(()=>{
            instance.destroy();
            instance = null;
        })
        const syncHTML = () => {
            content.html = instance.txt.html();
        }
        return {
            editor,
            content,
            syncHTML
        }
    }
});


</script>