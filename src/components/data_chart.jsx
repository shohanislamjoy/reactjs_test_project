import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';


Chart.register(...registerables);

function DataChart() {
    const chartRef = useRef(null);

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
    };

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = chartRef.current;
            return () => {
                chartInstance.destroy();
            };
        }
    }, []);

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <Line ref={chartRef} data={data} options={options} />
        </div>
    );
}

export default DataChart;
