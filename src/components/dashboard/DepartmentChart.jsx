// components/dashboard/DepartmentChart.jsx
'use client'; 

import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function DepartmentChart({ funcionarios }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !funcionarios) return;
    
    const ctx = canvasRef.current.getContext('2d');
    
    // Lógica do 'criarGraficoDepartamentos'
    const departamentosCount = funcionarios.reduce((acc, func) => {
        const depto = func.departamento || 'Não definido';
        acc[depto] = (acc[depto] || 0) + 1;
        return acc;
    }, {});

    const chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(departamentosCount),
            datasets: [{
                label: 'Funcionários',
                data: Object.values(departamentosCount),
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Funcionários por Departamento' }
            }
        }
    });

    return () => {
      chartInstance.destroy();
    };
    
  }, [funcionarios]); // Depende dos dados dos funcionários

  return (
    <div className="box">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}