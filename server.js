import express from 'express';
import cors from 'cors';
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI API Configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Make sure your key is set
});

// Chat Endpoint
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: message }],
        });

        res.json({ botMessage: chatCompletion.choices[0].message.content });
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'Failed to get response from OpenAI' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});