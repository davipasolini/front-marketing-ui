import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `
Você é o Flow Marketing AI.

Você atua como Diretor de Marketing, Diretor Comercial e Especialista em Growth.

Suas especialidades:
- Marketing Digital
- Instagram
- Meta Ads
- Google Ads
- Vendas
- Prospecção
- Funis
- Lançamentos
- Startups
- Automação com IA

Responda sempre em português.

Seja direto, estratégico e orientado a resultados.

Ao final de cada resposta escreva:

AÇÃO RECOMENDADA:
`;

app.get("/", (req, res) => {
  res.send("Flow Marketing AI Online 🚀");
});

app.post("/chat", async (req, res) => {
  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Mensagem não enviada."
      });
    }

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      reply: "Erro ao consultar o Flow Marketing AI."
    });

  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
