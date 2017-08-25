<template>
  <div id="agendar">
    <navbar></navbar>
    <lista-de-disciplinas v-bind:disciplinas="disciplinas"></lista-de-disciplinas>
  </div>
</template>

<script>
  import ListaDeDisciplinas from './ListaDeDisciplinas';
  import Navbar from './Navbar';
  import disciplinasJSON from '../../dados_json/disciplinascompleto.json'

  export default {
    name:'agendar',
    components: {
      Navbar,
      ListaDeDisciplinas,
    },
    data() {
      return {
        disciplinas: disciplinasJSON.disciplinas,
      };
    },
  };
</script>