<template>
    <div>
        <select class="browser-default" v-model="unidadeSelecionada">
            <option value="" disabled>Unidade:</option>
            <option v-for="unidade in unidades" v-bind:value="unidade" :key="unidade.codigo">
                {{ unidade.descrição }}
            </option>
        </select>
        <lista-de-horarios :horarios="unidadeSelecionada.horarios" :unidade="unidadeSelecionada" :disciplina="disciplina"></lista-de-horarios>
    </div>
</template>

<script>
    import ListaDeHorarios from './ListaDeHorarios'
    
    export default {
        props: ['unidades','disciplina'],
        components: {
            ListaDeHorarios,
        },
        data() {
            return {
                unidadeSelecionada: '',
            };
        }
    };
</script>
