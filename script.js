function toggleTooltip(id) {
    const tooltip = document.getElementById(id);
    tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
}

function closeTooltip(id) {
    const tooltip = document.getElementById(id);
    tooltip.style.display = 'none';
}

function calcularYActualizarGrafico() {
    const calidadMaterial = parseFloat(document.getElementById('calidad_material').value);
    const frecuenciaMantenimiento = parseFloat(document.getElementById('frecuencia_mantenimiento').value);
    const localizacionGeografica = parseFloat(document.getElementById('localizacion_geografica').value);

    const desplazamiento = 9.4230 - 0.0034 * calidadMaterial - 0.1185 * frecuenciaMantenimiento + 0.0212 * localizacionGeografica;

    document.getElementById('resultado').innerText = `Desplazamiento Máximo: ${desplazamiento.toFixed(2)} mm`;

    actualizarGrafico(calidadMaterial, frecuenciaMantenimiento, localizacionGeografica, desplazamiento);
}

function actualizarGrafico(calidad, frecuencia, localizacion, desplazamiento) {
    const data = [
        {
            x: [calidad],
            y: [frecuencia],
            z: [localizacion],
            mode: 'markers',
            marker: {
                size: 12,
                color: desplazamiento < 5 ? '#81c784' : desplazamiento < 15 ? '#fff176' : '#e57373'
            },
            type: 'scatter3d'
        }
    ];

    const layout = {
        title: 'Gráfico 3D de Desplazamiento Máximo',
        scene: {
            xaxis: { title: 'Calidad del Material' },
            yaxis: { title: 'Frecuencia de Mantenimiento' },
            zaxis: { title: 'Localización Geográfica' }
        }
    };

    Plotly.newPlot('chart', data, layout);
}

function resetearValores() {
    document.getElementById('calidad_material').value = 100;
    document.getElementById('frecuencia_mantenimiento').value = 10;
    document.getElementById('localizacion_geografica').value = 100;
    document.getElementById('resultado').innerText = '';

    const data = [];
    Plotly.newPlot('chart', data);
}
