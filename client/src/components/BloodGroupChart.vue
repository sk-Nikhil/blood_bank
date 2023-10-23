<template>
    <div>
        <div class="piechart">
            <h1>{{ counts }}</h1>
            <canvas id="pieChart"></canvas>
        </div>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
let counts = ref("")
Chart.register(...registerables);

export default {
    props:{counter:Array},
    setup(props) {
         // eslint-disable-next-line vue/no-setup-props-destructure
         counts = props.counter
        const chartData = ref({
            labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            datasets: [
                {
                    data: [...counts],
                    backgroundColor: ['red', 'yellow', 'blue', 'pink', 'purple', 'orange', 'green', 'brown'],
                },
            ],
        });

        onMounted(() => {
            const ctx = document.getElementById('pieChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: chartData.value,
            });
        });

        return {counts};
    },
};
</script>
  

<style scoped>
.piechart {
    width: 400px;
    height: 400px;
}
</style>