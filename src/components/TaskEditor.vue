<template>
    <div class="task-editor">
        <div ref="editor"></div>
    </div>
</template>

<script>
import { Editor, rootCtx } from '@milkdown/core';
import { nord } from '@milkdown/theme-nord';
import { VueEditor, useEditor } from '@milkdown/vue';
import { commonmark } from '@milkdown/preset-commonmark';


export default {
    name: 'TaskEditor',
    setup() {
        const editor = useEditor({
            theme: nord,
            plugins: [commonmark],
            initialValue: '# Hello World!\n\nThis is a demo of [Mavon Editor]'
        })
        Editor.use().config((ctx)=>{
            ctx.set('theme', nord)
            ctx.set('plugins', [commonmark])
            ctx.set('initialValue', '# Hello World!\n\nThis is a demo of [Mavon Editor]')
        }).use(nord).use(commonmark).create();
    }
    
}
</script>
