import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-3.6-flash";

export const suggestStops = async (req, res) => {
  try {
    const { destination } = req.query;
    if (!destination) {
      return res.status(400).json({ message: "Destination is required." });
    }

    const prompt = `You are a travel expert. A user wants to visit "${destination}". 
Provide a JSON array of up to 5 suggested stops/cities/regions within this destination that are popular, highly visited, or favorites.
Each object in the array must have exactly these keys:
- name: string (e.g. "Paris")
- detail: string (a short 3-4 word description, e.g. "Eiffel Tower & Museums")
- country: string (the country name)

Return ONLY valid JSON. No markdown formatting, no code blocks, no extra text.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    
    let text = response.text;
    // Strip markdown code blocks if any exist
    if (text.startsWith("\`\`\`json")) {
      text = text.substring(7);
    }
    if (text.endsWith("\`\`\`")) {
      text = text.substring(0, text.length - 3);
    }
    
    const suggestions = JSON.parse(text.trim());
    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Gemini suggest stops error:", error);
    res.status(500).json({ message: "Failed to generate suggestions", error: error.message });
  }
};

export const suggestActivities = async (req, res) => {
  try {
    const { stop } = req.query;
    if (!stop) {
      return res.status(400).json({ message: "Stop is required." });
    }

    const prompt = `You are a travel expert. A user is visiting "${stop}".
Provide a JSON array of up to 5 recommended activities they can do there.
Each object in the array must have exactly these keys:
- name: string (e.g. "Louvre Museum Tour")
- description: string (a short sentence describing it)
- cost: number (estimated cost in USD, use 0 for free)
- duration: string (e.g. "3 hours", "1 day")

Return ONLY valid JSON. No markdown formatting, no code blocks, no extra text.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    let text = response.text;
    if (text.startsWith("\`\`\`json")) {
      text = text.substring(7);
    }
    if (text.endsWith("\`\`\`")) {
      text = text.substring(0, text.length - 3);
    }
    
    const activities = JSON.parse(text.trim());
    res.status(200).json(activities);
  } catch (error) {
    console.error("Gemini suggest activities error:", error);
    res.status(500).json({ message: "Failed to generate activities", error: error.message });
  }
};
