import "dotenv/config";
import express from "express";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";

const app = express();
const upload = multer();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL = "gemini-2.5-flash";

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);

function extract(resp) {
  try {
    const text =
      resp?.response?.candidates?.[0]?.content?.parts?.[0]?.text ??
      resp?.candidates?.[0]?.content?.parts?.[0]?.text ??
      resp?.response?.candidates?.[0]?.content?.text;

    return text ?? JSON.stringify(resp, null, 2);
  } catch (err) {
    console.log("Error extracting text: ", err);
    return JSON.stringify(resp, null, 2);
  }
}

//1. Generate Text
app.post("/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;
    const resp = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    res.json({ result: extract(resp) });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//2. Generate Image
app.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;
    const resp = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    res.json({ result: extract(resp) });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//3. Generate From Document
app.post("/generate-from-document", async (req, res) => {
  try {
    const { prompt } = req.body;
    const resp = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    res.json({ result: extract(resp) });
  } catch (error) {
    console.error("Error generating from document:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//4. Generate from Audio
app.post("/generate-from-audio", async (req, res) => {
  try {
    const { prompt } = req.body;
    const resp = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    res.json({ result: extract(resp) });
  } catch (error) {
    console.error("Error generating from audio:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
