<template>
    <div class="task-editor">
        <!-- <md-editor></md-editor> -->
        <rich-editor></rich-editor>
    </div>
</template>

<script>
import MdEditor from '@/utils/editor/MdEditor.vue'
import RichEditor from '@/utils/editor/RichEditor.vue'

export default {
    name: 'TaskEditor',
    components: {
        MdEditor,
        RichEditor
    },
    setup () {

    }
}
</script>
