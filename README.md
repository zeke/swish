# Swish ✨🏀✨

Use language models to write single-page apps with one shot.

## Installation

Install the npm package globally to add a binary named `swish` to your PATH:

```
npm i -g @zeke/swish
```

Or just use npx (the slower, non-committal option):

```
npx @zeke/swish
```

## Usage

Set up access to your language models:

```
$ export OPENAI_API_KEY=sk-...
$ export REPLICATE_API_TOKEN=r8_...
```

Write a prompt and get back HTML as standard output:

```console
$ swish "make a colorful page"
<html>...</html>
```

Write a prompt, save the HTML to disk, and open it in your browser:

```console
$ swish "make a colorful page sprinkled with confetti" > index.html && open index.html
```

Want to write a longer prompt and iterate on it? Put it in a file:

```console
$ echo "some long description..." > prompt.md
$ swish prompt.md > index.html && open index.html
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