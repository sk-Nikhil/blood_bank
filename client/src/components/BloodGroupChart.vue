<template>
    <div class="piechart">
        <h1>{{  }}</h1>
        <canvas id="pieChart"></canvas>
    </div>
</template>

<script>
import { Chart } from 'chart.js/auto';
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            chart: null,
            chartData: {},
            labels:[],
            data:[]
        };
    },
    computed:{
        ...mapGetters(['getBloodCount' ]),
    },
    methods: {
        ...mapActions(['countGroups']),
        renderPieChart() {
            if (this.chart) {
                this.chart.destroy();
            }
            const ctx = document.getElementById('pieChart').getContext('2d');
            this.chart = new Chart(ctx, {
                type: 'pie',
                data: this.chartData,
            });
        },
    },
    created(){
        this.$watch(() => this.getBloodCount, (newValue) => {
            this.chartData = newValue
        });
    },

    beforeMount(){
        this.countGroups();
    },
    mounted() {
        this.renderPieChart();
    },
    watch: {
        chartData: {
            handler() {
                this.renderPieChart();
            },
            deep: true,
        },
    },


};

</script>
  
<style scoped>
.piechart {
    width: 400px;
    height: 400px;
}
</style>