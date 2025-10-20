const fetch = require('node-fetch');

exports.handler = async(event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // 1. Get the message and context from your widget
        const body = JSON.parse(event.body);
        const { message, context } = body;

        // 2. Get your new secret Gemini API key
        const API_KEY = process.env.GEMINI_API_KEY;

        if (!API_KEY) {
            throw new Error('Gemini API key is not configured.');
        }

        // 3. Prepare the request for the Gemini API
        //    (Gemini uses a different prompt format)
        const requestBody = {
            contents: [{
                parts: [
                    // Combine context and message for Gemini
                    { text: `System Context: ${context}\n\nUser: ${message}` }
                ]
            }]
        };

        // 4. Call the Gemini API (using gemini-1.5-flash model)
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            }
        );

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Gemini API Error:', errorData);
            throw new Error(`Gemini API failed with status ${response.status}`);
        }

        const data = await response.json();

        // 5. Get the response from Gemini's JSON structure
        const aiResponse = data.candidates[0].content.parts[0].text.trim();

        // 6. Send the AI's response back to your widget
        return {
            statusCode: 200,
            body: JSON.stringify({ response: aiResponse }),
        };

    } catch (error) {
        console.error('Error in serverless function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};