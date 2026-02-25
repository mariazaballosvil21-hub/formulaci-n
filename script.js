// --- VARIABLES DE ESTADO ---
let indiceActual = 0;
let ejercicioAnterior = -1;
let aciertos = 0;
let totalIntentos = 0;

// --- BANCO DE DATOS (Basado en tus PDFs y EBAU) ---
const bancoEjercicios = [
    // ORGÁNICA
    { pregunta: "CH4", respuesta: "metano", tipo: "Orgánica" },
    { pregunta: "CH3CH2CH3", respuesta: "propano", tipo: "Orgánica" },
    { pregunta: "CH3CH(CH3)CH(CH3)CH2CH3", respuesta: "2,3-dimetilpentano", tipo: "Orgánica" },
    { pregunta: "CH2=CHCH3", respuesta: "propeno", tipo: "Orgánica" },
    { pregunta: "CH2=CHCH=CH2", respuesta: "buta-1,3-dieno", tipo: "Orgánica" },
    { pregunta: "CH≡CH", respuesta: "etino", tipo: "Orgánica" },
    { pregunta: "CH3CH2OH", respuesta: "etanol", tipo: "Orgánica" },
    { pregunta: "HCHO", respuesta: "metanal", tipo: "Orgánica" },
    { pregunta: "CH3COOH", respuesta: "ácido etanoico", tipo: "Orgánica" },
    { pregunta: "CH3CONH2", respuesta: "etanamida", tipo: "Orgánica" },
    
    // INORGÁNICA
    { pregunta: "NH3", respuesta: "azano", tipo: "Inorgánica" },
    { pregunta: "Fe2O3", respuesta: "trióxido de dihierro", tipo: "Inorgánica" },
    { pregunta: "Li2O2", respuesta: "peróxido de litio", tipo: "Inorgánica" },
    { pregunta: "H2SO4", respuesta: "ácido sulfúrico", tipo: "Inorgánica" },
    { pregunta: "NaOH", respuesta: "hidróxido de sodio", tipo: "Inorgánica" },
    { pregunta: "K2CO3", respuesta: "carbonato de potasio", tipo: "Inorgánica" },
    { pregunta: "NaHCO3", respuesta: "hidrogenocarbonato de potasio", tipo: "Inorgánica" },

    // EBAU (Ejercicios de examen)
    { pregunta: "CH3-CH2-O-CH3", respuesta: "etilmetil éter", tipo: "EBAU Orgánica" },
    { pregunta: "CH3-CH2-COO-CH3", respuesta: "propanoato de metilo", tipo: "EBAU Orgánica" },
    { pregunta: "CH≡C-CHCl-CHCl-CH3", respuesta: "3,4-dicloropent-1-ino", tipo: "EBAU Orgánica" },
    { pregunta: "CH3-CH=CH-CH2-CO-CH3", respuesta: "hex-4-en-2-ona", tipo: "EBAU Orgánica" },
    { pregunta: "KMnO4", respuesta: "permanganato de potasio", tipo: "EBAU Inorgánica" },
    { pregunta: "H2SeO4", respuesta: "ácido selénico", tipo: "EBAU Inorgánica" },
    { pregunta: "TiO2", respuesta: "dióxido de titanio", tipo: "EBAU Inorgánica" },
    { pregunta: "Co3(PO4)2", respuesta: "fosfato de cobalto (ii)", tipo: "EBAU Inorgánica" },
    { pregunta: "NH4F", respuesta: "fluoruro de amonio", tipo: "EBAU Inorgánica" }
];

// --- FUNCIONES DE NAVEGACIÓN ---
function mostrarSeccion(idSeccion) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(s => s.style.display = 'none');
    document.getElementById(idSeccion).style.display = 'block';
}

// --- UTILIDADES ---
function formatearFormula(texto) {
    return texto.replace(/([A-Z-a-z\)])(\d+)/g, '$1<sub>$2</sub>');
}

function generarIndiceAleatorio() {
    let nuevoIndice;
    do {
        nuevoIndice = Math.floor(Math.random() * bancoEjercicios.length);
    } while (nuevoIndice === ejercicioAnterior);
    ejercicioAnterior = nuevoIndice;
    return nuevoIndice;
}

// --- LÓGICA DEL JUEGO ---
function cargarEjercicio() {
    indiceActual = generarIndiceAleatorio();
    const ejercicio = bancoEjercicios[indiceActual];
    
    document.getElementById('enunciado').innerHTML = `
        <small style="color: #3498db;">Categoría: ${ejercicio.tipo}</small><br>
        <strong>${formatearFormula(ejercicio.pregunta)}</strong>
    `;
    
    document.getElementById('respuesta-usuario').value = "";
    document.getElementById('resultado').innerHTML = "";
    document.getElementById('respuesta-usuario').focus();
}

function verificarRespuesta() {
    const input = document.getElementById('respuesta-usuario');
    const displayResultado = document.getElementById('resultado');
    const respuestaUser = input.value.toLowerCase().trim();
    const respuestaCorrecta = bancoEjercicios[indiceActual].respuesta.toLowerCase();

    totalIntentos++;

    if (respuestaUser === respuestaCorrecta) {
        aciertos++;
        displayResultado.innerHTML = `<span style="color: #27ae60;">¡Correcto! 🎉</span>`;
        actualizarMarcador();
        setTimeout(cargarEjercicio, 1500);
    } else {
        displayResultado.innerHTML = `
            <div style="color: #e74c3c; margin-top: 10px; border-top: 1px solid #eee; padding-top: 10px;">
                ❌ Incorrecto.<br>
                Respuesta correcta: <strong>${bancoEjercicios[indiceActual].respuesta}</strong>
            </div>
            <button onclick="cargarEjercicio()" style="margin-top:10px; padding: 5px 15px; cursor:pointer; background:#2c3e50; color:white; border:none; border-radius:5px;">
                Siguiente ejercicio
            </button>
        `;
        actualizarMarcador();
    }
}

function actualizarMarcador() {
    document.getElementById('puntos-aciertos').innerText = aciertos;
    document.getElementById('puntos-intentos').innerText = totalIntentos;
    const porcentaje = totalIntentos === 0 ? 0 : Math.round((aciertos / totalIntentos) * 100);
    document.getElementById('porcentaje').innerText = porcentaje + "%";
}

// --- EVENTOS ---
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        verificarRespuesta();
    }
});

window.onload = () => {
    mostrarSeccion('organica');
    cargarEjercicio();
    actualizarMarcador();
};
