const { performance } = require('perf_hooks');

const { orate } = require('./services/ai');

function executionTimeToSeconds(executionTime) {
  return Math.round((executionTime / 1000) * 100) / 100;
}

// eslint-disable-next-line func-names
exports.handler = async function () {

  console.log(`Starting ${voice}`);

  const start = performance.now();

  const prompt = body.prompt || 'I leave tomorrow';
  const voice = body.voice || 'wordy';
  const len = body.len || 25;

  const response = await orate(prompt, voice, len);

  const end = performance.now();

  console.log(`Execution time: ${executionTimeToSeconds(end - start)}`);

  const monologue = JSON.stringify({ ...response, executionTime }, null, 2);

  return {
    statusCode: 200,
    body: {
      monologue,
    },
  };
    
}




