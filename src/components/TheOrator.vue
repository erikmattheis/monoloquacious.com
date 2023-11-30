<template>
  <div>
    <h1>The Orator</h1>

    <form>
      <label for="voice">What would you like me to say?
        <input type="radio" name="voice" value="Shakespeare" />
        <input type="radio" name="voice" value="Old Testament" />
        <input type="radio" name="voice" value="Lenny Bruce" selected>
      </label><br />

      <input type="text" v-model="prompt"><br />

      <button type="submit" @click.prevent="submit">Submit</button>
    </form>

    <p>{{ monologue }}</p>

  </div>
</template>

<script>
import superagent from 'superagent'

export default {
  name: 'TheOrator',
  data() {
    return {
      prompt: '',
      voice: '',
      monologue: '...'
    }
  },
  methods: {
    async submit() {
      const response = await superagent.post('./netlify/functions/orator')
        .send({ prompt: this.prompt, voice: this.voice })
        .then(res => {
          this.monologue = res.body.monologue
        })
    }
  }
}

</script>