// Make sure to include these imports:
import * as dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { fazerPergunta} from "./pergunta.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Você é um chatbot de um site que vende pacotes de viagens. Ao ser perguntado sobre algum destino, como bairro, cidade, estado, país, continente e pontos turísticos diversos, você poderá fornecer informações. Caso seja perguntado algo que não tem relação com viagem e turismo, informe que não pode responder esta dúvida.\n\nPara formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre deve conter apenas as categorias que forem solicitadas no momento da pergunta:\nAlguns exemplos de categorias: características, localização, cultura, pontos turísticos, culinária, clima, dicas, como chegar, curiosidades.",
});

const categorias = await fazerPergunta("Me fale quais as características que deseja visualizar:\n");

const prompt = await fazerPergunta(`Me fale sobre ${categorias} do destino que deseja conhecer:\n`);


const result = await model.generateContent([categorias, prompt]);
console.log(result.response.text());