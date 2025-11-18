// components/dashboard/ScheduleChart.jsx
'use client'; 

import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function ScheduleChart({ escalas }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !escalas) return;

    const ctx = canvasRef.current.getContext('2d');

    // Lógica do 'criarGraficoEscalas'
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const escalasCount = new Array(12).fill(0);

    escalas.forEach(escala => {
        // Extrai o mês da data (formato YYYY-MM-DD)
        const mesIndex = parseInt(escala.data.substring(5, 7), 10) - 1;
        if (mesIndex >= 0 && mesIndex < 12) {
            escalasCount[mesIndex]++;
        }
    });

    const chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: meses,
            datasets: [{
                label: 'Número de Escalas',
                data: escalasCount,
                backgroundColor: 'rgba(54, 162, 235, 1)',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Escalas Agendadas por Mês' }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    return () => {
      chartInstance.destroy();
    };
    
  }, [escalas]); // Depende dos dados de escalas

  return (
    <div className="box">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}