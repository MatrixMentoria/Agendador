<template>
    <div >
        <select class="browser-default" v-model="unidadeSelecionada" @change="selectAlterado">
            <option value="" disabled>Unidade:</option>
            <option v-for="unidade in unidades" v-bind:value="unidade" :key="unidade.codigo">
                {{unidade.descricao}}
            </option>
        </select>
        <lista-de-horarios :selecao="selecao" :horarios="unidadeSelecionada.horarios" :unidade="unidadeSelecionada" :disciplina="disciplina"></lista-de-horarios>
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
                selecao: false,
            };
        },
        methods: {
            selectAlterado: function() {
                this.selecao = true;
            }
        }
    };
</script>
