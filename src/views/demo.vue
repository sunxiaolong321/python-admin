<template>
    <div ref="demoRef"></div>
</template>

<script>
import { ref, onMounted, defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
    name: 'Charts',
    setup() {
        const demoRef = ref(null);
        onMounted(()=>{

            console.log(demoRef);
        })
    }
})

</script>