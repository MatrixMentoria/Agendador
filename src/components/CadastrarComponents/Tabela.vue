<template>
    <div>
        testetestetestetestetestetestetestetestetesteteste {{ disciplina }}
    </div>
</template>

<script>
  import { Dados } from './Dados.js'

export default {
    data() {
        return {
            disciplina: ''
        };
    },
    mounted: function() {
        Dados.$on('selecao', (dado) => {
            this.disciplina = dado;
            console.log(dado)
        });
    }

}
</script>
