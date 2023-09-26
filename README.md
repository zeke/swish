# Swish ✨🏀✨

Use language models to write single-page apps with one shot.

This is a command-line interface (CLI) that lets you send a text prompt to ChatGPT or Llama 2 and get back an HTML string that you can save to disk as a webpage.

## Installation

It's a Node.js package but it's not on npm yet. Run it directly from GitHub using npx:

```
npx zeke/swish
```

## Usage

Set up access to your language models:

```
export OPENAI_API_KEY=sk-...
export REPLICATE_API_TOKEN=r8_...
```

Write a prompt and get back HTML as standard output:

```console
npx zeke/swish "make a colorful page"
<html>...</html>
```

Write a prompt, save the HTML to disk, and open it in your browser:

```console
npx zeke/swish "make a colorful page sprinkled with confetti" > index.html && open index.html
```

Want to write a longer prompt and iterate on it? Put it in a file:

```console
echo "some long description..." > prompt.md
npx zeke/swish prompt.md > index.html && open index.html
```

Want to use a different model? Use the `--model` option:

```console
swish "make a website about cats" --model "gpt-4"
swish "make a website about dogs" --model "replicate/llama-2-70b-chat"
```

## Supported models

Model | Provider | Description
--- | --- | ---
`gpt-3.5-turbo` (default) | OpenAI | The default model. Fast and good.
`gpt-4` | OpenAI | The latest and greatest model. Slow and great.
`replicate/llama-2-70b-chat` | Replicate | A chatbot trained on 70 billion words of conversation.