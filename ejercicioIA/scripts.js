document.addEventListener('DOMContentLoaded', () => {
    const askBtn = document.getElementById('ask-btn');
    const questionInput = document.getElementById('question');
    const answerBox = document.getElementById('answer');

    askBtn.addEventListener('click', async () => {
        const question = questionInput.value.trim();

        if (question) {
            answerBox.textContent = 'Cargando respuesta...';
            answerBox.classList.add('loading');

            try {
                const response = await getAnswerFromAPI(question);
                answerBox.textContent = response;
            } catch (error) {
                answerBox.textContent = 'Error al obtener respuesta.';
            } finally {
                answerBox.classList.remove('loading');
            }
        } else {
            answerBox.textContent = 'Por favor, escribe una pregunta válida.';
        }
    });

    async function getAnswerFromAPI(question) {
        entrenamiento = `
        Actua como un experto en ciencia y medio ambiente,  y resuelve preguntas solo con palabras de las tematicas del ciencia y medio ambiente, todo tema diferente al ciencia y medio ambiente le pediras amablemente realice otra pregunta, resuelve en un minimo de 100 palabras escriba una respuesta para la pregunta de la mejor manera y amable posible.  
        agrega al texto algunos emojis 
        
        Esta es la pregunta: (${question})
        `

        const apiKey = "[API-KEY-OPENAI]";
        const url = "https://api.openai.com/v1/chat/completions";

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        };

        const data = {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: entrenamiento }],
            temperature: 0.7,
        };

        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result.choices[0].message.content;
    }
});
