<template>
    <div>
        {{ disciplina }} {{ unidade }}
    </div>
</template>

<script>
  import { Dados } from './Dados.js'

export default {
    data() {
        return {
            disciplina: '',
            unidade: '',
        };
    },
    mounted: function() {
        Dados.$on('selecao', (dado) => {
            this.disciplina = dado.disciplina;
            this.unidade = dado.unidade;
            console.log(dado)
        });
    }

}
</script>

<style></style>
