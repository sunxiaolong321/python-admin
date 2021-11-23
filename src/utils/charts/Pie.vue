<template>
    <div
        id="Piecharts"
        ref="chartsRef"
        class="chart-box"
        :style="{ width: '350px', height: '200px' }"
    ></div>
</template>

<script>
import { ref, onMounted, defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
    name: 'Charts',
    setup() {
        const chartsRef = ref(null);
        const { proxy, ctx } = getCurrentInstance();
        onMounted(() => {
            const myChart = proxy.echarts.init(chartsRef.value)
            myChart.setOption({
                width: '250px',
                height: '180px',
                title: {
                    text: '试题数量'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    top: 'middle',
                    right: 'right',
                },
                series: [{
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    name: '试题数量',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    center: ['45%', '60%'],
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ]
                }]
            })
        })
        return {
            chartsRef
        }
    }
})


</script>