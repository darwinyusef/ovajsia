const apiKey =
    "[API-KEY-OPENAI]";
const url = "https://api.openai.com/v1/chat/completions";

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
};

// Referencias a los elementos HTML
const questionInput = document.getElementById('question');
const answerDiv = document.getElementById('answer');
const askBtn = document.getElementById('ask-btn');

// Función para obtener la respuesta de OpenAI
async function getAnswer(question) {
    const data = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: `
                    Se un experto en ciencia y medio ambiente y resuelve preguntas solo con palabras de las tematicas de ciencia y medio ambiente, todo tema 
                    diferente en ciencia y medio ambiente amablemente le pediras haga otra pregunta, resuelve en un minimo de 100 palabras y escribe una respuesta 
                    para la pregunta de la mejor manera posible ${question} responde todo en json así

                    solo puedes devolver json sin introducciónes 
                    
                    {
                        "pregunta": ${question},
                        "respuesta": "escriba una respuesta para la pregunta de la mejor manera posible"
                        "preguntas_adicionales": ["escriba minimo de 3 preguntas mas que se entrelacen a la respuesta de manera clara"]
                    }
                    `,
            },
        ],
        temperature: 0.9,
    };

    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        });

        const result = await response.json();
        const answer = result.choices[0].message.content;
        return answer;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// Evento para manejar el clic del botón de preguntar
askBtn.addEventListener('click', async () => {
    const question = questionInput.value;
    if (question) {
        // Limpiar la respuesta anterior y mostrar un mensaje de carga
        answerDiv.textContent = 'Cargando respuesta...';

        // Llamar a la API y obtener la respuesta
        const response = await getAnswer(question);
        answerDiv.textContent = response || 'No se pudo obtener una respuesta.';
    } else {
        answerDiv.textContent = 'Por favor, escribe una pregunta.';
    }
});
