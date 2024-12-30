const url = process.env.LLM_API_URL || 'http://localhost:3001/slack/llm'

const llmBackend = async (arg = "how to celebrate diwali") => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput: arg })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();  // First get the raw text
        console.log('Raw response:', text);  // Log it for debugging
        
        try {
            // Try to parse as JSON if possible
            const data = JSON.parse(text);
            console.log('Parsed JSON response:', data);
            return data;
        } catch (parseError) {
            // If it's not JSON, just return the text
            console.log('Text response:', text);
            return text;
        }
    } catch (error) {
        console.error('Error calling LLM service:', error.message);
        throw error;
    }
}

// Test the function
module.exports = {llmBackend}