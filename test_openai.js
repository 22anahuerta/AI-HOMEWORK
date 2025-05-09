const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

(async () => {
    try {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: 'Hello, how are you?',
            max_tokens: 50,
        });

        console.log('OpenAI API Response:', response.data.choices[0].text.trim());
    } catch (error) {
        console.error('Error testing OpenAI API:', error);
    }
})();