import OpenAI from "openai";

export default async function takeAShot({ systemPrompt, userPrompt, model, logInputs = false }) {

  // Use Replicate OpenAI proxy server for non-OpenAI models like Llama 2
  const clientOptions = model.startsWith("replicate/")
    ? {
        apiKey: process.env["REPLICATE_API_TOKEN"],
        baseURL: "https://replicate-openai-proxy.fly.dev/v1",
      }
    : {};

  const openai = new OpenAI(clientOptions);

  systemPrompt =
    systemPrompt ||
    `You are a coding assistant that generates single-page apps using HTML, React, and Tailwind.
    The user will describe an HTML file they'd like you to write. 
    Use CDN links for any libraries you need.
    Use Tailwind for styling.
    Use React with JSX support.
    Respond with the raw HTML code.
    Do not wrap the output with code fencing.
    Respond with code only.
    Do not explain how it works.`
      .trim()                     // Trim the string
      .replace(/\s+/g, ' ')       // Replace one or more whitespace characters with a single space
      .replace(/\r?\n|\r/g, '');  // Remove newlines

  model = model || "gpt-3.5-turbo"

  if (logInputs) {
    console.error({systemPrompt, userPrompt, model})
  }

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    model,
  });

  let html = completion.choices[0].message.content;

  html = removeCodeFencing(html);

  return html;
}


// strip code fencing which is sometimes wrapped around API response text
const removeCodeFencing = (str) => {
  return str.trim().replace(/^```[a-zA-Z]*\n|```$/g, '');
};

