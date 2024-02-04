import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default async function chat(cHistory, msg){
const model = genAi.getGenerativeModel({model : 'gemini-pro'});
let chat = null;
if(!chat){
    chat = model.startChat({
        history:cHistory,
        generationConfig: {
            maxOutputTokens: 1000
        }
    });

    const prompt = `
    limit the answer to 100 words and respond to the below message and donot return wordcount
    message: ${msg}
    Answer : 
    `
    const result = await chat.sendMessage(prompt);
    return result.response.candidates[0].content.parts[0].text;
}
}