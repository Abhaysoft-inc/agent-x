import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();
const client = new OpenAI({
    apiKey: process.env.API_KEY || 'dummy_key',
    baseURL: process.env.BASE_URL || 'https://openrouter.ai/api/v1',
});
const SYSTEM_PROMPT = `You are a friendly, patient coding teacher for beginners. 
When a student provides a code snippet and an error message or problem:
1. Explain the error in plain, simple, accessible language. Avoid overly technical jargon when possible.
2. Conceptualize: Tell them what the error means conceptually.
3. Hint: Give them a hint or guide them toward the fix. Point them to the right line or concept.
4. RULE: DO NOT provide the fully corrected code. Your complete goal is to help them learn to fix it themselves. NO COPY-PASTE ANSWERS.

Format your response in JSON with the following structure:
{
  "explanation": "Simple explanation of the problem...",
  "hint": "Hint on how to fix it..."
}`;
export async function analyzeError(codeSnippet, errorMessage) {
    const completion = await client.chat.completions.create({
        model: process.env.MODEL || 'meta-llama/llama-3-8b-instruct:free',
        response_format: { type: 'json_object' },
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `Code Snippet:\n\`\`\`\n${codeSnippet}\n\`\`\`\n\nError Message:\n${errorMessage}` }
        ]
    });
    return JSON.parse(completion.choices[0]?.message?.content || '{}');
}
//# sourceMappingURL=debuggerAgent.js.map