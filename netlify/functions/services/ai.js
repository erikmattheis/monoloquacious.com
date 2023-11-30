const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const model = process.env.OPENAI_MODEL;

function makeMessages(prompt, voice, len) {
  const messages = [{
    role: 'user',
    content: `Turn this sentence into ${len}-word ${voice} monologue with lots of extraneous facts: "${prompt}"`,
  }];
  return messages;
}

function getMessage(response) {
  return response.choices[0].message.content.trim();
}

async function orate(prompt, voice, len) {

  const messages = makeMessages(prompt, voice, len)

  const response = await openai.chat.completions.create({
    messages,
    model,
  });

  const message = getMessage(response);

  return message;
}

module.exports = {
  orate,
};
