<template>
    <div v-show="disciplinas.length" class="container">
        <div>
            <p id="textoAjuda" class="center-align">Clique numa disciplina abaixo para começar a agendar</p>
        </div>
        <div>
            <disciplina v-for="disciplina in disciplinas" :disciplina.sync="disciplina" :key="disciplina.codigo"></disciplina>
        </div>
    </div>
</template>

<script>
    import sweetalert from 'sweetalert';
    import Disciplina from './Disciplina';
    export default {
        props:['disciplinas'],
        components: {
            Disciplina,
        },
    };
</script>
